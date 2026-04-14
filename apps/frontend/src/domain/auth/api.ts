import { userDTOSchema } from "@/domain/user/model";
import type { Parser, Service } from "@pkg/api";
import { loginResponseSchema, type ConfirmRequest, type LoginRequest } from "./model";
import { logout, storeAuthToken } from "./utils";

export default function authApi(s: Service, p: Parser) {
  return {
    /** automatically stores the auth token in localstorage */
    login: (body: LoginRequest) =>
      s.post("/auth/login", body)
        .then(p.parse({ 200: loginResponseSchema, 401: "invalid credentials" }))
        .then(res => {
          if (res.ok) storeAuthToken(res.body.token);
          return res;
        }),

    /** in react-router, opt for `useLogout` instead */
    logout,

    invite: (email: string) => 
      s.post("/auth/invite", { email })
        .then(p.parse({ 204: "ok", 409: "user already exist" })),

    confirm: (body: ConfirmRequest) => 
      s.post("/auth/confirm", body)
        .then(p.parse({ 201: "ok", 401: "session expired", 409: "session expired" })),

    userInfo: () => 
      s.get("/auth/userinfo")
        .then(p.parse({ 200: userDTOSchema })),
      
    resetPassword: {
      request: (email: string) =>
        s.post("/auth/reset-password/request", { email })
          .then(p.parse({ 204: "ok", 401: "user not registered" })),

      confirm: (otp: string, newPassword: string) =>
        s.post("/auth/reset-password/confirm", { otp, newPassword })
          .then(p.parse({ 204: "ok", 401: "invalid otp" })),
    },
  }
}