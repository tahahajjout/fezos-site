import { Button } from './components/ui/Button'
import { Eyebrow } from './components/ui/Eyebrow'
import { PackCard } from './components/ui/PackCard'
import { PriceRow } from './components/ui/PriceRow'
import { ReviewCard } from './components/ui/ReviewCard'
import { Section } from './components/ui/Section'
import { SectionTitle } from './components/ui/SectionTitle'
import { Tabs } from './components/ui/Tabs'
import { packs, reviews, serviceCategories } from './data/salon'

// TEMPORARY: step 3 showcase kept under the hero until the real sections land (steps 5–9).
export default function Preview({ onBook, tab, setTab }) {
  const services = serviceCategories.find((c) => c.id === tab).services

  return (
    <>
      <Section id="carte">
        <Eyebrow>Carte des soins</Eyebrow>
        <SectionTitle accent="tarifs." className="mt-8">
          Nos
        </SectionTitle>
        <Tabs
          className="mt-12"
          label="Catégories de soins"
          tabs={serviceCategories}
          value={tab}
          onChange={setTab}
        >
          <ul>
            {services.map((s) => (
              <PriceRow key={s.id} service={s} onSelect={() => onBook(s.id)} />
            ))}
          </ul>
        </Tabs>
      </Section>

      <Section id="packs" variant="linen">
        <Eyebrow>Packs</Eyebrow>
        <SectionTitle accent="complets." className="mt-8">
          Des rituels
        </SectionTitle>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((p) => (
            <PackCard key={p.id} {...p} onBook={() => onBook()} />
          ))}
        </div>
      </Section>

      <Section variant="charcoal">
        <Eyebrow>Pourquoi Fezo’s</Eyebrow>
        <SectionTitle accent="détails." className="mt-8">
          Tout est dans les
        </SectionTitle>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="ghost-light" onClick={() => onBook()}>Réserver</Button>
        </div>
      </Section>

      <Section id="avis">
        <Eyebrow>Avis</Eyebrow>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </Section>

    </>
  )
}
