import { useMemo, useState } from "react";

export type Setter<T> = <K extends keyof T>(key: K, val: T[K]) => void;
export type SetterFactory<T> = <K extends keyof T>(key: K) => (val: T[K]) => void;
export type Remover<T> = <K extends { [K in keyof T]: undefined extends T[K] ? K : never; }[keyof T]>(key: K) => void;

export type ObjectActions<T> = {
  setObject: React.Dispatch<React.SetStateAction<T>>,
  set: Setter<T>,
  setter: SetterFactory<T>,
  remove: Remover<T>,
}

export function useObjectState<T>(initialState: T | (() => T)) {
  const [value, setValue] = useState<T>(initialState);
  return [value, useObjectActions(setValue)] as const;
}

export function useObject<T>(value: T, setValue: React.Dispatch<React.SetStateAction<T>>) {
  return [value, useObjectActions(setValue)] as const;
}

export function useObjectActions<T>(setValue: React.Dispatch<React.SetStateAction<T>>) {
  return useMemo(() => ({
    setObject: setValue,
    set: <K extends keyof T>(key: K, val: T[K]) => setValue((prev) => ({ ...prev, [key]: val })),
    setter: <K extends keyof T>(key: K) => (val: T[K]) => setValue((prev) => ({ ...prev, [key]: val })),
    remove: <K extends { [K in keyof T]: undefined extends T[K] ? K : never; }[keyof T]>(key: K) => 
      setValue((prev) => {
        const { [key]: _, ...clean } = prev;
        return clean as T;
      })
  }), []) as ObjectActions<T>;
}