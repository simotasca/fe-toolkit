import css from "./table.module.css";

type TableProps = React.ComponentProps<"table">;
export function Table({ className, ...p }: TableProps) {
  return <table {...p} className={[css.table, className].join(" ")} />;
}
