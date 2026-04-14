import css from "./sidebarBody.module.css";

export function SidebarBody(p: React.ComponentProps<"section">) {
  return <section {...p} className={[css.body, p.className].join(" ")} />;
}
