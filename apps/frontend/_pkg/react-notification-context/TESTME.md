## Real-world Example: Stacked Toasts with Animations

Here’s how to build an animated toast notification system with **framer-motion**.

```tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  initNotificationContext,
  NotificationProvider,
  useNotify,
  useNotificationsQueue,
} from "react-notification-context";
****
// 1. Notification component
function Toast({ message, onClose }: { message: string; onClose(): void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.25 }}
      className="toast"
    >
      {message}
      <button onClick={onClose}>✖</button>
    </motion.div>
  );
}

// 2. Toast container rendering the queue
function ToastsContainer() {
  const { queue } = useNotificationsQueue();

  return (
    <div className="toasts">
      <AnimatePresence>
        {queue.map((n) => (
          <Toast key={n.id} {...n.props} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// 3. A button that triggers notifications
function NotifyButton() {
  const { customNotify } = useNotify();

  const handleClick = () => {
    customNotify(Toast, ({ remove }) => ({
      message: "Hello World!",
      onClose: remove,
    }));
  };

  return <button onClick={handleClick}>Show Toast</button>;
}

// 4. App root
export default function App() {
  const ctx = initNotificationContext({ lifetime: 4000 });

  return (
    <NotificationProvider value={ctx}>
      <NotifyButton />
      <ToastsContainer />
    </NotificationProvider>
  );
}