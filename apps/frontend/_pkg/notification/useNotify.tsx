import { useNotification } from "./useNotification";

export function useNotify() {
  return useNotification().notify;
}
