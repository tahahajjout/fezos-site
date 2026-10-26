import { useRef, useState } from 'react'
import { images } from '../../data/images'
import { finder } from '../../data/salon'
import { useLang } from '../../i18n'
import { bookables } from '../../lib/booking'
import { formatDuration, formatPrice } from '../../lib/format'
import { Arrow } from '../ui/Arrow'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const question = 'mb-6 text-meta font-medium uppercase tracking-label text-stone'

// Trouver mon soin — two taps (area, then wish) lead to one suggested treatment, bookable in place.
export function Finder({ onBook }) {
  const { t, l, lang } = useLang()
  const [areaId, setAreaId] = useState(null)
  const [serviceId, setServiceId] = useState(null)
  const resultRef = useRef(null)
  const area = finder.find((a) => a.id === areaId)
  const result = bookables.find((b) => b.id === serviceId)

  const pickArea = (id) => {
    setAreaId(id)
    setServiceId(null)
  }
  // On phones the suggestion appears below the fold: bring it into view once rendered (CSS scroll-behavior
  // decides smooth vs instant, so reduced motion is respected).
  const pickWish = (id) => {
    setServiceId(id)
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'nearest' }))
  }

  return (
    <section id="trouver" aria-labelledby="trouver-title" className="section-y bg-champagne-soft">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <RevealItem>
            <Eyebrow>{t('finder.eyebrow')}</Eyebrow>
            <SectionTitle id="trouver-title" accent={t('finder.accent')} className="mt-8">
              {t('finder.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[38ch] text-body-l font-light">
            {t('finder.body')}
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <fieldset>
            <legend className={question}>{t('finder.step1')}</legend>
            {/* Picture tiles: the first tap should feel like choosing, not filling a form */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {finder.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={a.id === areaId}
                  onClick={() => pickArea(a.id)}
                  className={`group self-start text-start transition-opacity duration-300 ease-lux ${areaId && a.id !== areaId ? 'opacity-60 hover:opacity-100' : ''}`}
                >
                  <ImageFrame
                    image={images.treatments[a.image]}
                    ratio={[4, 5]}
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    className="outline-offset-4 group-aria-pressed:outline group-aria-pressed:outline-1 group-aria-pressed:outline-champagne-deep"
                  />
                  <span className="mt-4 block font-display text-body-l leading-snug sm:text-h3">{l(a.label)}</span>
                  <span
                    aria-hidden="true"
                    className="gold-rule mt-3 block origin-left scale-x-0 transition-transform duration-500 ease-lux group-hover:scale-x-100 group-aria-pressed:scale-x-100 rtl:origin-right"
                  />
                </button>
              ))}
            </div>
          </fieldset>

          {area && (
            <fieldset className="mt-12">
              <legend className={question}>{t('finder.step2')}</legend>
              <ul>
                {area.wishes.map((w) => (
                  <li key={w.serviceId} className="border-t border-sand last:border-b">
                    <button
                      type="button"
                      aria-pressed={w.serviceId === serviceId}
                      onClick={() => pickWish(w.serviceId)}
                      className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-start text-body-l transition-colors duration-300 aria-pressed:text-champagne-deep"
                    >
                      {l(w.label)}
                      <Arrow />
                    </button>
                  </li>
                ))}
              </ul>
            </fieldset>
          )}

          <div ref={resultRef} aria-live="polite" className="scroll-mb-28">
            {result && (
              <div className="mt-12 bg-alabaster p-8 lg:p-10">
                <p className="eyebrow">{t('finder.result')}</p>
                <h3 className="mt-6 text-h3">{l(result.name)}</h3>
                <p className="mt-3 max-w-[44ch]">{l(result.description)}</p>
                <p className="mt-6 flex items-baseline gap-4">
                  <span className="price">{formatPrice(result.price, lang)}</span>
                  {result.duration && <span className="text-meta text-stone">{formatDuration(result.duration, lang)}</span>}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <Button onClick={() => onBook(result.id)}>{t('common.book')}</Button>
                  <button
                    type="button"
                    onClick={() => pickArea(null)}
                    className="min-h-11 text-meta uppercase tracking-label text-stone hover:text-charcoal"
                  >
                    {t('finder.restart')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
