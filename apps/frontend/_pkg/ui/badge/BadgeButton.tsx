import { Badge, type BadgeVariants } from "./Badge";
import css from "./badgeButton.module.css";

export type BadgeButtonProps = BadgeVariants & {
  badgeClassName?: string;
} & React.ComponentProps<"button">;

export function BadgeButton({
  color,
  className,
  badgeClassName,
  children,
  ...props
}: BadgeButtonProps) {
  return (
    <button {...props} className={[css.badgeButton, className].join(" ")}>
      <Badge color={color ?? "zinc"} className={badgeClassName}>
        {children}
      </Badge>
    </button>
  );
}
