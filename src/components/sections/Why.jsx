import { Clock, Coffee, Droplets, Footprints } from 'lucide-react'
import { featuredQuote, promises, salon } from '../../data/salon'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const ICONS = { cafe: Coffee, ponctualite: Clock, massage: Footprints, produits: Droplets }

// Pourquoi Fezo's — charcoal. Title left, the four promises as a large-type list right,
// then one review line set big across the section as its close.
export function Why() {
  const { t, l, lang } = useLang()
  const [open, close] = lang === 'en' ? ['“', '”'] : ['« ', ' »']
  return (
    <section
      id="pourquoi"
      aria-labelledby="pourquoi-title"
      className="section-y bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:col-span-5">
          <RevealItem>
            <Eyebrow>{t('why.eyebrow')}</Eyebrow>
            <SectionTitle id="pourquoi-title" accent={t('why.accent')} className="mt-8">
              {t('why.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[36ch] text-body-l font-light text-alabaster/85">
            {t('why.body')}
          </RevealItem>
        </Reveal>

        <Reveal as="ul" stagger className="lg:col-span-6 lg:col-start-7">
          {promises.map((p) => {
            const Icon = ICONS[p.id]
            return (
              <RevealItem
                as="li"
                key={p.id}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-alabaster/15 py-8 last:border-b"
              >
                <Icon size={20} strokeWidth={1.25} aria-hidden="true" className="mt-2 text-champagne" />
                <h3 className="text-h3">{l(p.title)}</h3>
                <p className="col-start-2 max-w-[48ch] text-alabaster/75">{l(p.text)}</p>
              </RevealItem>
            )
          })}
        </Reveal>

        <Reveal as="figure" className="mt-6 lg:col-span-10 lg:mt-16">
          <blockquote className="font-display text-h2 font-light italic">
            {open}
            {l(featuredQuote)}
            {close}
          </blockquote>
          <figcaption className="mt-6 text-meta text-alabaster/70">
            {t('why.quoteMeta', { n: salon.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR'), count: salon.rating.count })}
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}
