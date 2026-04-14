import { PublicUser, SimpleUser } from "@/internal/domain/user/user.ts";
import type { Pool, PoolClient } from "pg";
import type z from "zod";

declare module "express-serve-static-core" {
  interface Request {
    parseBody<T extends z.ZodType>(schema: T): z.output<T>;
    id?: string;
    dbConn(): Promise<PoolClient>;
    user?: SimpleUser;
  }
}