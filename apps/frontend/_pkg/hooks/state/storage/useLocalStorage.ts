import { computeSetStateAction } from "../../utils";
import { useState } from "react";

/**
 * Syncronizes a react state with a local storage item. The item should be in JSON encoded format
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    let storageItem = localStorage.getItem(key);
    if (!storageItem) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(storageItem) as T;
    } catch (err) {
      console.error("useLocalStorage could not parse stored json item", err);
      return defaultValue;
    }
  });

  const setLocalValue = (newValue: React.SetStateAction<T>) => {
    setValue((prev) => {
      const processed = computeSetStateAction(prev, newValue);
      localStorage.setItem(key, JSON.stringify(processed));
      return processed;
    });
  };

  return [value, setLocalValue];
}
