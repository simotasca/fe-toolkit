import { env } from "@/internal/env.js";
import { type Logger } from "@/pkg/logging/logger.js";
import { StdLogger } from "@/pkg/logging/std.js";

export const logger: Logger = new StdLogger(env.LOGGER);
