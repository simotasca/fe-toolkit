import { useLayoutEffect, useRef, type DependencyList } from "react";

export function useInitial(deps?: DependencyList) {
  const initial = useRef(true);
    
  useLayoutEffect(() => {
    initial.current = false;
  }, deps);

  return initial.current;
}