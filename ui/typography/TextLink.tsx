import { Link } from "react-router";
import { styles as textStyles } from "./Text";
import css from "./textLink.module.css";

type Variants = {
  size?: keyof typeof textStyles.sizes;
};

export type TextLinkProps = Variants & React.ComponentProps<typeof Link>;

export function TextLink({ size, className, ...p }: TextLinkProps) {
  return (
    <Link
      {...p}
      className={[
        size && textStyles.sizes[size ?? "base"],
        css.link,
        className,
      ].join(" ")}
    />
  );
}
