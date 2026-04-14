import { useInitial } from "./useInitial";
import { useEffect, type DependencyList } from "react";

export function useSkipInitialEffect(effect: () => void, deps?: DependencyList) {
  const initial = useInitial();

  useEffect(() => {
    if (initial) return;
    return effect();
  }, deps);
}