import type { DebounceSettings } from ".";
import { useDebounceEffect } from "./useDebounceEffect";
import { useRef, useState } from "react";

export function useDebounceValue<T>(factory: () => T, deps: React.DependencyList, delay: number, options?: DebounceSettings): T {
  const [inner, setInner] = useState<T>(() => factory());
    
    const first = useRef(true);
    
    useDebounceEffect(() => {
      // skip extra effect calls on initial strict-mode render
      if (first.current) {
        first.current = false;
        return;
      }
      setInner(factory());
    }, delay, deps, options);
  
    return inner;
}