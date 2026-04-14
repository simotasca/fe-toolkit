import css from "./badge.module.css";

const styles = {
  base: css.badge,
  colors: {
    outline: css.colorOutline,
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
    zinc: css.colorZinc,
  },
};

export type BadgeVariants = { color?: keyof typeof styles.colors };

export type BadgeProps = BadgeVariants & React.ComponentProps<"span">;

export function Badge({ color = "zinc", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={[styles.base, styles.colors[color], className].join(" ")}
    />
  );
}
