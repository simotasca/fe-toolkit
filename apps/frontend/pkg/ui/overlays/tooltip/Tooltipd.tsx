import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  useFloating,
  useHover,
  useInteractions,
  type Placement,
  type UseFloatingOptions,
} from "@floating-ui/react";

import { useState } from "react";

type TooltippedProps = React.PropsWithChildren<{
  place?: Placement;
  middleware?: UseFloatingOptions["middleware"];
  tooltip: React.ReactNode;
  disabled?: boolean;
  appearDurationMs?: number;
  appearDelayMs?: number;
}>;

export function Tooltipd(p: TooltippedProps) {
  const [open, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: open,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: p.place || "bottom",
    middleware: p.middleware || [offset(6), flip()],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <span
      className="group relative border-0"
      ref={refs.setReference}
      data-slot="control"
      {...getReferenceProps()}
    >
      {p.children}
      {open && (
        <FloatingPortal>
          <div
            className={["z-100", p.disabled ? "hidden" : ""].join(" ")}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div
              className={[
                "text-sm/4 py-1 px-2 whitespace-nowrap rounded-md",
                "bg-white dark:bg-zinc-900 border dark:border-zinc-700",
                "opacity-0 animate-[appear_100ms_ease-in-out_100ms_forwards]",
              ].join(" ")}
              style={{
                animationDuration: p.appearDurationMs !== undefined ? `${p.appearDurationMs}ms` : "",
                animationDelay: p.appearDelayMs !== undefined ? `${p.appearDelayMs}ms` : "",
              }}
            >
              {p.tooltip}
            </div>
          </div>
        </FloatingPortal>
      )}
    </span>
  );
}
