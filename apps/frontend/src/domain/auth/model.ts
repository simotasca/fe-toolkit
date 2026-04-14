import z from "zod";

export type LoginRequest = {
  email: string;
  password: string;
};

export const loginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type ConfirmRequest = {
  otp: string;
  password: string;
  username: string;
};
