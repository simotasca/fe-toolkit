import { useLocalStorage } from "@pkg/hooks";
import { createContext } from "@pkg/react-create-context";

export const [, useSidebar, SidebarProvider] = createContext({
  initializer: () => useLocalStorage("sidebar-state-open", true),
  errorMsg: "cannot use sidebar outside a <SidebarProvider>",
});
