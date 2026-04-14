import { RequestHandler } from "express";
import z from "zod";

export class ValidationError extends Error {
  public inner: z.ZodError;
  constructor(zodErr: z.ZodError, source: string) {
    super("invalid " + source);
    this.inner = zodErr;
  }
}

// inject parseBody function on request object
export const zodBodyParser: RequestHandler = (req, _res, next) => {
  req.parseBody = <T extends z.ZodType>(schema: T) => {
    const { success, error, data } = schema.safeParse(req.body);
    if (!success) throw new ValidationError(error, "body");
    return data;
  };
  next();
};
