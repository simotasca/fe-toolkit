import {
  DialogTitle as HDialogTitle,
  type DialogTitleProps as HDialogTitleProps
} from "@headlessui/react";
import CheckCircleIcon from "~icons/heroicons/check-circle";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle";
import XCircleIcon from "~icons/heroicons/x-circle";

import css from "./modalTitle.module.css";

type ModalTitleProps = 
  Omit<HDialogTitleProps, "className" | "children"> & 
  React.PropsWithChildren<{ 
    className?: string,
    type?: "error" | "warn" | "info" | "success"
  }>;

export function ModalTitle({ type, className, children, ...props }: ModalTitleProps) {
  const icon = 
    type === "success" 
      ? <CheckCircleIcon className="text-green-400" /> 
      : type === "warn" 
      ? <ExclamationTriangleIcon className="text-amber-400" />
      : type === "error" 
      ? <XCircleIcon className="-translate-y-0.5 text-red-400" />
      : null;

  return (
    <HDialogTitle
      {...props}
      className={[css.title, className].join(" ")}
    >
      {icon}
      {children}
    </HDialogTitle>
  )
}