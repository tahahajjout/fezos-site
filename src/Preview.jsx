import { Button } from './components/ui/Button'
import { Eyebrow } from './components/ui/Eyebrow'
import { ReviewCard } from './components/ui/ReviewCard'
import { Section } from './components/ui/Section'
import { SectionTitle } from './components/ui/SectionTitle'
import { reviews } from './data/salon'

// TEMPORARY: step 3 showcase kept under the hero until the real sections land (step 8).
export default function Preview({ onBook }) {
  return (
    <>
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
