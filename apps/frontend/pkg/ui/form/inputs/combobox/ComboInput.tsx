import { ComboboxInput, type ComboboxInputProps } from "@headlessui/react";
import { Input } from "../Input";

type ComboInputProps = Omit<
  ComboboxInputProps<typeof Input>,
  "as" | "className"
> & { className?: string };

export function ComboInput(p: ComboInputProps) {
  return <ComboboxInput {...p} as={Input} />;
}
