import { m as motion, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { images } from '../../data/images'
import { useLang } from '../../i18n'
import { DURATION, EASE, VIEWPORT } from '../../lib/motion'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Lightbox } from '../ui/lightbox/Lightbox'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { SwipeHint } from '../ui/SwipeHint'

// Each photo opens like a curtain rising, while the picture settles from a slight zoom.
const curtain = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DURATION.zoom, ease: EASE } },
}
const settle = {
  hidden: { scale: 1.15 },
  show: { scale: 1, transition: { duration: DURATION.zoom * 1.5, ease: EASE } },
}

function Curtain({ children }) {
  const reduce = useReducedMotion()
  if (reduce) return children
  // The outer, unclipped wrapper is what gets watched: Chrome counts a closed clip-path as zero area,
  // so a clipped element would never be "in view".
  return (
    <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT}>
      <motion.div variants={curtain}>
        <motion.div variants={settle}>{children}</motion.div>
      </motion.div>
    </motion.div>
  )
}

// Phones and tablets: a swipe row of 4:5 photos (instead of a very long column).
// Desktop: sticky title beside a two-column masonry of mixed ratios. Click opens the lightbox.
export function Gallery() {
  const { t } = useLang()
  const [index, setIndex] = useState(null)
  const track = useRef(null)
  // While the viewer turns photos, the swipe row (phones) follows behind it, so closing
  // shrinks the photo back into a thumbnail that is on screen.
  const showPhoto = (i) => {
    setIndex(i)
    const row = track.current
    if (row.scrollWidth > row.clientWidth) row.children[i]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
  }

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="section-y bg-alabaster">
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

        <div className="min-w-0 lg:col-span-8">
          <ul
            ref={track}
            className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:block lg:columns-2 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {images.gallery.map((img, i) => (
              <li key={img.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:mb-6 lg:w-auto lg:break-inside-avoid">
                <Curtain>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t('gallery.enlarge', { alt: img.alt })}
                    className="group block w-full cursor-zoom-in"
                  >
                    <ImageFrame
                      image={img}
                      ratio={img.ratio}
                      mobileRatio={[4, 5]}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw"
                    />
                  </button>
                </Curtain>
              </li>
            ))}
          </ul>
          <SwipeHint trackRef={track} count={images.gallery.length} className="lg:hidden" />
        </div>
      </div>

      <Lightbox
        items={images.gallery}
        index={index}
        onIndex={showPhoto}
        onClose={() => setIndex(null)}
        thumbOf={(i) => track.current?.children[i]?.querySelector('img')}
      />
    </section>
  )
}
