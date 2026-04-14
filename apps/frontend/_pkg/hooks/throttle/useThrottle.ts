import { useEffect, useMemo, useRef } from "react";
import throttle from "lodash.throttle";
import type { ThrottleSettings } from ".";

export function useThrottle<T extends (...p: any[]) => void>(callback: T, delay: number, settings?: ThrottleSettings) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const throttleCallback = useMemo(() => {
    const func = (...p: Parameters<T>) => {
      ref.current!(...p);
    }
    return throttle(func, delay, settings);
  }, []);

  return throttleCallback;
}