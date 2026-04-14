import { type RequestHandler } from "express";
import { randomUUID } from "node:crypto";

const REQ_ID_HEADER = "x-trace-id";

/**
 * injects an id in request object
 * if present extracts it from headers
 */
export const reqIdMiddleware: RequestHandler = (req, _res, next) => {
  req.id = req.headers[REQ_ID_HEADER]?.[0] || randomUUID();
  next();
};
