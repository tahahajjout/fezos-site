import { m as motion, useReducedMotion } from 'motion/react'
import { useLang } from '../../../i18n'
import { EASE } from '../../../lib/motion'

// "Ready": a gold circle and tick draw themselves, then the next step in plain words.
export function Done() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const draw = (delay) => (reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.9, ease: EASE, delay } })
  return (
    <div className="py-6 lg:py-12">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="text-champagne-deep">
        <motion.circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" {...draw(0)} />
        <motion.path d="M21 33l7 7 15-16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...draw(0.6)} />
      </svg>
      <h3 className="mt-10 text-h2">{t('booking.doneTitle')}</h3>
      <p className="mt-6 max-w-[44ch] text-body-l font-light">{t('booking.doneBody')}</p>
    </div>
  )
}
