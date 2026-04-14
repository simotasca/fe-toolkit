import { useState } from "react";
import { computeSetStateAction } from "./utils";

export type SearchParamsStateInit<T> = (qs: URLSearchParams) => T;
export type SearchParamsStateSync<T> =  (value: Partial<T>, qs: URLSearchParams) => void;

export function useSearchParamsState<T>(init: SearchParamsStateInit<T>, sync: SearchParamsStateSync<T>) {
  const [state, setState] = useState<T>(() => init(new URLSearchParams(window.location.search)));
  return [state, useSearchParamsSetStateSync<T>(setState, sync)] as const;
}

export function useSearchParamsSetStateSync<T>(setState: React.Dispatch<React.SetStateAction<T>>, sync: SearchParamsStateSync<T>) {
  return (action: React.SetStateAction<T>) => {
    const url = new URL(window.location.toString());
    setState(prev => {
      const newState = computeSetStateAction(prev, action);
      sync(newState, url.searchParams);
      history.replaceState(null, '', url);
      return newState;
    });
  };
}