import css from "./titles.module.css";

type TitleProps = {
  h?: 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | "6";
} & React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Title({ className, h = "1", ...props }: TitleProps) {
  let Element: `h${typeof h}` = `h${h}`;
  return <Element {...props} className={[css.title, className].join(" ")} />;
}

export function Subtitle({ className, h = "2", ...props }: TitleProps) {
  let Element: `h${typeof h}` = `h${h}`;
  return <Element {...props} className={[css.subtitle, className].join(" ")} />;
}
