import {
  Select as HSelect,
  type SelectProps as HSelectProps,
} from "@headlessui/react";
import sharedInputCss from "./shared.module.css";

type SelectProps = Omit<HSelectProps, "className" | "size" | "multiple"> & {
  className?: string;
  size?: "base" | "sm";
};

export function Select({ className, size = "base", ...props }: SelectProps) {
  return (
    <HSelect
      data-slot="control"
      {...props}
      className={[
        sharedInputCss.input,
        size == "sm" ? sharedInputCss.sizeSm : sharedInputCss.sizeBase,
        className,
      ].join(" ")}
    />
  );
}
