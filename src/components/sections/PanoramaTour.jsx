import { images } from '../../data/images'
import { Eyebrow } from '../ui/Eyebrow'
import { PanoramaViewer } from '../ui/PanoramaViewer'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Visite virtuelle 360° — charcoal section, the viewer runs the full container width.
export function PanoramaTour() {
  return (
    <section
      id="visite"
      aria-labelledby="visite-title"
      className="section-y bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>Visite virtuelle 360°</Eyebrow>
            <SectionTitle id="visite-title" accent="lounge." className="mt-8">
              Entrez dans le
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[36ch] text-body-l font-light text-alabaster/85 lg:col-span-4 lg:col-start-9">
            Faites glisser l’image pour parcourir l’espace, comme si vous passiez la porte.
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <PanoramaViewer
            image={images.panorama}
            label="Visite virtuelle du salon, faites glisser pour explorer"
            hint="Faites glisser pour explorer l’espace 360°"
          />
          <p className="mt-4 text-meta text-alabaster/60">Image indicative — visite réelle bientôt disponible</p>
        </Reveal>
      </div>
    </section>
  )
}
