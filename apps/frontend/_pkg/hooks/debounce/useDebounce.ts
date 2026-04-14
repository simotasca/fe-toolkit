import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import type { DebounceSettings } from ".";

export function useDebounce<T extends (...p: any[]) => void>(
  callback: T,
  delay: number,
  settings?: DebounceSettings
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debounceCallback = useMemo(() => {
    const func = (...p: Parameters<T>) => {
      ref.current!(...p);
    };
    return debounce(func, delay, settings);
  }, []);

  return debounceCallback;
}
