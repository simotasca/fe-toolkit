import { ComboboxOptions, type ComboboxOptionsProps } from "@headlessui/react";
import css from "./comboOptions.module.css";

type ComboOptionsProps = Omit<ComboboxOptionsProps, "as" | "className"> & {
  className?: string;
};
export function ComboOptions({ className, ...p }: ComboOptionsProps) {
  return (
    <ComboboxOptions
      {...p}
      as="div"
      anchor="bottom start"
      className={[css.options, className].join(" ")}
    ></ComboboxOptions>
  );
}
