import { useRef } from "react";

export function useUncontrolled<T extends Record<string, any>>() {
  const inputRefs = useRef<Partial<Record<keyof T, HTMLInputElement | HTMLSelectElement | null>>>(
    {}
  );

  const setValue = <K extends keyof T>(k: K, value: string) => {
    if (!inputRefs.current?.[k]) return;
    const input = inputRefs.current?.[k];
    input.value = value;
  };

  /**
   * 1. Register: Returns props for the input element.
   * Uses the "Callback Ref" pattern to store the actual DOM node.
   * @param k The key/name of the input field.
   */
  const register = (k: keyof T) => {
    return {
      name: k,
      ref: (el: HTMLInputElement | HTMLSelectElement | null) => {
        if (el) {
          inputRefs.current[k] = el;
        } else {
          delete inputRefs.current[k];
        }
      },
    };
  };

  /**
   * 2. Get Values: The "stillUnnamedFunction" you requested.
   * Iterates over the stored refs and collects their current values.
   * @param callback A function that receives the collected form data object.
   */
  const getValues = () => {
    const formData = {} as Partial<T>;
    for (const key in inputRefs.current) {
      const element = inputRefs.current[key];
      if (element && "value" in element) {
        if (element.type === "checkbox") (formData as any)[key] = element.checked;
        else (formData as any)[key] = element.value
      }
    }
    return formData;
  };

  return { register, getValues, setValue };
}
