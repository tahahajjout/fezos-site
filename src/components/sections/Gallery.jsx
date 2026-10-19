import { useState } from 'react'
import { images } from '../../data/images'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Lightbox } from '../ui/Lightbox'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Editorial masonry with CSS columns (mixed 4:5 / 1:1 / 16:9 from images.js); click opens the lightbox.
export function Gallery() {
  const { t } = useLang()
  const [index, setIndex] = useState(null)

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="section-y bg-alabaster">
      {/* Sticky 4/8 split: the title holds still beside a two-column masonry */}
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <RevealItem>
            <Eyebrow>{t('gallery.eyebrow')}</Eyebrow>
            <SectionTitle id="galerie-title" accent={t('gallery.accent')} className="mt-8">
              {t('gallery.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[32ch] text-body-l font-light">
            {t('gallery.body')}
          </RevealItem>
          <RevealItem as="p" className="mt-6 text-meta text-stone">
            {t('gallery.note')}
          </RevealItem>
        </Reveal>

        <Reveal stagger className="columns-1 gap-6 sm:columns-2 lg:col-span-8">

          {images.gallery.map((img, i) => (
            <RevealItem key={img.id} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t('gallery.enlarge', { alt: img.alt })}
                className="group block w-full cursor-zoom-in"
              >
                <ImageFrame
                  image={img}
                  ratio={img.ratio}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, calc(100vw - 3rem)"
                />
              </button>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      <Lightbox items={images.gallery} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </section>
  )
}
