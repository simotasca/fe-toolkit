import type { PropsWithChildren } from "react";
import { NotificationProvider as BaseNotificationProvider, useNotificationContext } from "@pkg/react-notification-context";

// TODO: animation in/out/group
// TODO: estrarre un componente UI

type NotificationProviderProps = PropsWithChildren<Parameters<typeof useNotificationContext>[0]>;
export function NotificationProvider({ children, ...options }: NotificationProviderProps) {
  const ctx = useNotificationContext(options);
  return (
    <BaseNotificationProvider value={ctx}>
      {children}
    </BaseNotificationProvider>
  );
}