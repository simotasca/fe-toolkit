import type { UserDTO } from "@/domain/user/model";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { UnexpectedStatusError } from "@pkg/api/parser";
import { createContext } from "@pkg/react-create-context";
import { LoadingIndicator } from "@pkg/ui/components";
import { Title } from "@pkg/ui/typography/titles";
import { sleep } from "@pkg/utils/promises";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import imgLogoEchad from "@/assets/logo-echad.png";

export * from "./AuthGuard";

export const [authCtx, useAuth] = createContext<UserDTO>();
  
export function AuthProvider(p: React.PropsWithChildren) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      sleep(700),
      api.auth.userInfo()
        .then((data) => {
          if (data.label === "OK") setUser(data.body)
          else throw new UnexpectedStatusError(data);
        })
        .catch((err) => {
          setUser(null);
          console.error("Failed to fetch user info:", err);
        })
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="fixed w-screen h-screen grid place-items-center pb-[2svh]">
      <div className="vbox items-center">
         <img className="w-20 not-dark:invert -mb-2" src={imgLogoEchad} alt="logo studio frisia" />
        <Title h="4">Echad CMS</Title>
        <div className="opacity-80 mt-4">
          <LoadingIndicator />
        </div>
      </div>
    </div>
  );
  if (!user) return <Navigate to={routes.auth.login.href()} />;

  return <authCtx.Provider value={user}>{p.children}</authCtx.Provider>
}

export function useLogout() {
  const navigate = useNavigate();
  return () => {
    api.auth.logout();
    navigate(routes.auth.login.href());
  }
}