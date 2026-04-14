import z from "zod";

export const userDTOSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserDTO = z.infer<typeof userDTOSchema>;