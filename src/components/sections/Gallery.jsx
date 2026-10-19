import { useState } from 'react'
import { images } from '../../data/images'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Lightbox } from '../ui/Lightbox'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Editorial masonry with CSS columns (mixed 4:5 / 1:1 / 16:9 from images.js); click opens the lightbox.
export function Gallery() {
  const [index, setIndex] = useState(null)

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="section-y bg-alabaster">
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>Galerie</Eyebrow>
            <SectionTitle id="galerie-title" accent="gestes." className="mt-8">
              Matières et
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[36ch] text-body-l font-light lg:col-span-4 lg:col-start-9">
            Huiles, soins, ongles et brushings : un aperçu de l’univers Fezo’s.
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-16 columns-1 gap-6 sm:columns-2 lg:mt-20 lg:columns-3">
          {images.gallery.map((img, i) => (
            <RevealItem key={img.id} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Agrandir : ${img.alt}`}
                className="group block w-full cursor-zoom-in"
              >
                <ImageFrame
                  image={img}
                  ratio={img.ratio}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </button>
            </RevealItem>
          ))}
        </Reveal>
        <p className="mt-4 text-meta text-stone">Images d’ambiance — photos du salon bientôt disponibles.</p>
      </div>

      <Lightbox items={images.gallery} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  )
}
