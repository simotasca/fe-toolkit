import { SidebarButton } from "./SidebarButton";
import css from "./sidebarLink.module.css";

export function SidebarLink({
  className,
  isActive,
  children,
  ...p
}: React.ComponentProps<typeof SidebarButton> & { isActive?: boolean }) {
  return (
    <SidebarButton
      {...p}
      className={[
        css.link,
        isActive ? css.active : css.inactive,
        className,
      ].join(" ")}
    >
      {isActive && (
        <span className="absolute left-0 top-0 z-20 h-full border-l-4 border-l-indigo-500" />
      )}
      {children}
    </SidebarButton>
  );
}
