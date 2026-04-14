import css from "./sidebarHead.module.css";

export function SidebarHead(p: React.ComponentProps<"section">) {
  return <section {...p} className={[css.head, p.className].join(" ")} />;
}
