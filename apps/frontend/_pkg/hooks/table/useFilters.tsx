import { useObjectActions, type ObjectActions } from "../state/object/useObject";
import { useMemo, useState } from "react";

export type Filters = Record<string, any>;

export type FiltersActions<T extends Filters> = ObjectActions<Partial<T>> & {
  clear: () => void;
}

export function useFiltersState<T extends Filters = Filters>(
  initial: Partial<T> = {} as Partial<T>
) {
  const [value, setValue] = useState<Partial<T>>(initial);
  return useFilters(value, setValue);
}

export function useFilters<T extends Filters = Filters>(
  value: Partial<T>,
  setValue: React.Dispatch<React.SetStateAction<Partial<T>>>
) {
  const count = useMemo(
    () => (Object.keys(value).filter((key) => !!value[key]).length),
    [value]
  );
  const actions = useObjectActions(setValue);
  const actionsExt: FiltersActions<T> = useMemo(() => ({
    ...actions,
    clear: () => actions.setObject({})
  }), [actions, setValue]);

  return [value, actionsExt, count] as const;
}
