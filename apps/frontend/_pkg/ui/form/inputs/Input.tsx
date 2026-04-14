import {
  Input as HInput,
  type InputProps as HInputProps,
} from "@headlessui/react";
import css from "./input.module.css";
import { DEFAULT_PLACEHOLDER } from ".";
import sharedInputCss from "./shared.module.css";

const dateTypes = ["date", "datetime-local", "month", "time", "week"] as const;
const sizes = ["base", "sm"] as const;

type DateType = (typeof dateTypes)[number];
type AllowedTypes = "email" | "number" | "password" | "search" | "tel" | "text" | "url" | DateType;
type Size = (typeof sizes)[number];

type InputProps = Omit<HInputProps, "className" | "size"> & {
  className?: string;
  type?: AllowedTypes;
  size?: Size;
} & // che trash
  Pick<React.ComponentProps<typeof HInput>, "ref">;

export function Input({ className, size = "base", placeholder = DEFAULT_PLACEHOLDER, ...props }: InputProps) {
  return (
    <HInput
      data-slot="control"
      placeholder={placeholder}
      {...props}
      className={[
        sharedInputCss.input,
        size == "sm" ? sharedInputCss.sizeSm : sharedInputCss.sizeBase,
        props.type && dateTypes.includes(props.type as any) && css.dateInput,
        className,
      ].join(" ")}
    />
  );
};
