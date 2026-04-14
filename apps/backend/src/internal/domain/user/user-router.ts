import { auth } from "@/internal/domain/auth/auth-middleware.js";
import { userList } from "@/internal/domain/user/user-service.js";
import { wa } from "@/internal/web/async.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/user", auth, wa(async (req, res) => {
  const users = await userList(await req.dbConn());
  res.json(users);
}));