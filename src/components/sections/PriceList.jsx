import { m as motion, useReducedMotion } from 'motion/react'
import { serviceCategories } from '../../data/salon'
import { useLang } from '../../i18n'
import { DURATION, EASE } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { PriceRow } from '../ui/PriceRow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { Tabs } from '../ui/Tabs'

// Carte des soins — 4/7 split: the intro holds still (sticky) while the list scrolls.
// `tab` lives in App so the treatment cards can open a category.
export function PriceList({ tab, onTab, onBook }) {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const { services } = serviceCategories.find((c) => c.id === tab)

  return (
    <section id="carte" aria-labelledby="carte-title" className="section-y bg-alabaster">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <RevealItem>
            <Eyebrow>{t('prices.eyebrow')}</Eyebrow>
            <SectionTitle id="carte-title" accent={t('prices.accent')} className="mt-8">
              {t('prices.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[34ch] text-body-l font-light">
            {t('prices.body')}
          </RevealItem>
          <RevealItem className="mt-10">
            <Button variant="whatsapp">{t('prices.question')}</Button>
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Tabs label={t('prices.tabs')} tabs={serviceCategories} value={tab} onChange={onTab}>
            <motion.ul
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.reveal, ease: EASE }}
            >
              {services.map((s) => (
                <PriceRow key={s.id} service={s} onSelect={onBook} />
              ))}
            </motion.ul>
          </Tabs>
          <p className="mt-6 text-meta text-stone">{t('prices.note')}</p>
        </Reveal>
      </div>
    </section>
  )
}
