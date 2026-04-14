import z from "zod";

export const simpleUserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  username: z.string(),
  role: z.enum(["user", "admin"]),
});
export type SimpleUser = z.infer<typeof simpleUserSchema>;

export const publicUserSchema = simpleUserSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PublicUser = z.infer<typeof publicUserSchema>;

export const userSchema = publicUserSchema.extend({
  password: z.string().min(1).max(255),
});

export type User = z.infer<typeof userSchema>;