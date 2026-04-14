import { Button } from "./Button";
import ProgressIcon from "~icons/material-symbols/progress-activity-sharp";
import type { ComponentProps, ReactNode } from "react";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "children"> & { loading?: boolean, text: string, icon?: ReactNode };
export function SubmitButton({ disabled, loading, text, icon, ...p }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={loading || disabled} {...p}>
      {!loading && icon}
      {loading && (
        <ProgressIcon className={["animate-spin size-4", !icon ? "order-2" : "order-0"].join(" ")} />
      )}
      <span>{text}</span>
    </Button>
  );
}
