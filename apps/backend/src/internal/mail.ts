import { env } from "@/internal/env.js";
import { logger } from "@/internal/logging.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport(env.MAIL_OPTIONS);

try {
  await transporter.verify();
  logger.info("SMTP vertification passed");
} catch (err) {
  logger.warn("SMTP verification failed:", { error: err.message });
}

export async function sendMail(dest: string | string[], subject: string, text?: string, html?: string) {
  let to = Array.isArray(dest) ? dest.join(", ") : dest;
  return transporter.sendMail({ from: env.MAIL_SENDER, to, subject, text, html });
}