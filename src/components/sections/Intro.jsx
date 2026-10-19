import { Star } from 'lucide-react'
import { images } from '../../data/images'
import { hours, salon } from '../../data/salon'
import { frenchTime } from '../../lib/time'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const stats = [
  {
    value: (
      <>
        {salon.rating.value.toLocaleString('fr-FR')}
        <Star size={20} strokeWidth={1.25} aria-hidden="true" className="ms-2 inline fill-champagne text-champagne" />
      </>
    ),
    label: `sur Google · ${salon.rating.count} avis`,
  },
  { value: '7j/7', label: `Ouvert tous les jours dès ${frenchTime(hours[1].open)}` },
  { value: 'Café', label: 'et eau offerts dès votre arrivée' },
]

// L'expérience Fezo's — editorial split: statement + picture left (7 cols), text and facts right (4 cols, offset).
export function Intro() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y bg-alabaster">
      <Reveal stagger className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <RevealItem className="lg:col-span-7">
          <Eyebrow>L’expérience Fezo’s</Eyebrow>
          <SectionTitle id="experience-title" accent="le temps." className="mt-8">
            Un lounge où l’on prend
          </SectionTitle>
        </RevealItem>

        <RevealItem className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:self-end lg:pb-4">
          <p className="max-w-[45ch] text-body-l font-light">
            Chez Fezo’s, on vous accueille avec un café, on respecte l’heure de votre rendez-vous et l’on soigne
            chaque détail — des longueurs aux ongles, jusqu’au massage des pieds offert avec votre manucure ou
            pédicure.
          </p>
          <ul className="mt-14 grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-10">
            {stats.map((s) => (
              <li key={s.label}>
                <span className="block font-display text-h3 lg:text-h2">{s.value}</span>
                <span className="mt-2 block text-meta text-stone">{s.label}</span>
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem className="lg:col-span-7">
          <ImageFrame
            image={images.lounge}
            ratio={[16, 10]}
            mobileRatio={[4, 5]}
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </RevealItem>
      </Reveal>
    </section>
  )
}
