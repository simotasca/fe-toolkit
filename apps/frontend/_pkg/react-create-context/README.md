# Create React Context

A tiny helper for creating strongly-typed React contexts with safe hooks.

## Features
- 🪶 Minimal boilerplate.
- 🎯 Works with **auto initialized** or **manually provided** contexts.  
- 🔒 Throws error if context is used outside a provider.  

---

## Installation
```bash
npm install github:simotasca/create-react-context
```

---

## Usage

### 1. Auto initialized Context

When your context value can be computed inside the provider:

```tsx
import { createContext } from "create-react-context";

function initializer() {
  const [count, setCount] = React.useState(0);
  return { count, setCount };
}

const [, useCounter, CounterProvider] = createContext({ initializer });

function Counter() {
  const { count, setCount } = useCounter();
  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
```

---

### 2. Manually-provided Context

When you want to control the value externally:

```tsx
import { createContext } from "create-react-context";

const [, useTheme, ThemeProvider] = createContext<{ mode: "light" | "dark" }>();

function Button() {
  const theme = useTheme();
  return <button>{theme.mode === "dark" ? "🌙" : "☀️"}</button>;
}

export default function App() {
  return (
    <ThemeProvider value={{ mode: "dark" }}>
      <Button />
    </ThemeProvider>
  );
}
```

---

## API

```ts
createContext<C>({
  errorMsg?: string;
  initialValue?: C;
  initializer?: () => C; // may be a hook
}): [Context, useHook, Provider]
```

* **Context** → The React context object.
* **useHook** → Safe hook that throws if used outside provider.
* **Provider** → 
  * With `initializer`: no props, runs the initializer (can contain hooks).
  * Without `initializer`: requires a `value` prop.

---

## Error Handling

If you call the hook outside of a provider, a `ContextError` is thrown:

```ts
const value = useHook(); // ❌ throws ContextError
```