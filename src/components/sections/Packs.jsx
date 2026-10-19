import { images } from '../../data/images'
import { packs } from '../../data/salon'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { PackCard } from '../ui/PackCard'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Asymmetric 7/5 then 5/7 rows; the wide card of each row carries a picture.
const LAYOUT = [
  { span: 'lg:col-span-7', featured: true },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-7', featured: true, reverse: true }, // picture on the outer edge
]

export function Packs({ onBook }) {
  const { t } = useLang()
  return (
    <section id="packs" aria-labelledby="packs-title" className="section-y bg-linen">
      <div className="container-site">
        {/* Stacked header (title, then its line) so it doesn't repeat the split header of the sections around it */}
        <Reveal stagger className="max-w-3xl">
          <RevealItem>
            <Eyebrow>{t('packs.eyebrow')}</Eyebrow>
            <SectionTitle id="packs-title" accent={t('packs.accent')} className="mt-8">
              {t('packs.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[44ch] text-body-l font-light">
            {t('packs.body')}
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12">
          {packs.map((p, i) => (
            <RevealItem key={p.id} className={LAYOUT[i].span}>
              <PackCard
                {...p}
                image={LAYOUT[i].featured ? images.packs[p.image] : undefined}
                reverse={LAYOUT[i].reverse}
                onBook={() => onBook(p.id)}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
