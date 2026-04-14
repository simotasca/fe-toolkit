import css from "./sidebarItem.module.css";

export function SidebarItem(p: React.ComponentProps<"span">) {
  return <span {...p} className={[css.item, p.className].join(" ")} />;
}
