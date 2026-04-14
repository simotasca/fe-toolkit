import type { ThrottleSettings } from ".";
import { useThrottleEffect } from "./useThrottleEffect";
import { useRef, useState } from "react";

/** notare che in strict mode questo causa 1 aggiornamento in più di una memo perchè initial vale solo per il primo rerender */
export function useThrottleValue<T>(factory: () => T, deps: React.DependencyList, delay: number, options?: ThrottleSettings): T {
  const [inner, setInner] = useState<T>(factory);
  const initial = useRef(true);
  useThrottleEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setInner(factory());
  }, delay, deps, options);
  return inner;
}