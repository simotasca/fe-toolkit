import { useState, useEffect } from "react";

/**
 * Turns a boolean flag into a “smooth” version that:
 * - waits for `delay` ms before setting true
 * - sets false immediately when flag is false
 */
export function useDelayFlag(flag: boolean, delay = 200) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (flag) {
      timer = setTimeout(() => setShow(true), Math.max(delay, 0));
    } else {
      if (timer) clearTimeout(timer);
      setShow(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [flag, delay]);

  return show;
}