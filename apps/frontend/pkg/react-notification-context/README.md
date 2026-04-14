# React Notification Context

A lightweight React context-based system for managing **notifications**.  
Provides a queue, safe hooks, and a flexible API to push custom notification components.  

---

## Features
- 🔔 Queue-based notifications with auto-expiration.  
- 🎯 `customNotify` accepts any React component.  
- ⏱️ Configurable lifetime & cleanup interval.  
- 🧹 Built-in `clear` and `remove`.  
- 🪶 Easy to wrap with your own custom hooks.  

---

## Installation
```bash
npm install github:simotasca/react-notification-context
```

Requires React >=18.

---

## Usage

### 1. Initialize Context

```tsx
import { initNotificationContext, NotificationProvider } from "react-notification-context";

const notificationCtx = initNotificationContext({
  lifetime: 5000,         // ms before notification auto-removes (default 6000)
  cleanupInterval: 1000,  // ms between cleanup checks (default 500)
});

export default function App() {
  return (
    <NotificationProvider value={notificationCtx}>
      <YourApp />
    </NotificationProvider>
  );
}
```

---

### 2. Push a Notification

```tsx
import { useNotify, useNotificationsQueue } from "react-notification-context";

function MyButton() {
  const { customNotify } = useNotify();

  const handleClick = () => {
    customNotify(MyNotification, ({ createdAt, remove }) => ({
      title: "Hello!",
      createdAt,
      onClose: remove,
    }));
  };

  return <button onClick={handleClick}>Notify!</button>;
}
```

> ⚡ **Performance tip:**  
> Components that call `useNotify` won’t re-render when notifications are added/removed.  
> Only components using `useNotificationsQueue` re-render as the queue changes.

Where `MyNotification` is your component:

```tsx
function MyNotification({ title, onClose }: { title: string; onClose(): void }) {
  return (
    <div>
      <strong>{title}</strong>
      <button onClick={onClose}>✖</button>
    </div>
  );
}
```

---

### 3. Render the Queue

```tsx
import { useNotificationsQueue } from "react-notification-context";

function NotificationsContainer() {
  const { queue } = useNotificationsQueue();

  return (
    <div className="notifications">
      {queue.map((n) => (
        <n.Component key={n.id} {...n.props} />
      ))}
    </div>
  );
}
```

---

## Suggested Pattern

Wrap `useNotify` to expose preconfigured notifications:

```tsx
function useCustomNotify() {
  const { customNotify, clear, remove } = useNotify();

  const notifySuccess = (msg: string) =>
    customNotify(SuccessToast, () => ({ message: msg }));

  const notifyError = (msg: string) =>
    customNotify(ErrorToast, () => ({ message: msg }));

  return { notifySuccess, notifyError, clear, remove };
}
```

---

## API

### `initNotificationContext(options?: { lifetime?: number; cleanupInterval?: number })`

Creates a notification context with queue + helpers.

* **lifetime** → ms before auto-removal (default `6000`)
* **cleanupInterval** → ms between cleanup ticks (default `500`)

### Hooks

* `useNotify()` → { `customNotify`, `remove`, `clear` }
  > ⚡ **Note:** Calling `useNotify` does **not** cause re-renders when the queue changes.
  > Components using this hook stay stable — only `useNotificationsQueue` subscribers re-render.
* `useNotificationsQueue()` → { `queue`, `setQueue` }
  > 🌀 Components using this hook will re-render whenever the queue updates.

### Components

* `<NotificationProvider value={ctx} />`

---

## Error Handling

If you use `useNotify` or `useNotificationsQueue` outside of `<NotificationProvider>`, an error is thrown.

---

## Example Demo

```tsx
function App() {
    return (
    const ctx = initNotificationContext();
    
    <NotificationProvider value={ctx}>
      <NotificationsContainer />
      <MyButton />
    </NotificationProvider>
  );
}
```
