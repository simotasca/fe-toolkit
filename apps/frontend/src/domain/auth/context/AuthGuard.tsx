import type { UserDTO } from "@/domain/user/model";
import { useAuth } from ".";

export type AuthValidator = (r: UserDTO) => boolean;

type AuthGuardProps = React.PropsWithChildren<{ if: AuthValidator }>;
export function AuthGuard(p: AuthGuardProps) {
  const user = useAuth();
  return p.if(user) ? p.children : null;
}
