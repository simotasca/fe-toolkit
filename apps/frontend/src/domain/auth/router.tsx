import { Route } from "react-router";
import { ConfirmAccountPage } from "./pages/ConfirmAccountPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { authRoutes } from "./routes";

export const authRouter = (
  <>
    <Route path={authRoutes.login.path} element={<LoginPage />} />
    <Route path={authRoutes.confirmAccount.path} element={<ConfirmAccountPage />} />
    <Route path={authRoutes.forgotPassword.path} element={<ForgotPasswordPage />} />
    <Route path={authRoutes.resetPassword.path} element={<ResetPasswordPage />} />
  </>
);
