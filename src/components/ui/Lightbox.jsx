import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useRef } from 'react'
import { srcSet, url } from '../../data/images'
import { useDialog } from '../../hooks/useDialog'
import { useLang } from '../../i18n'

const control =
  'inline-flex size-11 items-center justify-center text-alabaster/80 transition-colors duration-300 hover:text-champagne'

/** Full-screen image viewer: native <dialog> (Esc, focus), ← → keys, swipe, counter. */
export function Lightbox({ items, index, onIndex, onClose }) {
  const { t, rtl } = useLang()
  const open = index !== null
  const ref = useDialog(open)
  const swipe = useRef(null)
  const go = (dir) => onIndex((index + dir + items.length) % items.length)
  const flip = rtl ? -1 : 1 // keys and swipes follow the visual direction
  const img = open ? items[index] : null

  return (
    <dialog
      ref={ref}
      aria-label={t('gallery.dialog')}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(flip)
        if (e.key === 'ArrowLeft') go(-flip)
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-charcoal/95 p-0 text-alabaster backdrop:bg-charcoal/80"
    >
      {img && (
        <div className="flex h-full flex-col">
          <div className="container-site flex h-20 items-center justify-between">
            <p className="text-meta text-alabaster/70" aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <button type="button" onClick={onClose} aria-label={t('gallery.close')} className={`-me-3 ${control}`}>
              <X size={22} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 touch-pan-y items-center justify-center px-6 select-none"
            onPointerDown={(e) => (swipe.current = e.clientX)}
            onPointerUp={(e) => {
              const dx = e.clientX - (swipe.current ?? e.clientX)
              if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * flip)
              swipe.current = null
            }}
          >
            <img
              key={index}
              src={url(img, 1600, img.ratio)}
              srcSet={srcSet(img, img.ratio)}
              sizes="90vw"
              alt={img.alt}
              draggable={false}
              className="max-h-full max-w-full object-contain transition-opacity duration-500 ease-lux starting:opacity-0"
            />
          </div>

          <div className="container-site flex h-24 items-center justify-between gap-6">
            <button type="button" onClick={() => go(-1)} aria-label={t('gallery.prev')} className={`-ms-3 ${control}`}>
              <ChevronLeft size={24} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
            </button>
            <p className="line-clamp-2 text-center text-meta text-alabaster/70">{img.alt}</p>
            <button type="button" onClick={() => go(1)} aria-label={t('gallery.next')} className={`-me-3 ${control}`}>
              <ChevronRight size={24} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
