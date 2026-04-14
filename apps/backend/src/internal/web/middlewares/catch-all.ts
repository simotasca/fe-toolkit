import { RequestHandler } from "express";

export const catchAllHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
}