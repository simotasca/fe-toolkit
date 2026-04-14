import { useSidebar } from "./sidebar-context";
import { Tooltipd } from "../overlays/tooltip/Tooltipd";

export function SidebarTooltip(p: React.PropsWithChildren<{ text: string, disabled?: boolean }>) {
  const [open] = useSidebar();
  return (
    <Tooltipd tooltip={p.text} place="right" disabled={p.disabled || open} appearDelayMs={0} appearDurationMs={0}>
      <div className="w-sidebar-closed overflow-visible">{p.children}</div>
    </Tooltipd>
  );
}
