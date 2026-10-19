import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { reviews, salon } from '../../data/salon'
import { useDragScroll } from '../../hooks/useDragScroll'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { ReviewCard } from '../ui/ReviewCard'
import { Stars } from '../ui/Stars'
import { TextLink } from '../ui/TextLink'

const arrow =
  'inline-flex size-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-300 hover:border-charcoal'

// Avis — the rating set huge, then a native scroll-snap carousel (swipe on touch, drag with a mouse).
export function Reviews() {
  const reduce = useReducedMotion()
  const track = useDragScroll()
  const page = (dir) =>
    track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <section id="avis" aria-labelledby="avis-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal stagger className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>Avis</Eyebrow>
            <h2 id="avis-title" className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="text-display">{salon.rating.value.toLocaleString('fr-FR')}</span>
              <span className="text-h3">
                sur Google — <em className="accent">{salon.rating.count} avis</em>
              </span>
            </h2>
            <Stars className="mt-6" />
          </RevealItem>
          <RevealItem className="flex items-center justify-between gap-6 lg:col-span-4 lg:col-start-9">
            <TextLink href={salon.mapsUrl}>Voir sur Google</TextLink>
            <div className="flex gap-2">
              <button type="button" onClick={() => page(-1)} aria-label="Avis précédents" className={arrow}>
                <ChevronLeft size={20} strokeWidth={1.25} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => page(1)} aria-label="Avis suivants" className={arrow}>
                <ChevronRight size={20} strokeWidth={1.25} aria-hidden="true" />
              </button>
            </div>
          </RevealItem>
        </Reveal>

        <ul
          ref={track}
          aria-label="Avis de nos clientes"
          className="mt-16 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] select-none active:cursor-grabbing lg:mt-20 lg:gap-10 [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <li key={r.id} className="w-[85%] shrink-0 snap-start sm:w-[55%] lg:w-[40%]">
              <ReviewCard {...r} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
