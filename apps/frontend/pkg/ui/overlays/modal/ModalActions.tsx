import type React from "react";
import css from "./modalActions.module.css";

export function ModalActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={[css.actions, className].join(" ")} />;
}
