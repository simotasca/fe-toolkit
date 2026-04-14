import {
  Textarea as HTextarea,
  type TextareaProps as HTextareaProps,
} from "@headlessui/react";
import { DEFAULT_PLACEHOLDER } from ".";
import sharedInputCss from "./shared.module.css";

type TextAreaProps = Omit<HTextareaProps, "className"> & {
  className?: string;
  size?: "base" | "sm";
};

export function TextArea({
  className,
  size = "base",
  rows = 3,
  placeholder = DEFAULT_PLACEHOLDER,
  ...props
}: TextAreaProps) {
  return (
    <HTextarea
      data-slot="control"
      {...props}
      rows={rows}
      placeholder={placeholder}
      className={[
        sharedInputCss.input,
        size == "sm" ? sharedInputCss.sizeSm : sharedInputCss.sizeBase,
        className,
      ].join(" ")}
    />
  );
}
