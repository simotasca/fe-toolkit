import type { DataFormat } from "./types";
import css from "./header.module.css";

export type HeaderProps = React.ComponentProps<"th"> & {
  format?: DataFormat;
  hidden?: boolean;
};

export function Header({
  className,
  format = "text",
  children,
  ...p
}: HeaderProps) {
  const formatStyle = format == "numeric" ? "text-right" : false;
  return (
    <th {...p} className={[css.header, formatStyle, className].join(" ")}>
      {children}
    </th>
  );
}
