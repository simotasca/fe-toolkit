import css from "./sidebarLabel.module.css";

export function SidebarLabel({
  className,
  ...p
}: React.ComponentProps<"span">) {
  return <span className={[css.label, className].join(" ")} {...p} />;
}
