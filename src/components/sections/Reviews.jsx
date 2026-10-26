import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { reviews, salon } from '../../data/salon'
import { useDragScroll } from '../../hooks/useDragScroll'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { ReviewCard } from '../ui/ReviewCard'
import { Stars } from '../ui/Stars'
import { SwipeHint } from '../ui/SwipeHint'
import { TextLink } from '../ui/TextLink'

const arrow =
  'inline-flex size-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-300 hover:border-charcoal'

// Avis — the rating set huge, then a native scroll-snap carousel (swipe on touch, drag with a mouse).
export function Reviews() {
  const { t, lang, rtl } = useLang()
  const reduce = useReducedMotion()
  const track = useDragScroll()
  // In RTL the row starts on the right, so "next" scrolls towards negative scrollLeft.
  const page = (dir) =>
    track.current.scrollBy({
      left: dir * (rtl ? -1 : 1) * track.current.clientWidth * 0.8,
      behavior: reduce ? 'auto' : 'smooth',
    })

  return (
    <section id="avis" aria-labelledby="avis-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal stagger className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>{t('reviews.eyebrow')}</Eyebrow>
            <h2 id="avis-title" className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="text-display">{salon.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR')}</span>
              <span className="text-h3">
                {t('reviews.onGoogle')} <em className="accent">{t('reviews.count', { n: salon.rating.count })}</em>
              </span>
            </h2>
            <Stars className="mt-6" />
          </RevealItem>
          <RevealItem className="flex items-center justify-between gap-6 lg:col-span-4 lg:col-start-9">
            <TextLink href={salon.mapsUrl}>{t('reviews.seeGoogle')}</TextLink>
            <div className="flex gap-2">
              <button type="button" onClick={() => page(-1)} aria-label={t('reviews.prev')} className={arrow}>
                <ChevronLeft size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
              </button>
              <button type="button" onClick={() => page(1)} aria-label={t('reviews.next')} className={arrow}>
                <ChevronRight size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
              </button>
            </div>
          </RevealItem>
        </Reveal>

        <ul
          ref={track}
          aria-label={t('reviews.list')}
          className="mt-16 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] select-none active:cursor-grabbing lg:mt-20 lg:gap-10 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <li key={r.id} className="w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[40%]">
              <ReviewCard {...r} />
            </li>
          ))}
        </ul>
        {/* touch sizes; desktop has the arrows next to the rating */}
        <SwipeHint trackRef={track} count={reviews.length} className="lg:hidden" />
      </div>
    </section>
  )
}
