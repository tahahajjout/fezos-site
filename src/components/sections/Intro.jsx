import { Star } from 'lucide-react'
import { images } from '../../data/images'
import { hours, salon } from '../../data/salon'
import { useScrollWords } from '../../hooks/useScrollWords'
import { useLang } from '../../i18n'
import { formatTime } from '../../lib/format'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { Words } from '../ui/Words'

// L'expérience Fezo's — editorial split: statement + picture left (7 cols), text and facts right (4 cols, offset).
export function Intro() {
  const { t, lang } = useLang()
  const titleRef = useScrollWords('focus', { deps: [lang] })
  const stats = [
    {
      value: (
        <>
          {salon.rating.value.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR')}
          <Star size={20} strokeWidth={1.25} aria-hidden="true" className="ms-2 inline fill-champagne text-champagne" />
        </>
      ),
      label: t('intro.ratingLabel', { n: salon.rating.count }),
    },
    { value: t('intro.daysValue'), label: t('intro.daysLabel', { time: formatTime(hours[1].open, lang) }) },
    { value: t('intro.cafeValue'), label: t('intro.cafeLabel') },
  ]
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y bg-alabaster">
      <Reveal stagger className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <RevealItem className="lg:col-span-7">
          <Eyebrow>{t('intro.eyebrow')}</Eyebrow>
          <SectionTitle
            ref={titleRef}
            id="experience-title"
            accent={<Words text={t('intro.accent')} />}
            className="mt-8"
          >
            <Words text={t('intro.title')} />
          </SectionTitle>
        </RevealItem>

        <RevealItem className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:self-end lg:pb-4">
          <p className="max-w-[45ch] text-body-l font-light">
            {t('intro.body')}
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
            sizes="(min-width: 1024px) 58vw, calc(100vw - 3rem)"
          />
        </RevealItem>
      </Reveal>
    </section>
  )
}
