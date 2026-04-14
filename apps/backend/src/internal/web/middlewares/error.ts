import { type ErrorRequestHandler } from "express";
import { ValidationError } from "./validation.js";
import { StatusError } from "@/internal/web/StatusError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: "bad request: " + err.message, details: err.inner.issues });
  }
  
  if (err instanceof StatusError) {
    return res.status(err.status).json({ message: err.message, name: err.name, ...(err.payload || {}) });
  }

  console.error("uncaught webserver error:", err.stack);
  res.status(500).send({ message: "internal server error" });
}