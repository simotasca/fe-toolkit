import css from "./head.module.css";

export function Head({ className, ...p }: React.ComponentProps<"thead">) {
  return <thead {...p} className={[css.head, className].join(" ")} />;
}
