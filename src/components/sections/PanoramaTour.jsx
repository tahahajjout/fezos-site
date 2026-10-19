import { images } from '../../data/images'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { PanoramaViewer } from '../ui/PanoramaViewer'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Visite virtuelle 360° — charcoal section, the viewer runs the full container width.
export function PanoramaTour() {
  const { t } = useLang()
  return (
    <section
      id="visite"
      aria-labelledby="visite-title"
      className="section-y bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-7">
            <Eyebrow>{t('tour.eyebrow')}</Eyebrow>
            <SectionTitle id="visite-title" accent={t('tour.accent')} className="mt-8">
              {t('tour.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="max-w-[36ch] text-body-l font-light text-alabaster/85 lg:col-span-4 lg:col-start-9">
            {t('tour.body')}
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20">
          <PanoramaViewer
            image={images.panorama}
            label={t('tour.label')}
            hint={t('tour.hint')}
            description={t('tour.keys')}
          />
          <p className="mt-4 text-meta text-alabaster/60">{t('tour.caption')}</p>
        </Reveal>
      </div>
    </section>
  )
}
