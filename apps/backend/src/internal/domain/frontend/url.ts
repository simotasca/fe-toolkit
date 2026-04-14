import { env } from "node:process";

export function frontendUrl(path: string) {
  return new URL(path, env.CMS_FRONTEND_HOST).toString();
}