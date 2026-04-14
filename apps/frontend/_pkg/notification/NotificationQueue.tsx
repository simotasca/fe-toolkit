import { NotificationPanel } from "@pkg/ui";
import { useNotificationsQueue } from "@pkg/react-notification-context";

export function NotificationQueue() {
  const { queue } = useNotificationsQueue();
  return (
    <NotificationPanel>
      {queue.map((n) => (
        <n.Component key={n.id} {...n.props} />
      ))}
    </NotificationPanel>
  );
}
