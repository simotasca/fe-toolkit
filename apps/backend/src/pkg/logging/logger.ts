export interface Logger {
  info(msg: any, meta?: Record<string, any>): void,
  debug(msg: any, meta?: Record<string, any>): void,
  warn(msg: any, meta?: Record<string, any>): void,
  error(msg: any, meta?: Record<string, any>): void,
  fatal(msg: any, meta?: Record<string, any>): void,
  with<T>(meta: Record<string, any>, cb: () => T): T,
}
