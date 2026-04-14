import { auth } from "@/internal/domain/auth/auth-middleware.js";
import { assertGoogleAuthConfigured, BadCredentialsError, confirm, googleAuthCallback, invite, login, requirePasswordReset, resetPassword } from "@/internal/domain/auth/auth-service.js";
import { userFindByEmail } from "@/internal/domain/user/user-service.js";
import { frontendUrl } from "@/internal/domain/frontend/url.js";
import { env } from "@/internal/env.js";
import { otpStore } from "@/internal/persistence/otp.js";
import { wa } from "@/internal/web/async.js";
import { passwordSchema } from "@/pkg/validation/password.js";
import { Router } from "express";
import z from "zod";

export const authRouter = Router();

authRouter.post("/auth/invite", wa(async (req, res) => {
  await invite(await req.dbConn(), req.parseBody(z.email()));
  res.status(204).end();
}));

authRouter.post("/auth/confirm", wa(async (req, res) => {
  const body = req.parseBody(z.object({
    otp: z.string(),
    password: passwordSchema,
    username: z.string().min(1).max(100)
  }));
  await confirm(await req.dbConn(), body.otp, body.password, body.username);
  res.status(201).end();
}));

authRouter.post("/auth/login", wa(async (req, res) => {
  const body = req.parseBody(z.object({
    email: z.email(),
    password: z.string().min(1),
  }));
  const token = await login(await req.dbConn(), body.email, body.password);
  res.status(200).json({ token });
}));

authRouter.get("/auth/userinfo", auth, wa(async (req, res) => {
  const user = await userFindByEmail(await req.dbConn(), req.user.email);
  res.status(200).json(user);
}));

authRouter.post("/auth/reset-password/request", wa(async (req, res) => {
  const body = req.parseBody(z.object({ email: z.email() }));
  await requirePasswordReset(await req.dbConn(), body.email);
  res.status(204).end();
}));

authRouter.post("/auth/reset-password/confirm", wa(async (req, res) => {
  const body = req.parseBody(z.object({
    otp: z.string(),
    newPassword: passwordSchema,
  }));
  await resetPassword(await req.dbConn(), body.otp, body.newPassword);
  res.status(204).end();
}));

authRouter.get('/auth/google', wa(async (_req, res) => {
  assertGoogleAuthConfigured();

  // create single-use state token
  const otp = otpStore.store(5 * 60 * 1000, 'google_oauth_state'); // 5min
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: frontendUrl(env.CMS_FRONTEND_GOOGLE_AUTH_PATH),
    response_type: 'code',
    scope: 'openid email profile',
    state: otp,
    access_type: 'offline', // if you want a refresh token
    prompt: 'consent', // optional
  });
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
}));

authRouter.post('/auth/google/callback', wa(async (req, res) => {
  assertGoogleAuthConfigured();
  
  const body = req.parseBody(z.object({ code: z.string(), otp: z.string() }));

  // verify otp (single-use)
  const valid = otpStore.consume<string>(body.otp);
  if (valid == null) throw new BadCredentialsError("invalid or expired otp");

  const token = await googleAuthCallback(await req.dbConn(), body.code);
  return res.status(200).json({ token });
}));