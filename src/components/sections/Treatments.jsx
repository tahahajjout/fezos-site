import { images } from '../../data/images'
import { treatments } from '../../data/salon'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { TreatmentCard } from '../ui/TreatmentCard'

// Each card sits at its own height on desktop (staggered editorial grid); 2-up on tablet.
const OFFSETS = ['', 'sm:mt-20 lg:mt-28', 'lg:mt-10', 'sm:mt-20 lg:mt-40']

// "Découvrir" opens the price list on the card's category.
export function Treatments({ onSelect }) {
  return (
    <section id="soins" aria-labelledby="soins-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>Nos soins</Eyebrow>
            <SectionTitle id="soins-title" accent="soin." className="mt-8">
              L’art du
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[40ch] text-body-l font-light lg:col-span-4 lg:col-start-9">
            Quatre univers, une même exigence : des gammes professionnelles — PN Pronails, Soin21, Hydrafacial — et le
            temps qu’il faut.
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-x-6 lg:mt-24 lg:grid-cols-4 lg:gap-x-8">
          {treatments.map((t, i) => (
            <RevealItem key={t.id} className={OFFSETS[i]}>
              <TreatmentCard
                {...t}
                image={images.treatments[t.image]}
                href="#carte"
                onClick={() => onSelect(t.category)}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
