import { pool } from "@/internal/persistence/pg.js";
import { RequestHandler } from "express";
import { PoolClient } from "pg";

/**
 * injects a reqest scoped lazy db pool client.
 * see: https://node-postgres.com/features/pooling#single-query
 */
export const dbMiddleware: RequestHandler = (req, res, next) => {
  let client: PoolClient | null = null;
  
  req.dbConn = async () => {
    if (!client) client = await pool.connect();
    return client;
  }

  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    client?.release();
  };
  res.on("finish", release);
  res.on("close", release);
  
  next();
};
