import { RequestHandler } from "express";

export function cors(allowedHosts: string[]): RequestHandler {
  const corsAllowedHosts = allowedHosts.map((d) => parseDomain(d)[1]);
  return (req, res, next) => {
    const caller = req.header("origin") || req.header("host");
    const [callerOrigin, callerHost] = parseDomain(caller);
    if (corsAllowedHosts.includes(callerHost)) {
      res.setHeader("Access-Control-Allow-Origin", callerOrigin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Vary", "Origin");
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }
    }
    next();
  };
}

export function parseDomain(url: string) {
  let ok = url;
  if (!ok.startsWith("http")) ok = "http://" + ok;
  const obj = new URL(ok);
  return [obj.origin, obj.hostname];
}
