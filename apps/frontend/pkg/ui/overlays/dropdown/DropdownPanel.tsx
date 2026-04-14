import { MenuItems, PopoverPanel } from "@headlessui/react";
import css from "./dropdownPanel.module.css";

export function DropdownPanel(
  p: Omit<React.ComponentProps<typeof MenuItems>, "className"> & {
    className?: string;
  }
) {
  return <PopoverPanel {...p} className={[css.panel, p.className].join(" ")} />;
}
