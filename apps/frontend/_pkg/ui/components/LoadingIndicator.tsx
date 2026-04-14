import ProgressIcon from "~icons/material-symbols/progress-activity-sharp";

export function LoadingIndicator(p: { message?: string }) {
  return (
    <span className="inline-flex items-center flex-nowrap gap-x-2">
      <ProgressIcon className="size-4 animate-spin" />
      <span>{p.message ?? "Loading..."}</span>
    </span>
  );
}
