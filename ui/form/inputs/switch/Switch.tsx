import { Switch as HSwitch } from "@headlessui/react";
import css from "./switch.module.css";

const colors = {
  "dark/zinc": css.colorDarkZinc,
  "dark/white": css.colorDarkWhite,
  dark: css.colorDark,
  zinc: css.colorZinc,
  white: css.colorWhite,
  red: css.colorRed,
  orange: css.colorOrange,
  amber: css.colorAmber,
  yellow: css.colorYellow,
  lime: css.colorLime,
  green: css.colorGreen,
  emerald: css.colorEmerald,
  teal: css.colorTeal,
  cyan: css.colorCyan,
  sky: css.colorSky,
  blue: css.colorBlue,
  indigo: css.colorIndigo,
  violet: css.colorViolet,
  purple: css.colorPurple,
  fuchsia: css.colorFuchsia,
  pink: css.colorPink,
  rose: css.colorRose,
};

type Color = keyof typeof colors;

export function Switch({
  color = "indigo",
  className,
  ...props
}: {
  color?: Color;
  className?: string;
} & Omit<React.ComponentProps<typeof HSwitch>, "className" | "children">) {
  return (
    <HSwitch
      data-slot="control"
      {...props}
      className={["group", className, css.switch, colors[color]].join(" ")}
    >
      <span aria-hidden="true" className={[css.switchInner].join(" ")} />
    </HSwitch>
  );
}
