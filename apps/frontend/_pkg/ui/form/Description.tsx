import {
  Description as HDescription,
  type DescriptionProps as HDescriptionProps,
} from "@headlessui/react";
import { styles as textStyles } from "../typography/Text";

export function Description(
  p: Omit<HDescriptionProps, "className"> & { className?: string }
) {
  return (
    <HDescription
      data-slot="description"
      {...p}
      className={[
        textStyles.sizes.sm,
        textStyles.colors.light,
        p.className,
      ].join(" ")}
    >
      {p.children}
    </HDescription>
  );
}
