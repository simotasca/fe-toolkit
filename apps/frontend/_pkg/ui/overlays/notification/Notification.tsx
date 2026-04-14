import { Button } from "../../button/Button";
import { Text } from "../../typography/Text";
import IconX from "~icons/heroicons/x-mark-20-solid";
import IconXCircle from "~icons/heroicons/x-circle";
import IconExclamation from "~icons/heroicons/exclamation-triangle";
import IconCheck from "~icons/heroicons/check-circle";

export type NotificationType = "error" | "warn" | "info" | "success";

type NotificationProps = { remove(): void; title: string; description?: string; type?: NotificationType };

export function Notification(p: NotificationProps) {
  return (
    <div className="flex flex-col items-center space-y-4 sm:items-end">
      <div
        className={[
          "w-full",
          "shadow-lg dark:shadow-none ring-1",
          "rounded-lg bg-white ring-black/5",
          "dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline",
        ].join(" ")}
      >
        <div className="p-4">
          <div className="flex items-start">
            {p.type && p.type != "info" && (
              <div className="shrink-0">
                {p.type === "error" && <IconXCircle className="size-6 text-red-400" />}
                {p.type === "success" && <IconCheck className="size-6 text-green-400" />}
                {p.type === "warn" && <IconExclamation className="mt-0.5 size-6 text-amber-400" />}
              </div>
            )}
            <div className="ml-3 w-0 flex-1">
              <Text className="block font-medium leading-normal sm:leading-normal">{p.title}</Text>
              {p.description && (
                <Text size="sm" light className="mt-1">
                  {p.description}
                </Text>
              )}
            </div>
            <div className="ml-4 shrink-0">
              <Button outline onClick={p.remove} className="-m-2" size="sm">
                <span className="sr-only">Close</span>
                <IconX aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}