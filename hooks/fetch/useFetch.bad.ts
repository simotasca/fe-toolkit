import { useEffect, useState, type DependencyList } from "react";

type FetchResult<T> = { refetch: () => Promise<void> } & (
  | { pending: true; error: never; data: never }
  | { pending: false; error: any; data: never }
  | { pending: false; error: never; data: T }
);

const Nullish: unique symbol = Symbol("NULL_USE_FETCH_DATA");
type Nullish = typeof Nullish;

export function useFetch<T>(fn: () => Promise<T>, deps: DependencyList = []): FetchResult<T> {
  const [data, setData] = useState<T | Nullish>(Nullish);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<any>(null);

  const refetch = async () => {
    setData(Nullish);
    setPending(true);
    setError(null);
    fn()
      .then(setData)
      .catch((err) => setError(err))
      .finally(() => setPending(false));
  };

  useEffect(() => void refetch(), deps);

  if (pending) return { refetch, pending, error: undefined as never, data: undefined as never };

  if (error) return { refetch, pending, error, data: undefined as never };

  if (data === Nullish) throw new Error("unexpected useFetch error");

  return { refetch, pending, data, error: undefined as never };
}
