import { AnimatePresence, m as motion } from 'motion/react'
import { useState } from 'react'
import { srcSet, url } from '../../../data/images'
import { EASE } from '../../../lib/motion'

export const SIZES = '(min-width: 1024px) 80vw, 100vw'

/**
 * The photo, shown at once: the gallery's already-loaded thumbnail (same crop) sits underneath
 * and the sharp file fades in over it when it arrives. No thumbnail → the sharp file alone.
 */
export function Photo({ img, ratio, thumbSrc }) {
  const [sharp, setSharp] = useState(false)
  const cls = 'absolute inset-0 h-full w-full object-contain'
  return (
    <>
      {thumbSrc && <img src={thumbSrc} alt="" aria-hidden="true" draggable={false} className={cls} />}
      <img
        src={url(img, 1600, ratio)}
        srcSet={srcSet(img, ratio)}
        sizes={SIZES}
        alt={img.alt}
        draggable={false}
        onLoad={() => setSharp(true)}
        className={`${cls} transition-opacity duration-700 ease-lux ${sharp || !thumbSrc ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  )
}

/** Warm the browser cache for a neighbour, so the next turn shows the sharp file straight away. */
export function preload(img, ratio) {
  const im = new Image()
  im.sizes = SIZES
  im.srcset = srcSet(img, ratio)
  im.src = url(img, 1600, ratio)
}

const pad = (n) => String(n).padStart(2, '0')
const roll = {
  enter: (d) => ({ y: d > 0 ? '100%' : '-100%' }),
  center: { y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: (d) => ({ y: d > 0 ? '-100%' : '100%', transition: { duration: 0.7, ease: EASE } }),
}

// "03 / 08": the current number rolls up (or down, going back) through a mask; a gold hairline fills.
export function Counter({ index, count, dir }) {
  return (
    <div className="flex items-center gap-5">
      <p className="flex items-baseline gap-2 text-meta text-alabaster/60">
        <span className="relative inline-block h-[1.1em] w-[2ch] overflow-hidden font-display text-h3 leading-none text-alabaster tabular-nums">
          <AnimatePresence initial={false} custom={dir}>
            <motion.span key={index} custom={dir} variants={roll} initial="enter" animate="center" exit="exit" className="absolute inset-0">
              {pad(index + 1)}
            </motion.span>
          </AnimatePresence>
        </span>
        / {pad(count)}
      </p>
      <span aria-hidden="true" className="relative hidden h-px w-24 bg-alabaster/20 sm:block">
        <span
          className="absolute inset-0 origin-left bg-champagne transition-transform duration-700 ease-lux rtl:origin-right"
          style={{ transform: `scaleX(${(index + 1) / count})` }}
        />
      </span>
    </div>
  )
}
