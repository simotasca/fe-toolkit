import { RequestHandler } from "express";

/**
 * Shorthand for **Wrap Async**
 *
 * Wrapper to handle async errors in route handlers.
 */
export function wa(fn: RequestHandler): RequestHandler {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
