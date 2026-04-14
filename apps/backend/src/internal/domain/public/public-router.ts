import { Router } from "express";

export const publicRouter = Router();

publicRouter.get("/public/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});