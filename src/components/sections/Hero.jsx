import { Star } from 'lucide-react'
import { m as motion, useReducedMotion } from 'motion/react'
import { images } from '../../data/images'
import { salon } from '../../data/salon'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { useLang } from '../../i18n'
import { formatTime } from '../../lib/format'
import { DURATION, EASE } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { TextLink } from '../ui/TextLink'

// introDelay: seconds to wait while the splash curtain is still covering the hero.
export function Hero({ onBook, introDelay = 0 }) {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const status = useOpenStatus()
  const words = t('hero.title').split(' ')
  const statusLabel = status.open
    ? t('status.openUntil', { time: formatTime(status.today.close, lang) })
    : t(status.next.tomorrow ? 'status.opensTomorrow' : 'status.opensAt', { time: formatTime(status.next.time, lang) })
  // Supporting lines only glide (no fade): the subline is the LCP element, so it must paint at once.
  // Every element animates itself with its own delay (no parent→child variant hand-off: that
  // could leave the headline stuck invisible when the visitor scrolled away mid-intro).
  const after = (delay) =>
    reduce ? {} : { initial: { y: 24 }, animate: { y: 0 }, transition: { duration: DURATION.reveal, ease: EASE, delay: introDelay + delay } }
  const word = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: '0.35em' },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DURATION.reveal, ease: EASE, delay: introDelay + 0.25 + i * 0.12 },
        }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: EASE, delay: introDelay }}
      >
        {/* focus right so the oil drop sits beside the headline, not under it */}
        <ImageFrame
          image={images.hero}
          fill
          priority
          zoom={false}
          ratio={[16, 9]}
          mobileRatio={[4, 5]}
          imgClassName="object-[75%_50%] rtl:object-[25%_50%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/40 to-charcoal/80 lg:from-charcoal/25 lg:to-charcoal/65" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/45 to-transparent lg:to-60% rtl:bg-linear-to-l" />
      </motion.div>

      <div className="container-site pb-24 pt-40 lg:pb-32">
        <motion.div {...after(0)}>
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        </motion.div>

        <h1 id="hero-title" className="mt-8 text-display">
          {words.map((w, i) => (
            <motion.span key={`${lang}-${w}`} {...word(i)} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
          <motion.em key={lang} {...word(words.length)} className="accent inline-block">
            {t('hero.accent')}
          </motion.em>
        </h1>

        <motion.p {...after(0.6)} className="mt-8 max-w-[40ch] text-body-l font-light text-alabaster/85">
          {t('hero.sub')}
        </motion.p>

        <motion.div {...after(0.75)} className="mt-10 flex flex-wrap gap-3">
          <Button variant="solid-light" onClick={() => onBook()}>
            {t('common.bookExperience')}
          </Button>
          <Button variant="whatsapp-light">{t('common.whatsapp')}</Button>
        </motion.div>

        <motion.div {...after(0.82)} className="mt-4">
          <TextLink href="#trouver" className="text-champagne">
            {t('hero.finder')}
          </TextLink>
        </motion.div>

        <motion.p
          {...after(0.9)}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-meta text-alabaster/80 sm:gap-x-3"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} strokeWidth={1.25} aria-hidden="true" className="fill-champagne text-champagne" />
            {t('hero.rating', { n: salon.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR') })}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${status.open ? 'bg-champagne' : 'bg-alabaster/40'}`}
            />
            {statusLabel}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>{t('hero.cafe')}</span>
        </motion.p>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 end-6 h-20 w-px overflow-hidden bg-alabaster/20 lg:end-12">
        <span className="block h-full w-full animate-scroll-cue bg-champagne" />
      </div>
    </section>
  )
}
