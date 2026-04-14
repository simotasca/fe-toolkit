import {
  Label as HLabel,
  type LabelProps as HLabelProps,
} from "@headlessui/react";
import css from "./label.module.css";

export function Label(
  p: Omit<HLabelProps, "className"> & { className?: string }
) {
  return (
    <HLabel
      data-slot="label"
      {...p}
      className={[css.label, p.className].join(" ")}
    />
  );
}
