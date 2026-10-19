import { ArrowUpRight } from 'lucide-react'

// The recurring ↗ — nudges 2px up-right when an ancestor `.group` is hovered.
export function Arrow({ className = '' }) {
  return (
    <ArrowUpRight
      size={18}
      strokeWidth={1.25}
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
    />
  )
}
