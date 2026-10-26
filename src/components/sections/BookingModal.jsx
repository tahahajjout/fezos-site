import { useId, useRef } from 'react'
import { onNativeClose, useDialog } from '../../hooks/useDialog'
import { BookingFlow } from './booking/BookingFlow'

// Booking dialog (CLAUDE.md §6.16) → prefilled WhatsApp message, no backend.
// Phones: a sheet that slides up from the bottom. Desktop: a wide panel that rises into place.
// Both animate out too: CSS transitions on `display`/`overlay` (transition-discrete) keep the
// closing dialog painted, and the last booking stays rendered inside it until it is gone.
const shell = [
  'fixed inset-x-0 top-auto bottom-0 m-0 h-[94svh] max-h-none w-full max-w-none overflow-hidden bg-alabaster p-0 text-charcoal shadow-modal',
  'lg:inset-0 lg:m-auto lg:h-[min(48rem,calc(100svh-4rem))] lg:w-[min(76rem,calc(100%-4rem))]',
  'transition-[translate,opacity,display,overlay] transition-discrete duration-700 ease-lux',
  'translate-y-full open:translate-y-0 starting:open:translate-y-full',
  'lg:translate-y-10 lg:opacity-0 lg:open:translate-y-0 lg:open:opacity-100 lg:starting:open:translate-y-10 lg:starting:open:opacity-0',
  'backdrop:bg-charcoal/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-700',
  'open:backdrop:bg-charcoal/70 starting:open:backdrop:bg-charcoal/0',
].join(' ')

export function BookingModal({ booking, onClose }) {
  const ref = useDialog(booking !== null)
  const titleId = useId()
  // A fresh form for every opening; the previous one stays mounted while the dialog animates out.
  const last = useRef({ booking: null, count: 0 })
  if (booking && booking !== last.current.booking) last.current = { booking, count: last.current.count + 1 }
  const shown = last.current.booking

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onNativeClose(onClose)}
      onClick={(e) => e.target === ref.current && onClose()}
      className={shell}
    >
      {shown && (
        <BookingFlow key={last.current.count} titleId={titleId} initialService={shown.serviceId ?? ''} onClose={onClose} />
      )}
    </dialog>
  )
}
