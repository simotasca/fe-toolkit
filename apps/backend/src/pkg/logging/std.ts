import { AsyncLocalStorage } from "node:async_hooks";
import { type Logger } from "./logger.js";
import { LEVEL_DEBUG, LEVEL_ERROR, LEVEL_FATAL, LEVEL_INFO, LEVEL_WARN, LogLevel } from "./level.js";

export type StdLoggerFmt = "pretty" | "json";

export class StdLogger implements Logger {
  private als = new AsyncLocalStorage<Map<string, any>>({ name: "std-logger" });
  private format: StdLoggerFmt;
  
  constructor(format: StdLoggerFmt) {
    this.format  = format;
  }

  info(msg: any, meta?: Record<string, any>): void {
    this.log(LEVEL_INFO, msg, meta, console.info.bind(console));
  }
  
  debug(msg: any, meta?: Record<string, any>): void {
    this.log(LEVEL_DEBUG, msg, meta, console.debug.bind(console));
  }
  
  warn(msg: any, meta?: Record<string, any>): void {
    this.log(LEVEL_WARN, msg, meta, console.warn.bind(console));
  }
  
  error(msg: any, meta?: Record<string, any>): void {
    this.log(LEVEL_ERROR, msg, meta, console.error.bind(console));
  }
  
  fatal(msg: any, meta?: Record<string, any>): void {
    this.log(LEVEL_FATAL, msg, meta, console.error.bind(console));
  }

  with<T>(meta: Record<string, any>, cb: () => T): T {
    const parent = this.als.getStore() ?? new Map<string, any>();
    const next = new Map(Object.entries(meta));
    for (const [k, v] of parent.entries()) next.set(k, v);
    return this.als.run(next, cb);
  }

  private log(lvl: LogLevel, msg: any, meta?: Record<string, any>, logfn: (msg: any) => void = console.log.bind(console)) {
    this.with(meta || {}, () => {
      const store = this.als.getStore() ?? new Map<string, any>();

      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");

      const timestamp =
        `${String(now.getFullYear())}-` +
        `${pad(now.getMonth() + 1)}-` +
        `${pad(now.getDate())} ` +
        `${pad(now.getHours())}:` +
        `${pad(now.getMinutes())}:` +
        `${pad(now.getSeconds())}`;

      if (this.format === "pretty") {
        const prettyMeta = Array.from(store.entries()).map(([k, v]) => `${k}="${fmtVal(v)}"`).join(" ");
        const line = `[${timestamp}] ${lvl}: ${String(msg)}` + (prettyMeta ? ` ${prettyMeta}` : "");
        logfn(line);
        return;
      }

      const obj: Record<string, any> = { timestamp, level: lvl, msg };

      for (const [k, v] of store.entries()) obj[k] = v;

      logfn(JSON.stringify(obj));
    });
  }
}

const fmtVal = (v: any) => typeof v === "object" ? JSON.stringify(v) : String(v);