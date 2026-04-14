import { AuthProvider } from "@/domain/auth/context";
import { authRouter } from "@/domain/auth/router";
import { NotificationProvider, useNotificationContext } from "@pkg/react-notification-context";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ThemeProvider } from "@/context/theme-context";
import { SomethingPage } from "@/router/pages/SomethingPage";
import { userRouter } from "@/domain/user/router";

export function EchadRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {authRouter}
        <Route Component={AppContainer}>
          <Route path="*" Component={NotFoundPage} />
          <Route path="/" Component={HomePage} />
          <Route path="/something" Component={SomethingPage} />
          {userRouter}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AppContainer() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider value={useNotificationContext()}>
          <Layout />
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
