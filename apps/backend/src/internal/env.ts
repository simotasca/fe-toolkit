import { StdLoggerFmt } from "@/pkg/logging/std.js";
import { jsonSchema } from "@/pkg/validation/json.js";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),

  DB_CONN: z.string().min(1),

  LOGGER: z.enum(["json", "pretty"]).default("pretty").transform((v): StdLoggerFmt => v),

  MAIL_OPTIONS: jsonSchema,
  MAIL_SENDER: z.email(),

  CMS_FRONTEND_HOST: z.url(),
  CMS_FRONTEND_CONFIRM_ACCOUNT_PATH: z.string().min(1),
  CMS_FRONTEND_RESET_PASSWORD_PATH: z.string().min(1),
  CMS_FRONTEND_GOOGLE_AUTH_PATH: z.string().min(1).optional(),

  JWT_TOKEN_SECRET: z.string().min(1),
  JWT_TOKEN_EXPIRES_IN_HOURS: z.number().min(1).default(6),
  
  INVITE_OTP_TTL_MS: z.coerce.number().default(1000 * 60 * 60),
  RESET_PASSWORD_OTP_TTL_MS: z.coerce.number().default(1000 * 60 * 60),

  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  
  // Optional admin bootstrap credentials. If provided, `ensureAdminUser` can create the admin user on startup.
  ADMIN_EMAIL: z.email().optional(),
  ADMIN_USERNAME: z.string().min(1).optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
});

export const env = envSchema.parse(process.env);