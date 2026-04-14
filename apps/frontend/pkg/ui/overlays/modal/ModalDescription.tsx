import {
  Description as HDescription,
  type DescriptionProps as HDescriptionProps,
} from "@headlessui/react";
import { Text } from "../../typography/Text";
import css from "./modalDescription.module.css";

export function ModalDescription({
  className,
  ...props
}: Omit<HDescriptionProps<typeof Text>, "className"> & { className?: string }) {
  return (
    <HDescription
      as={Text}
      {...props}
      className={[css.description, className].join(" ")}
    />
  );
}
