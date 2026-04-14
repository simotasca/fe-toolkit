import {
  Dialog as HDialog,
  DialogBackdrop as HDialogBackdrop,
  DialogPanel as HDialogPanel,
  type DialogProps as HDialogProps
} from "@headlessui/react";

import css from "./modal.module.css";

const styles = {
  sizes: {
    xs:    'max-w-xs',
    sm:    'max-w-sm',
    md:    'max-w-md',
    lg:    'max-w-lg',
    xl:    'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  }
}

export type Size = keyof typeof styles.sizes;
export const sizes = Object.keys(styles.sizes) as Size[];

type LockedOrClosable = ({ locked?: false, onClose: HDialogProps["onClose"] } | { locked: true, onClose?: HDialogProps["onClose"] } );

export type ModalProps = { size?: Size; className?: string; } & LockedOrClosable & Omit<HDialogProps, 'className' | 'onClose'>
export function Modal({
  size = 'lg',
  locked,
  onClose,
  className,
  children,
  ...props
}: ModalProps) {
  return (
    <HDialog onClose={(v) => !locked && onClose(v)} {...props}>
      <HDialogBackdrop
        transition
        onClick={() => !locked && onClose(true)}
        className={[
          "fixed inset-0 z-200",
          "transition-opacity duration-100 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in",
          "bg-zinc-950/25 dark:bg-zinc-950/50 pointer-events-auto"
        ].join(" ")}
      />

      <div className="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0 z-201 pointer-events-none">
        <div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <HDialogPanel
            transition
            className={[css.modalPanel, styles.sizes[size], className].join(" ")}
          >
            {children}
          </HDialogPanel>
        </div>
      </div>
    </HDialog>
  )
}