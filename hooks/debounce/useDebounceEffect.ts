import type { DebounceSettings } from ".";
import { useDebounce } from "./useDebounce";
import { useEffect } from "react";

export function useDebounceEffect(callback: () => void, delay: number, deps?: React.DependencyList, debounceOptions?: DebounceSettings) {
  const throttled = useDebounce(callback, delay, debounceOptions);
  useEffect(throttled, deps);
}