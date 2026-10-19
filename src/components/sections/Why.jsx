import { Clock, Coffee, Droplets, Footprints } from 'lucide-react'
import { featuredQuote, promises, salon } from '../../data/salon'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const ICONS = { cafe: Coffee, ponctualite: Clock, massage: Footprints, produits: Droplets }

// Pourquoi Fezo's — charcoal. Title left, the four promises as a large-type list right,
// then one review line set big across the section as its close.
export function Why() {
  return (
    <section
      id="pourquoi"
      aria-labelledby="pourquoi-title"
      className="section-y bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:col-span-5">
          <RevealItem>
            <Eyebrow>Pourquoi Fezo’s</Eyebrow>
            <SectionTitle id="pourquoi-title" accent="détails." className="mt-8">
              Tout est dans les
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[36ch] text-body-l font-light text-alabaster/85">
            Ce que nos clientes racontent le plus souvent dans leurs avis, et ce que nous tenons à chaque visite.
          </RevealItem>
        </Reveal>

        <Reveal as="ul" stagger className="lg:col-span-6 lg:col-start-7">
          {promises.map((p) => {
            const Icon = ICONS[p.id]
            return (
              <RevealItem
                as="li"
                key={p.id}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-alabaster/15 py-8 last:border-b"
              >
                <Icon size={20} strokeWidth={1.25} aria-hidden="true" className="mt-2 text-champagne" />
                <h3 className="text-h3">{p.title}</h3>
                <p className="col-start-2 max-w-[48ch] text-alabaster/75">{p.text}</p>
              </RevealItem>
            )
          })}
        </Reveal>

        <Reveal as="figure" className="mt-6 lg:col-span-10 lg:mt-16">
          <blockquote className="font-display text-h2 font-light italic">« {featuredQuote.text} »</blockquote>
          <figcaption className="mt-6 text-meta text-alabaster/70">
            {featuredQuote.source} · {salon.rating.value.toLocaleString('fr-FR')}/5 sur {salon.rating.count} avis
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
