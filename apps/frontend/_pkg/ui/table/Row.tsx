import css from "./row.module.css";

type RowProps = React.ComponentProps<"tr">;

export function Row({ className, ...p }: RowProps) {
  return <tr {...p} className={[css.row, className].join(" ")} />;
}
