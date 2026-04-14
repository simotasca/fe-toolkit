import z from "zod";

export const passwordSchema = z.string().min(1).max(255); // whatever rule here