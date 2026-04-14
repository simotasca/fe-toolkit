import { useSidebar } from "./sidebar-context";
import css from "./sidebarToggle.module.css";

export function SidebarToggle(
  p: React.ComponentProps<"span"> & { disabled?: boolean }
) {
  const [, setOpen] = useSidebar();
  return (
    <span
      {...p}
      className={[css.toggle, p.className].join(" ")}
      onClick={(e) => {
        if (p.disabled) return;
        setOpen((p) => !p);
        p.onClick?.(e);
      }}
    />
  );
}
