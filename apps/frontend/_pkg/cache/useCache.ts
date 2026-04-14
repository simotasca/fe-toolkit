import { cache } from "./cache";
import { useCallback, useEffect } from "react";

export function useCache<Fn extends (...p: any) => Promise<any>>(scopeId: string, fetcher: Fn, ttl?: number) {
  useEffect(() => () => cache.invalidateScope(scopeId), [scopeId]);

  const getCachedData = useCallback(async (...p: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
    const cachedItem = cache.get(scopeId, p);

    if (cachedItem) {
      return Promise.resolve(cachedItem.value as ReturnType<Fn>);
    }

    return fetcher(...p).then((data) => {
      cache.set(scopeId, p, data, ttl);
      return data;
    });
  }, [scopeId, fetcher, ttl]);

  const invalidate = useCallback(() => {
    cache.invalidateScope(scopeId);
  }, [scopeId]);

  return [getCachedData, invalidate] as const;
}