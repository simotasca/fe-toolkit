import {
  Field as HField,
  type FieldProps as HFieldProps,
} from "@headlessui/react";
import css from "./field.module.css";

export function Field(
  p: Omit<HFieldProps, "className"> & { className?: string }
) {
  return <HField {...p} className={[css.field, p.className].join(" ")} />;
}
