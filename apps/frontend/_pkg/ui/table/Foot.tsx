import css from "./foot.module.css";

export function Foot({ className, ...p }: React.ComponentProps<"tfoot">) {
  return <tfoot {...p} className={[css.foot, className].join(" ")} />;
}
