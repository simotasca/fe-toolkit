import css from "./text.module.css";

export const styles = {
  colors: {
    dark: css.colorDark,
    light: css.colorLight,
    error: css.colorError,
  },
  sizes: {
    sm: css.sizeSm,
    base: css.sizeBase,
  },
};

type ColorVariants = 
  | { light?: false; error: true; }
  | { light?: true; error?: false;  }
  | { light?: false; error?: false;  }

type Variants = {
  size?: keyof typeof styles.sizes;
} & ColorVariants;

export type TextProps = Variants & React.ComponentProps<"span">;

export function Text({ light, error, size, className, ...p }: TextProps) {
  const classes = [
    css.text,
    styles.colors[error ? "error" : light ? "light" : "dark"],
    size && styles.sizes[size ?? "base"],
    className
  ].join(" ");

  return <span {...p} className={classes} />;
}
