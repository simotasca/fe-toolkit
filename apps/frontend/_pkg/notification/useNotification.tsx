import { Notification, type NotificationType } from "@pkg/ui";
import { useNotify as useNotifyBase } from "@pkg/react-notification-context";

export function useNotification() {
  const { customNotify, clear, remove } = useNotifyBase();
  const notify = (type: NotificationType, title: string, description?: string) => {
    customNotify(Notification, (p) => ({ type, title, description, remove: p.remove }))
  };
  return { clear, remove, notify, customNotify };
}