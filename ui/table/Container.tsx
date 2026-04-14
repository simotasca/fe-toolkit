import css from "./container.module.css";

type ContainerProps = React.ComponentProps<"div">;
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={[css.container, className].join(" ")}>
      <div className={css.inner} {...props}>
        {children}
      </div>
      <span className={css.outline} />
    </div>
  );
}
