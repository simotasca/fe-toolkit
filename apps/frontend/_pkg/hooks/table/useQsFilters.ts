import { useSearchParamsState, type SearchParamsStateInit, type SearchParamsStateSync } from "../search-params";
import { useFilters, type Filters } from "./useFilters";

export function useQsFilters<T extends Filters>(init: SearchParamsStateInit<Partial<T>>, sync: SearchParamsStateSync<Partial<T>>) {
  const [state, setState] = useSearchParamsState<Partial<T>>(init, sync);
  return useFilters<T>(state, setState);
}
