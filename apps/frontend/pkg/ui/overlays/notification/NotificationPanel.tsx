import { createPortal } from "react-dom";

export function NotificationPanel(p: React.PropsWithChildren) {
  return createPortal(
    <div aria-live="assertive" className="fixed top-0 right-0 z-300 pointer-events-none">
      <div className="h-svh w-[80vw] max-w-sm overflow-y-scroll scrollbar-hidden px-4 py-6 sm:px-6">
        <div className="flex flex-col-reverse justify-end gap-4 w-full pointer-events-auto">
          {p.children}
        </div>
      </div>
    </div>,
    document.body
  );
}
