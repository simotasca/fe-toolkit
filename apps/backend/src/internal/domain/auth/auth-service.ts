import { generateUserToken } from "@/internal/domain/auth/jwt-service.js";
import { mapUserRowToPublicUser } from "@/internal/domain/user/user-mapper.js";
import { userCreate, userExistsByEmail, userExistsByUsername, userFindByEmail } from "@/internal/domain/user/user-service.js";
import { PublicUser } from "@/internal/domain/user/user.js";
import { frontendUrl } from "@/internal/domain/frontend/url.js";
import { env } from "@/internal/env.js";
import { logger } from "@/internal/logging.js";
import { sendMail } from "@/internal/mail.js";
import { otpStore } from "@/internal/persistence/otp.js";
import { Service } from "@/internal/persistence/pg.js";
import { StatusError } from "@/internal/web/StatusError.js";
import argon2 from "argon2";
import crypto from 'node:crypto';

export class UserAlreadyExistsError extends StatusError {
  constructor(user: { email: string, username?: undefined } | { email?: undefined, username?: string }) {
    if (user.email) {
      super(409, `user with email "${user.email}" already exists`);
      this.payload.email = user.email;
    } else {
      super(409, `user with username "${user.username}" already exists`);
      this.payload.username = user.username;
    }
    this.name = "UserAlreadyExistsError";
  }
}

export class BadCredentialsError extends StatusError {
  constructor(message: string) {
    super(401, message);
    this.name = "BadCredentialsError";
  }
}

export async function invite(db: Service, email: string) {
  if (await userExistsByEmail(db, email)) throw new UserAlreadyExistsError({ email });

  const otp = otpStore.store(env.INVITE_OTP_TTL_MS, email);

  const confirmationLink = new URL(
    `${env.CMS_FRONTEND_CONFIRM_ACCOUNT_PATH}?otp=${encodeURIComponent(otp)}`,
    env.CMS_FRONTEND_HOST
  );

  await sendMail(
    email,
    "Account creation [Echad CMS]",
    `You've been invited to the Echad platform! \n Click here to confirm your account: ${confirmationLink.toString()}`
  );
}

export async function confirm(db: Service, otp: string, password: string, username: string) {
  const email = otpStore.consume<string>(otp);
  if (email == null) throw new BadCredentialsError("invalid or expired otp");
  if (await userExistsByEmail(db, email)) throw new UserAlreadyExistsError({ email });
  if (await userExistsByUsername(db, username)) throw new UserAlreadyExistsError({ username });

  const hashPw = await argon2.hash(password);
  return userCreate(db, email, hashPw, username);
}

export async function login(db: Service, email: string, password: string) {
  // fetch user by email and verify password using argon2.verify
  const res = await db.query("select * from auth.user where email = $1", [email]);
  const row = res.rows[0];
  if (!row) throw new BadCredentialsError("invalid credentials");

  const storedHash = row.password;
  const isValid = await argon2.verify(storedHash, password).catch(() => false);
  if (!isValid) throw new BadCredentialsError("invalid credentials");

  const user = mapUserRowToPublicUser(row);
  return generateUserToken(user);
}

export async function requirePasswordReset(db: Service, email: string) {
  const res = await db.query("select * from auth.user where email = $1", [email]);
  const row = res.rows[0];
  if (!row) throw new BadCredentialsError("invalid credentials");

  const otp = otpStore.store(env.RESET_PASSWORD_OTP_TTL_MS, email);

  const resetLink = new URL(
    `${env.CMS_FRONTEND_RESET_PASSWORD_PATH}?otp=${encodeURIComponent(otp)}`,
    env.CMS_FRONTEND_HOST
  );

  await sendMail(
    email,
    "Password reset [Echad CMS]",
    `A password reset has been requested for your account. \n Click here to reset your password: ${resetLink.toString()}`
  );
}

export async function resetPassword(db: Service, otp: string, newPassword: string) {
  const email = otpStore.consume<string>(otp);
  if (email == null) throw new BadCredentialsError("invalid or expired otp");

  const hashPw = await argon2.hash(newPassword);

  const res = await db.query(
    "update auth.user set password = $1 where email = $2 returning *",
    [hashPw, email]
  );

  const row = res.rows[0];
  if (!row) throw new BadCredentialsError("invalid credentials");

  return mapUserRowToPublicUser(row);
}

export async function googleAuthCallback(db: Service, code: string) {
  // exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: frontendUrl(env.CMS_FRONTEND_GOOGLE_AUTH_PATH),
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    throw new BadCredentialsError('failed to exchange code: ' + body);
  }

  const tokenJson = await tokenRes.json();
  const accessToken = tokenJson.access_token;
  // const idToken = tokenJson.id_token;

  // fetch user profile
  const profileRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!profileRes.ok) {
    throw new BadCredentialsError('failed to fetch userinfo');
  }
  const profile = await profileRes.json();
  // profile contains: sub, email, email_verified, name, picture...

  if (!profile.email || !profile.email_verified) {
    throw new BadCredentialsError('email not verified by provider');
  }

  const email: string = profile.email;
  const username = profile.name ?? profile.email.split('@')[0];

  // find or create local user
  const q = await db.query('select * from auth.user where email = $1', [email]);
  let user: PublicUser;
  if (q.rows[0]) {
    user = mapUserRowToPublicUser(q.rows[0]);
  } else {
    // create a random password (not used) and hash it
    const randomPw = crypto.randomBytes(32).toString('hex');
    const hash = await argon2.hash(randomPw);
    user = await userCreate(db, email, hash, username);
  }

  return generateUserToken(user);
}

/** Ensure an admin user configured via env exists. Returns the user or null if no admin config provided. */
export async function ensureAdminUser(db: Service) {
  try {
    if (!env.ADMIN_EMAIL || !env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
      logger.warn("Admin user not configured. Set ADMIN_EMAIL, ADMIN_USERNAME and ADMIN_PASSWORD to enable admin user creation.");
      return null;
    }

    const found = await userFindByEmail(db, env.ADMIN_EMAIL);
    if (found) {
      logger.info(`Admin user with email ${env.ADMIN_EMAIL} already exists. Skipping admin user creation.`);
      return found;
    }

    const hash = await argon2.hash(env.ADMIN_PASSWORD);
    const created = await userCreate(db, env.ADMIN_EMAIL, hash, env.ADMIN_USERNAME, true);

    logger.info(`Admin user with email ${env.ADMIN_EMAIL} created successfully.`);
    
    return created;
  } catch (err) {
    logger.error("Failed to ensure admin user exists", { error: err instanceof Error ? err.stack : String(err) });
  }
}

export function isGoogleAuthConfigured() {
  return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.CMS_FRONTEND_GOOGLE_AUTH_PATH);
}

export function assertGoogleAuthConfigured() {
  if (!isGoogleAuthConfigured())
    throw new GoolgeAuthNotConfiguredError();
}

class GoolgeAuthNotConfiguredError extends StatusError {
  constructor() {
    super(500, "Google authentication is not enabled");
    this.name = "GoogleAuthNotEnabledError";
  }
}