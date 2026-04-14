import { SidebarTooltip } from "./SidebarTooltip";

export function SidebarTooltipIcon({
  tooltip,
  ...p
}: React.ComponentProps<"img"> & { tooltip: string }) {
  return (
    <SidebarTooltip text={tooltip}>
      <img data-slot="icon" {...p} />
    </SidebarTooltip>
  );
}
