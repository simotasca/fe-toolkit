import type React from "react";
import css from "./checkboxGroup.module.css";

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={[css.checkboxGroup, className].join(" ")}
    />
  );
}
