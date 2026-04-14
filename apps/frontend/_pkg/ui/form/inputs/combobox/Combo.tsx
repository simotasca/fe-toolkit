import { Combobox, type ComboboxProps } from "@headlessui/react";

type ComboProps = Omit<
  ComboboxProps<any, boolean, "div">,
  "as" | "className"
> & { className?: string };

export function Combo({ className, ...p }: ComboProps) {
  return (
    <Combobox
      {...p}
      as="div"
      data-slot="control"
      className={"relative " + className}
    />
  );
}
