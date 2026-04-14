import { SidebarItem } from "./SidebarItem";
// import { TouchTarget } from "@/shared/ui/TouchTarget";
import css from "./sidebarButton.module.css";

export function SidebarButton({
  className,
  children,
  ...p
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button {...p} className={[css.button, className].join(" ")}>
      {/* <TouchTarget /> */}
      <SidebarItem>{children}</SidebarItem>
    </button>
  );
}
