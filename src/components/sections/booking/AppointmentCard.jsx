import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react'
import { useLang } from '../../../i18n'
import { formatDate, formatDuration, formatPrice, formatTime } from '../../../lib/format'
import { DURATION, EASE } from '../../../lib/motion'
import { ImageFrame } from '../../ui/ImageFrame'

// The salon's printed "carte de rendez-vous", filling itself in as the visitor chooses.
// Desktop: the dialog's charcoal side panel. Phones: a compact strip under the title.

/** A value that glides in whenever it changes; "À choisir" while empty. */
function Live({ value, className = '' }) {
  const { t } = useLang()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value || 'empty'}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: DURATION.micro, ease: EASE }}
        className={`inline-block ${value ? className : 'italic text-alabaster/40'}`}
      >
        {value || t('booking.toChoose')}
      </motion.span>
    </AnimatePresence>
  )
}

/** Photo that cross-fades and settles (scale 1.06 → 1) when the chosen treatment changes. */
function Photo({ image, sizes }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={image.id}
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.zoom, ease: EASE }}
      >
        <ImageFrame image={image} fill zoom={false} sizes={sizes} />
      </motion.div>
    </AnimatePresence>
  )
}

export function AppointmentCard({ item, image, date, time, name, compact = false }) {
  const { t, l, lang } = useLang()
  const reduce = useReducedMotion()
  const when = date && [formatDate(date, lang), time && formatTime(time, lang)].filter(Boolean).join(' · ')

  if (compact) {
    return (
      <div className="flex items-center gap-4 stay-dark bg-charcoal px-6 py-4 text-alabaster lg:hidden">
        <div className="relative size-14 shrink-0 overflow-hidden bg-charcoal-soft">
          <Photo image={image} sizes="56px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-price leading-tight">
            <Live value={item && l(item.name)} />
          </p>
          <p className="mt-1 truncate text-meta text-alabaster/70">
            <Live value={when} />
          </p>
        </div>
        {item && <span className="price whitespace-nowrap text-champagne">{formatPrice(item.price, lang)}</span>}
      </div>
    )
  }

  const rows = [
    [t('booking.service'), item && l(item.name), item && formatPrice(item.price, lang)],
    [t('booking.duration'), item && formatDuration(item.duration, lang)],
    [t('booking.when'), when],
    [t('booking.forName'), name.trim()],
  ]
  return (
    <aside aria-label={t('booking.card')} className="relative hidden flex-col stay-dark bg-charcoal text-alabaster lg:flex">
      {/* opening: the photo wipes down like a curtain and settles */}
      <motion.div
        className="relative h-[46%] overflow-hidden"
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
      >
        <Photo image={image} sizes="40vw" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/0 to-charcoal" />
      </motion.div>

      <div className="relative -mt-10 flex flex-1 flex-col px-10 pb-10 xl:px-12">
        <p className="eyebrow text-champagne">{t('booking.card')}</p>
        <span className="gold-rule mt-4" />
        <p className="mt-6 font-display text-h2 font-light italic">{t('booking.cardTitle')}</p>
        <dl className="mt-auto">
          {rows.map(([label, value, price]) => (
            <div key={label} className="flex items-baseline gap-6 border-t border-alabaster/15 py-4">
              <dt className="w-24 shrink-0 text-meta text-alabaster/60">{label}</dt>
              <dd className="min-w-0 flex-1 font-display text-price leading-snug">
                <Live value={value} />
              </dd>
              {price && <span className="price text-champagne">{price}</span>}
            </div>
          ))}
        </dl>
      </div>
    </aside>
  )
}
