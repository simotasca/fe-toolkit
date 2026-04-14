import { type RequestHandler } from "express";
import { logger } from "../../logging.js";

export const loggingMiddleware: RequestHandler = (req, res, next) => {
  logger.with({ reqId: req.id }, () => {
    logger.info(`request`, { method: req.method, path: req.path });
    res.on("finish", () => {
      logger.info("response", { code: res.statusCode, status: res.statusMessage });
    } );
    next();
  });
};
