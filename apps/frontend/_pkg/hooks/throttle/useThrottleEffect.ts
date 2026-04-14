import type { ThrottleSettings } from ".";
import { useThrottle } from "./useThrottle";
import { useEffect } from "react";

export function useThrottleEffect(callback: () => void, delay: number, deps?: React.DependencyList, settings?: ThrottleSettings) {
  const throttled = useThrottle(callback, delay, settings);
  useEffect(throttled, deps);
}