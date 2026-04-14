import { Button } from "../../button/Button";
import { PopoverButton, type PopoverButtonProps } from "@headlessui/react";

export function DropdownToggle<TTag extends React.ElementType = typeof Button>(p: PopoverButtonProps<TTag>) {
  /* @ts-ignore typescript complains about TTag != typeof p  */
  return <PopoverButton {...p} as={p.as || Button} />
}