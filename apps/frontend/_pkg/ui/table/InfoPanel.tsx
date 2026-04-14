import { useDelayFlag } from "@pkg/hooks";
import ArrowPathIcon from "~icons/heroicons/arrow-path";
import ProgressIcon from "~icons/material-symbols/progress-activity-sharp";
import { Badge } from "../badge/Badge";

const DEFAULT_EMPTY_MESSAGE = "Nessun risultato";

type InfoPanelProps = {
  items?: number;
  loading?: boolean;
  error?: string;
  refetch?: () => any;
  emptyDataMessage?: string;
  loadingDelay?: number
};

export function InfoPanel(props: InfoPanelProps) {
  const delayedLoading = useDelayFlag(props.loading || false, props.loadingDelay ?? 210);

  if (!delayedLoading && !props.error && props.items) return;

  return (
    <div className="size-full min-h-32 bg-zinc-200/50 dark:bg-zinc-950/80 grid place-content-center z-11 pt-11 pb-2 px-6">
      {delayedLoading ? (
        <span className="inline-flex items-center flex-nowrap gap-x-2">
          <ProgressIcon className="size-4 animate-spin" />
          <span>Loading...</span>
        </span>
      ) : props.error ? (
        <Badge
          color="red"
          className={[
            "max-w-lg text-center flex-col",
            props.refetch ? "px-3 py-1 cursor-pointer" : "",
          ].join(" ")}
          onClick={() => props.refetch?.()}
        >
          <span>{props.error}</span>

          {props.refetch && (
            <span className="inline-flex gap-1.5 -ml-3">
              <ArrowPathIcon className="size-4 translate-y-[3px]" />
              <span className="font-normal">riprova</span>
            </span>
          )}
        </Badge>
      ) : !props.items ? (
        <span className="text-zinc-400 dark:text-zinc-400">
          {props.emptyDataMessage || DEFAULT_EMPTY_MESSAGE}
        </span>
      ) : null}
    </div>
  );
}