import { images } from '../../data/images'
import { packs } from '../../data/salon'
import { Eyebrow } from '../ui/Eyebrow'
import { PackCard } from '../ui/PackCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Asymmetric 7/5 then 5/7 rows; the wide card of each row carries a picture.
const LAYOUT = [
  { span: 'lg:col-span-7', featured: true },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-7', featured: true, reverse: true }, // picture on the outer edge
]

export function Packs({ onBook }) {
  return (
    <section id="packs" aria-labelledby="packs-title" className="section-y bg-linen">
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>Packs</Eyebrow>
            <SectionTitle id="packs-title" accent="complets." className="mt-8">
              Des rituels
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[40ch] text-body-l font-light lg:col-span-4 lg:col-start-9">
            Plusieurs soins réunis en un seul rendez-vous, pour un grand jour ou simplement pour vous.
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12">
          {packs.map((p, i) => (
            <RevealItem key={p.id} className={LAYOUT[i].span}>
              <PackCard
                {...p}
                image={LAYOUT[i].featured ? images.packs[p.image] : undefined}
                reverse={LAYOUT[i].reverse}
                onBook={() => onBook(p.id)}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
