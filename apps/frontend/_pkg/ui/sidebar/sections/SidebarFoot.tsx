import css from "./sidebarFoot.module.css";

export function SidebarFoot(p: React.ComponentProps<"section">) {
  return <section {...p} className={[css.foot, p.className].join(" ")} />;
}
