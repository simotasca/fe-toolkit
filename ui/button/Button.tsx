import css from "./button.module.css";

const styles = {
  base: css.uiButton,
  sizes: { base: css.sizeBase, sm: css.sizeSm },
  colors: {
    light: { solid: css.colorLight_Solid, outline: css.colorLight_Outline },
    slate: { solid: css.colorSlate_Solid, outline: css.colorSlate_Outline },
    gray: { solid: css.colorGray_Solid, outline: css.colorGray_Outline },
    zinc: { solid: css.colorZinc_Solid, outline: css.colorZinc_Outline },
    neutral: { solid: css.colorNeutral_Solid, outline: css.colorNeutral_Outline },
    stone: { solid: css.colorStone_Solid, outline: css.colorStone_Outline },
    red: { solid: css.colorRed_Solid, outline: css.colorRed_Outline },
    orange: { solid: css.colorOrange_Solid, outline: css.colorOrange_Outline },
    amber: { solid: css.colorAmber_Solid, outline: css.colorAmber_Outline },
    yellow: { solid: css.colorYellow_Solid, outline: css.colorYellow_Outline },
    lime: { solid: css.colorLime_Solid, outline: css.colorLime_Outline },
    green: { solid: css.colorGreen_Solid, outline: css.colorGreen_Outline },
    emerald: { solid: css.colorEmerald_Solid, outline: css.colorEmerald_Outline },
    teal: { solid: css.colorTeal_Solid, outline: css.colorTeal_Outline },
    cyan: { solid: css.colorCyan_Solid, outline: css.colorCyan_Outline },
    sky: { solid: css.colorSky_Solid, outline: css.colorSky_Outline },
    blue: { solid: css.colorBlue_Solid, outline: css.colorBlue_Outline },
    indigo: { solid: css.colorIndigo_Solid, outline: css.colorIndigo_Outline },
    violet: { solid: css.colorViolet_Solid, outline: css.colorViolet_Outline },
    purple: { solid: css.colorPurple_Solid, outline: css.colorPurple_Outline },
    fuchsia: { solid: css.colorFuchsia_Solid, outline: css.colorFuchsia_Outline },
    pink: { solid: css.colorPink_Solid, outline: css.colorPink_Outline },
    rose: { solid: css.colorRose_Solid, outline: css.colorRose_Outline },
  },
};

type Color = keyof typeof styles.colors;
type Size = keyof typeof styles.sizes;

// const colors = Object.keys(styles.colors) as Color[];
// const sizes = Object.keys(styles.sizes) as Size[];

type Variants = { color?: Color; size?: Size; outline?: boolean; }

type ButtonProps = React.PropsWithChildren<
  & Variants 
  & React.ComponentProps<"button">
>;

export function Button({ color = "light", size = "base", type="button", outline, className, children, ...props }: ButtonProps) {
  const classes = [
    styles.base,
    styles.sizes[size],
    styles.colors[color][outline ? "outline" : "solid"],
    className,
  ].join(" ");
  return (
    <button {...props} className={classes} type={type}>
      {children}
    </button>
  );
}
