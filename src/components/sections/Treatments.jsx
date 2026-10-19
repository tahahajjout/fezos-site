import { images } from '../../data/images'
import { treatments } from '../../data/salon'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { TreatmentCard } from '../ui/TreatmentCard'

// Each card sits at its own height on desktop (staggered editorial grid); 2-up on tablet.
const OFFSETS = ['', 'sm:mt-20 lg:mt-28', 'lg:mt-10', 'sm:mt-20 lg:mt-40']

// "Découvrir" opens the price list on the card's category.
export function Treatments({ onSelect }) {
  const { t } = useLang()
  return (
    <section id="soins" aria-labelledby="soins-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>{t('treatments.eyebrow')}</Eyebrow>
            <SectionTitle id="soins-title" accent={t('treatments.accent')} className="mt-8">
              {t('treatments.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[40ch] text-body-l font-light lg:col-span-4 lg:col-start-9">
            {t('treatments.body')}
          </RevealItem>
        </Reveal>

        {/* Phones: a swipe row with the next card peeking (instead of four full-screen photos stacked);
            from sm: the staggered grid. The row bleeds to the screen edges inside the container gutter. */}
        <Reveal
          stagger
          className="-mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:mt-24 lg:grid-cols-4 lg:gap-x-8 [&::-webkit-scrollbar]:hidden"
        >
          {treatments.map((item, i) => (
            <RevealItem key={item.id} className={`w-[78%] shrink-0 snap-start sm:w-auto ${OFFSETS[i]}`}>
              <TreatmentCard
                {...item}
                image={images.treatments[item.image]}
                href="#carte"
                onClick={() => onSelect(item.category)}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
