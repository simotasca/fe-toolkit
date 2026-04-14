import { useCache } from "./useCache";
import { createContext } from "@pkg/react-create-context";

export function createCacheContext<Fn extends (...p: any) => Promise<any>>(
  ...useCacheArgs: Parameters<typeof useCache> // should stay stable? can become <Provider> props
) {
  const [ctx, use, BaseProvider] =
    createContext<ReturnType<typeof useCache<Fn>>>();

  const Provider: React.FC<React.PropsWithChildren> = (p) => {
    const cache = useCache(...useCacheArgs);
    return <BaseProvider value={cache}>{p.children}</BaseProvider>;
  };

  return [ctx, use, Provider];
}
