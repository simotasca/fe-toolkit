import css from "./inputGroup.module.css";

type InputGroupProps = React.ComponentProps<"span">;

export function InputGroup(p: InputGroupProps) {
  return (
    <span
      data-slot="control"
      {...p}
      className={[css.inputGroup, p.className].join(" ")}
    />
  );
}
