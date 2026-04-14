import { verifyUserToken } from "@/internal/domain/auth/jwt-service.js";
import { wa } from "@/internal/web/async.js";
import { StatusError } from "@/internal/web/StatusError.js";

export const auth = wa((req, _res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) throw new StatusError(401, 'Unauthorized');

  const token = authHeader.split(' ')[1];
  if (!token) throw new StatusError(401, 'Unauthorized');

  const user = verifyUserToken(token);
  if (!user) throw new StatusError(403, 'Forbidden');

  req.user = user;
  next();
});