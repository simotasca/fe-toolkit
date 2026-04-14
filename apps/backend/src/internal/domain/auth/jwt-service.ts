import { simpleUserSchema, type SimpleUser } from "@/internal/domain/user/user.js";
import { env } from "@/internal/env.js";
import { logger } from "@/internal/logging.js";
import jwt from "jsonwebtoken";

export function generateUserToken(user: SimpleUser) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    env.JWT_TOKEN_SECRET,
    { expiresIn: 1000 * 60 * 60 * env.JWT_TOKEN_EXPIRES_IN_HOURS, subject: user.email },
  );
}

export function verifyUserToken(token: string): SimpleUser | null {
  try {
    const decoded = jwt.verify(token, env.JWT_TOKEN_SECRET);
    return simpleUserSchema.parse(decoded);
  } catch (err) {
    logger.error("Failed to verify JWT token", { error: err.message });
    return null;
  }
}