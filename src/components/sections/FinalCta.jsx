import { images } from '../../data/images'
import { Button } from '../ui/Button'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal, RevealItem } from '../ui/Reveal'

// Full-width image band — the one centred moment of the page.
export function FinalCta({ onBook }) {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-charcoal text-alabaster [&_.accent]:text-champagne"
    >
      <div className="absolute inset-0 -z-10">
        <ImageFrame image={images.finalCta} fill ratio={[16, 9]} mobileRatio={[4, 5]} />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/25 to-charcoal/65" />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>
      <Reveal stagger className="container-site flex flex-col items-center py-32 text-center lg:py-48">
        <RevealItem as="h2" id="cta-title" className="text-h2">
          Prête pour votre <em className="accent">moment Fezo’s ?</em>
        </RevealItem>
        <RevealItem className="mt-10">
          <Button variant="solid-light" onClick={() => onBook()}>
            Réserver une expérience
          </Button>
        </RevealItem>
      </Reveal>
    </section>
  )
}
