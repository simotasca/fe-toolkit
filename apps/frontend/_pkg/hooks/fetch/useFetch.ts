import { usePending } from "../state/usePending";
import { useCallback, useState } from "react";

export type FetchResult = {
  loading: boolean;
  error?: any;
  refetch: () => Promise<void>;
};

export function useFetch<F extends (...args: any) => any>(
  fn: F,
  initialPending?: boolean,
  refetchDeps: React.DependencyList = []
): FetchResult {
  const [loading, startLoading, endLoading] = usePending(initialPending);
  const [error, setError] = useState<any>(null);

  const refetch = useCallback(
    async (...args: Parameters<F>) => {
      startLoading();
      try {
        await fn(...args);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        endLoading();
      }
    },
    [fn, ...refetchDeps]
  );

  return { refetch, loading, error };
}
