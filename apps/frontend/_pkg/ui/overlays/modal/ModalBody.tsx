import css from "./modalBody.module.css";

export function ModalBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div {...props} className={[className, css.body].join(" ")} />
}