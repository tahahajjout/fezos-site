import { useState } from 'react'
import { Button } from './components/ui/Button'
import { Eyebrow } from './components/ui/Eyebrow'
import { Modal } from './components/ui/Modal'
import { PackCard } from './components/ui/PackCard'
import { PriceRow } from './components/ui/PriceRow'
import { Reveal, RevealItem } from './components/ui/Reveal'
import { ReviewCard } from './components/ui/ReviewCard'
import { Section } from './components/ui/Section'
import { SectionTitle } from './components/ui/SectionTitle'
import { Tabs } from './components/ui/Tabs'
import { TextLink } from './components/ui/TextLink'
import { TreatmentCard } from './components/ui/TreatmentCard'
import { images } from './data/images'
import { packs, reviews, serviceCategories, treatments } from './data/salon'

// Step 3 component showcase — replaced by real sections from step 4.
export default function App() {
  const [tab, setTab] = useState(serviceCategories[0].id)
  const [booking, setBooking] = useState(null)
  const services = serviceCategories.find((c) => c.id === tab).services
  const open = (name) => setBooking(name)

  return (
    <main>
      <Section>
        <Eyebrow>Beauty Lounge · Fès</Eyebrow>
        <SectionTitle as="h1" accent="beauté." className="mt-8">
          Votre moment
        </SectionTitle>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button onClick={() => open('Une expérience')}>Réserver une expérience</Button>
          <Button variant="outline">Découvrir</Button>
          <Button variant="whatsapp">WhatsApp</Button>
          <TextLink href="#soins">Voir les soins</TextLink>
        </div>
      </Section>

      <Section id="soins" variant="linen">
        <Eyebrow>Nos soins</Eyebrow>
        <SectionTitle accent="soin." className="mt-8">
          L’art du
        </SectionTitle>
        <Reveal stagger className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {treatments.map((t, i) => (
            <RevealItem key={t.id} className={i % 2 ? 'lg:mt-24' : ''}>
              <TreatmentCard {...t} image={images.treatments[t.image]} href="#carte" />
            </RevealItem>
          ))}
        </Reveal>
      </Section>

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
              <PriceRow key={s.id} service={s} onSelect={() => open(s.name)} />
            ))}
          </ul>
        </Tabs>
      </Section>

      <Section variant="linen">
        <Eyebrow>Packs</Eyebrow>
        <SectionTitle accent="complets." className="mt-8">
          Des rituels
        </SectionTitle>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packs.map((p) => (
            <PackCard key={p.id} {...p} onBook={() => open(p.name)} />
          ))}
        </div>
      </Section>

      <Section variant="charcoal">
        <Eyebrow>Pourquoi Fezo’s</Eyebrow>
        <SectionTitle accent="détails." className="mt-8">
          Tout est dans les
        </SectionTitle>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="ghost-light">Réserver</Button>
        </div>
      </Section>

      <Section>
        <Eyebrow>Avis</Eyebrow>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </Section>

      <Modal open={booking !== null} onClose={() => setBooking(null)} title="Réserver">
        <p className="text-stone">
          Soin sélectionné : <span className="text-charcoal">{booking}</span>
        </p>
        <p className="mt-4 text-meta text-stone">Le formulaire complet arrive à l’étape 10.</p>
      </Modal>
    </main>
  )
}
