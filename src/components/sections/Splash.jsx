import { m as motion } from 'motion/react'
import { useEffect } from 'react'
import { DURATION, EASE } from '../../lib/motion'

// Seconds the logo holds before the curtain lifts; the hero offsets its entrance by this.
export const SPLASH_HOLD = 2
const SEEN_KEY = 'fezos-splash-seen'

/** Once per browser session, never with reduced motion. React-only, so no-JS visitors never see it. */
export function shouldPlaySplash() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

// Logo intro: "Fezo's" rises out of a mask, the gold rule draws, "BEAUTY LOUNGE" opens up,
// then the charcoal curtain lifts onto the hero.
export function Splash({ onDone }) {
  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage blocked: it simply plays again next visit */
    }
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-60 flex items-center justify-center bg-charcoal text-alabaster"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: DURATION.zoom, ease: EASE, delay: SPLASH_HOLD }}
      onAnimationComplete={onDone}
    >
      <div className="flex flex-col items-center leading-none">
        <span className="overflow-hidden pb-[0.12em]">
          <motion.span
            className="block font-display text-display font-light italic"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: DURATION.zoom, ease: EASE, delay: 0.15 }}
          >
            Fezo’s
          </motion.span>
        </span>
        <motion.span
          className="gold-rule mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DURATION.reveal, ease: EASE, delay: 0.8 }}
        />
        <motion.span
          className="mt-5 whitespace-nowrap text-eyebrow font-medium uppercase text-champagne"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.25em' }}
          transition={{ duration: DURATION.reveal, ease: EASE, delay: 1 }}
        >
          Beauty Lounge
        </motion.span>
      </div>
    </motion.div>
  )
}
