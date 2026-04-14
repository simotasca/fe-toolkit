export function computeSetStateAction<T>(prev: T, action: React.SetStateAction<T>): T {
  return typeof action === "function" && action.length === 1
    ? (action as (prev: T) => T)(prev)
    : (action as T);
}