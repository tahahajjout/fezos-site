import { useLang } from '../../i18n'
import { Book } from '../ui/book/Book'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Carte des soins — intro row, then the price list as a book of its own, centred below.
// `tab` lives in App so the treatment cards can open the book on a category.
export function PriceList({ tab, onBook }) {
  const { t } = useLang()
  return (
    <section id="carte" aria-labelledby="carte-title" className="section-y overflow-x-clip bg-alabaster">
      <div className="container-site">
        <Reveal stagger className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealItem className="lg:col-span-6">
            <Eyebrow>{t('prices.eyebrow')}</Eyebrow>
            <SectionTitle id="carte-title" accent={t('prices.accent')} className="mt-8">
              {t('prices.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[40ch] text-body-l font-light">{t('prices.body')}</p>
            <div className="mt-8">
              <Button variant="whatsapp">{t('prices.question')}</Button>
            </div>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24">
          <Book tab={tab} onBook={onBook} />
        </Reveal>
      </div>
    </section>
  )
}
