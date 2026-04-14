import z from "zod";

/** Helper: safe JSON parse with Zod-friendly error */
export const jsonSchema = z.string().min(1).transform((val, ctx): any => {
  try {
    return JSON.parse(val);
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
    return z.NEVER;
  }
});