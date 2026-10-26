import { team } from '../../data/salon'
import { useLang } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { TextLink } from '../ui/TextLink'

// L'équipe — typographic: big serif names on hairlines (no stock faces standing in for real people).
export function Team({ onBook }) {
  const { t, l } = useLang()
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="section-y bg-linen">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:col-span-4">
          <RevealItem>
            <Eyebrow>{t('team.eyebrow')}</Eyebrow>
            <SectionTitle id="equipe-title" accent={t('team.accent')} className="mt-8">
              {t('team.title')}
            </SectionTitle>
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[32ch] text-body-l font-light">
            {t('team.body')}
          </RevealItem>
        </Reveal>

        <Reveal as="ul" stagger className="lg:col-span-7 lg:col-start-6">
          {team.map((m) => (
            <RevealItem as="li" key={m.id} className="border-t border-sand py-10 last:border-b lg:py-14">
              <p className="eyebrow">{l(m.role)}</p>
              <h3 className="mt-5 font-display text-h2 font-light">{m.name}</h3>
              <p className="mt-5 max-w-[52ch] text-stone">{l(m.text)}</p>
              {m.serviceId && (
                <TextLink onClick={() => onBook(m.serviceId)} className="mt-6">
                  {t('team.bookWith', { name: m.name })}
                </TextLink>
              )}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
