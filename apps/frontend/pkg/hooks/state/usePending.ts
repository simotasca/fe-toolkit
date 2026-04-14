import { useState } from "react";

export function usePending(initialPending: boolean = false) {
  const [initial, setInitial] = useState(initialPending);
  const markInitialAsDone = () => setInitial(false);

  const [pending, setPending] = useState(0);
  const add = () => {
    setPending((p) => p + 1);
  };
  const remove = () => {
    markInitialAsDone();
    setPending((p) => p - 1);
  };

  return [pending > 0 || initial, add, remove] as const;
}
