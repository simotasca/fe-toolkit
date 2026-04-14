import { useSidebar } from "./sidebar-context";

export function Sidebar({ children }: React.PropsWithChildren) {
  const [open] = useSidebar();

  return (
    <aside
      className={[
        "h-svh flex flex-col overflow-hidden sticky top-0",
        "bg-zinc-100 dark:bg-zinc-920 border-r border-zinc-300 dark:border-zinc-700",
        open ? "w-sidebar-open" : "w-sidebar-closed",
        "transition-[width]",
      ].join(" ")}
    >
      {children}
    </aside>
  );
}
