import { useSidebar } from "../sidebar-context";
// import { cnJoin } from "@/shared/utils/class-name";
import css from "./sidebarHeading.module.css";

export function SidebarHeading(p: React.ComponentProps<"h3">) {
  const [open] = useSidebar();
  return (
    <h3 {...p} className={[p.className, css.heading, open && css.open].join(" ")} />
  );
}
