import {
  Field as HField,
  type FieldProps as HFieldProps,
} from "@headlessui/react";
import css from "./switchField.module.css";

export function SwitchField({
  ...p
}: Omit<HFieldProps, "className"> & { className?: string }) {
  return (
    <HField
      data-slot="field"
      {...p}
      className={[css.switchField, p.className].join(" ")}
    />
  );
}
