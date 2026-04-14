import {
  Field as HField,
  type FieldProps as HFieldProps,
} from "@headlessui/react";
import css from "./checkboxField.module.css";

export function CheckboxField({
  className,
  ...props
}: { className?: string } & Omit<HFieldProps, "className">) {
  return (
    <HField
      data-slot="field"
      {...props}
      className={[css.checkField, className].join(" ")}
    />
  );
}
