import { Checkbox as HCheckbox, type CheckboxProps as HCheckboxProps } from '@headlessui/react'
import css from "./checkbox.module.css";

const colors = {
  light: [
    '[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:theme(colors.white)] [--checkbox-checked-border:theme(colors.zinc.950/15%)]',
    'dark:[--checkbox-check:theme(colors.white)] dark:[--checkbox-checked-bg:theme(colors.zinc.800)] dark:[--checkbox-checked-border:theme(colors.zinc.950/90%)]',
  ],
  'dark/zinc': [
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]',
    'dark:[--checkbox-checked-bg:theme(colors.zinc.600)]',
  ],
  'dark/white': [
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]',
    'dark:[--checkbox-check:theme(colors.zinc.900)] dark:[--checkbox-checked-bg:theme(colors.white)] dark:[--checkbox-checked-border:theme(colors.zinc.950/15%)]',
  ],
  white:
    '[--checkbox-check:theme(colors.zinc.900)] [--checkbox-checked-bg:theme(colors.white)] [--checkbox-checked-border:theme(colors.zinc.950/15%)]',
  dark: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.900)] [--checkbox-checked-border:theme(colors.zinc.950/90%)]',
  zinc: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.zinc.600)] [--checkbox-checked-border:theme(colors.zinc.700/90%)]',
  red: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.red.600)] [--checkbox-checked-border:theme(colors.red.700/90%)]',
  orange:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.orange.500)] [--checkbox-checked-border:theme(colors.orange.600/90%)]',
  amber:
    '[--checkbox-check:theme(colors.amber.950)] [--checkbox-checked-bg:theme(colors.amber.400)] [--checkbox-checked-border:theme(colors.amber.500/80%)]',
  yellow:
    '[--checkbox-check:theme(colors.yellow.950)] [--checkbox-checked-bg:theme(colors.yellow.300)] [--checkbox-checked-border:theme(colors.yellow.400/80%)]',
  lime: '[--checkbox-check:theme(colors.lime.950)] [--checkbox-checked-bg:theme(colors.lime.300)] [--checkbox-checked-border:theme(colors.lime.400/80%)]',
  green:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.green.600)] [--checkbox-checked-border:theme(colors.green.700/90%)]',
  emerald:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.emerald.600)] [--checkbox-checked-border:theme(colors.emerald.700/90%)]',
  teal: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.teal.600)] [--checkbox-checked-border:theme(colors.teal.700/90%)]',
  cyan: '[--checkbox-check:theme(colors.cyan.950)] [--checkbox-checked-bg:theme(colors.cyan.300)] [--checkbox-checked-border:theme(colors.cyan.400/80%)]',
  sky: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.sky.500)] [--checkbox-checked-border:theme(colors.sky.600/80%)]',
  blue: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.blue.600)] [--checkbox-checked-border:theme(colors.blue.700/90%)]',
  indigo:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.indigo.500)] [--checkbox-checked-border:theme(colors.indigo.600/90%)]',
  violet:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.violet.500)] [--checkbox-checked-border:theme(colors.violet.600/90%)]',
  purple:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.purple.500)] [--checkbox-checked-border:theme(colors.purple.600/90%)]',
  fuchsia:
    '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.fuchsia.500)] [--checkbox-checked-border:theme(colors.fuchsia.600/90%)]',
  pink: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.pink.500)] [--checkbox-checked-border:theme(colors.pink.600/90%)]',
  rose: '[--checkbox-check:theme(colors.white)] [--checkbox-checked-bg:theme(colors.rose.500)] [--checkbox-checked-border:theme(colors.rose.600/90%)]',
}

type Color = keyof typeof colors

export function Checkbox({
  color = 'light',
  className,
  ...props
}: {
  color?: Color
  className?: string
} & Omit<HCheckboxProps, 'className'>) {
  return (
    <HCheckbox
      data-slot="control"
      {...props}
      className={['group inline-flex focus:outline-none', className].join(" ")}
    >
      <span className={[css.checkbox, colors[color]].join(" ")}>
        <svg className="size-4 stroke-(--checkbox-check) opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5" viewBox="0 0 14 14" fill="none">
          {/* Checkmark icon */}
          <path className="opacity-100 group-data-indeterminate:opacity-0" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {/* Indeterminate icon */}
          <path className="opacity-0 group-data-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </HCheckbox>
  )
}
