import { useAutoFetch } from "@pkg/hooks";
import { createContext } from "@pkg/react-create-context";
import { useState } from "react";
import { useParams } from "react-router";

export type ReloadEntity = () => Promise<void>;

export function createEntityContext<T>(
  routeParam: string,
  fetchEntity: (id: string) => Promise<T | null>
) {
  const [, useEntity, EntityProvider] = createContext<[T, ReloadEntity]>({
    errorMsg: `cannot use entity context for route param "${routeParam}" outside its entity provider`,
  });

  const useInitEntity = () => {
    const param = useParams()[routeParam];
    const [entity, setEntity] = useState<T | null>(null);
    
    const { loading: pending, error, refetch } = useAutoFetch(async () => {
      if (!param) throw new Error("Invalid route param " + routeParam);
      await fetchEntity(param).then(setEntity);
    }, [param]);

    return { param, entity, pending, error, reload: refetch };
  };

  return { EntityProvider, useInitEntity, useEntity };
}