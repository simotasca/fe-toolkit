import { useFetch, type FetchResult } from "./useFetch";
import { useEffect } from "react";

export function useAutoFetch(
  fn: () => any,
  deps: React.DependencyList = []
): FetchResult {
  const result = useFetch(fn, true, deps);
  useEffect(() => void result.refetch(), deps);
  return result;
}
