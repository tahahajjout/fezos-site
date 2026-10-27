import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { onNativeClose, useDialog } from '../../../hooks/useDialog'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useLang } from '../../../i18n'
import { EASE } from '../../../lib/motion'
import { Counter, Photo, preload } from './LightboxParts'
import { contain, useLightboxMotion } from './useLightboxMotion'

const control =
  'group inline-flex size-11 items-center justify-center text-alabaster/80 transition-colors duration-300 hover:text-champagne'

// A turn: the new photo is unveiled by a curtain wiping in from the side it comes from and settles from
// a slight zoom, while the old one drifts the other way beneath it and sinks into the dark.
// `v` is the visual direction: +1 = arrives from the right.
const slide = {
  enter: (v) => ({ clipPath: v > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', zIndex: 2 }),
  center: { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2, transition: { duration: 1.1, ease: EASE } },
  exit: (v) => ({ x: `${-14 * v}%`, opacity: 0, zIndex: 1, transition: { duration: 1.1, ease: EASE } }),
}
const settle = {
  enter: (v) => ({ scale: 1.18, x: `${6 * v}%` }),
  center: { scale: 1, x: 0, transition: { duration: 1.5, ease: EASE } },
  exit: {},
}
const plain = { enter: {}, center: {}, exit: {} }

/**
 * Full-screen photo viewer (native <dialog>: Esc, focus trap). Opens out of the clicked thumbnail
 * and closes back into it; ← → keys, swipe, wheel/trackpad and the arrows turn the photos.
 * `thumbOf(i)` returns the gallery's <img> for photo i (for its loaded file and its position).
 */
export function Lightbox({ items, index, onIndex, onClose, thumbOf }) {
  const { t, rtl } = useLang()
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px)')
  const ratioOf = (img) => (wide ? img.ratio : [4, 5]) // the thumbnail's crop, so its cached file matches
  const open = index !== null
  const ref = useDialog(open)
  const frame = useRef(null)
  const [dir, setDir] = useState(1)
  const flipDir = rtl ? -1 : 1 // keys and swipes follow the visual direction

  const go = (step) => {
    setDir(step)
    onIndex((index + step + items.length) % items.length)
  }
  const fromThumb = () => {
    const a = thumbOf(index)?.getBoundingClientRect()
    if (!a || !a.width || a.bottom < 0 || a.top > innerHeight || a.right < 0 || a.left > innerWidth) return null
    const b = contain(frame.current.getBoundingClientRect(), ratioOf(items[index]))
    return { x: a.left + a.width / 2 - (b.left + b.width / 2), y: a.top + a.height / 2 - (b.top + b.height / 2), scale: a.width / b.width }
  }
  const { veil, flip, dragX, close, pointer, onWheel } = useLightboxMotion({
    open,
    reduce,
    fromThumb,
    onClose,
    onStep: (step, visual) => go(visual ? step * flipDir : step),
  })

  useEffect(() => {
    if (!open) return
    for (const d of [1, -1]) {
      const next = items[(index + d + items.length) % items.length]
      preload(next, ratioOf(next))
    }
  }, [open, index])

  const img = open ? items[index] : null
  const v = dir * flipDir
  const variants = reduce ? [plain, plain] : [slide, settle]

  return (
    <dialog
      ref={ref}
      aria-label={t('gallery.dialog')}
      onClose={onNativeClose(onClose)}
      onCancel={(e) => {
        e.preventDefault() // Esc: play the closing animation first
        close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(flipDir)
        if (e.key === 'ArrowLeft') go(-flipDir)
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-alabaster backdrop:bg-transparent"
    >
      <motion.div aria-hidden="true" className="absolute inset-0 bg-charcoal" style={{ opacity: veil }} />
      {img && (
        <div className="relative flex h-full flex-col">
          <motion.div style={{ opacity: veil }} className="container-site flex h-20 shrink-0 items-center justify-between">
            <Counter index={index} count={items.length} dir={dir} />
            <button type="button" onClick={close} aria-label={t('gallery.close')} className={`-me-3 ${control}`}>
              <X size={22} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </motion.div>

          <div
            {...pointer}
            onWheel={onWheel}
            className="relative mx-6 min-h-0 flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing lg:mx-24"
          >
            <div ref={frame} className="absolute inset-0" />
            <motion.div className="absolute inset-0" style={flip}>
              <motion.div className="absolute inset-0" style={{ x: dragX }}>
                <AnimatePresence initial={false} custom={v}>
                  <motion.div key={index} custom={v} variants={variants[0]} initial="enter" animate="center" exit="exit" className="absolute inset-0 overflow-hidden">
                    <motion.div custom={v} variants={variants[1]} className="absolute inset-0">
                      <Photo img={img} ratio={ratioOf(img)} thumbSrc={thumbOf(index)?.currentSrc} />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          <motion.div style={{ opacity: veil }} className="container-site flex h-24 shrink-0 items-center justify-between gap-6">
            <button type="button" onClick={() => go(-1)} aria-label={t('gallery.prev')} className={`-ms-3 ${control}`}>
              <ChevronLeft size={24} strokeWidth={1.25} aria-hidden="true" className="transition-transform duration-500 ease-lux group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
            </button>
            <div className="relative min-w-0 flex-1 overflow-hidden text-center" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.25 } }}
                  exit={reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } }}
                  className="line-clamp-2 text-meta text-alabaster/70"
                >
                  {img.alt}
                </motion.p>
              </AnimatePresence>
            </div>
            <button type="button" onClick={() => go(1)} aria-label={t('gallery.next')} className={`-me-3 ${control}`}>
              <ChevronRight size={24} strokeWidth={1.25} aria-hidden="true" className="transition-transform duration-500 ease-lux group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </button>
          </motion.div>
        </div>
      )}
    </dialog>
  )
}
