import type { DataFormat } from "./types";
import css from "./cell.module.css";

export type CellProps = React.ComponentProps<"td"> & {
  label?: string;
  format?: DataFormat;
};

export function Cell({ className, format, label, ...p }: CellProps) {
  const formatStyle = format == "numeric" ? "text-right font-mono" : false;
  return (
    <td
      {...(label && { "data-label": label })}
      {...p}
      className={[css.cell, formatStyle, className].join(" ")}
    />
  );
}
