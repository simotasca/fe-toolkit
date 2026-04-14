import { authRouter } from "@/internal/domain/auth/auth-router.js";
import { env } from "@/internal/env.js";
import { logger } from "@/internal/logging.js";
import { pool } from "@/internal/persistence/pg.js";
import { cors } from "@/internal/web/middlewares/cors.js";
import { catchAllHandler, dbMiddleware, errorHandler, loggingMiddleware, reqIdMiddleware } from "@/internal/web/middlewares/index.js";
import { zodBodyParser } from "@/internal/web/middlewares/validation.js";
import bodyParser from "body-parser";
import Express from "express";

import { ensureAdminUser } from "@/internal/domain/auth/auth-service.js";
import { publicRouter } from "@/internal/domain/public/public-router.js";
import { userRouter } from "@/internal/domain/user/user-router.js";

ensureAdminUser(pool);

const app = Express();

app.use(cors([env.CMS_FRONTEND_HOST]));
app.use(bodyParser.json());
app.use(dbMiddleware);
app.use(zodBodyParser);
app.use(reqIdMiddleware);
app.use(loggingMiddleware);

app.use(authRouter);
app.use(userRouter);
app.use(publicRouter);

app.all("/*all", catchAllHandler);

app.use(errorHandler);

app.listen(env.PORT, () =>
  logger.info("server running on localhost:" + env.PORT),
);
