export const LEVEL_INFO  = "info";
export const LEVEL_DEBUG = "debug";
export const LEVEL_WARN  = "warn";
export const LEVEL_ERROR = "error";
export const LEVEL_FATAL = "fatal";

export const LOG_LEVELS = [LEVEL_INFO, LEVEL_DEBUG, LEVEL_WARN, LEVEL_ERROR, LEVEL_FATAL] as const;

export type LogLevel = typeof LOG_LEVELS[number];
