import { hours, salon } from '../../data/salon'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { useLang } from '../../i18n'
import { dayName, formatTime } from '../../lib/format'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { TextLink } from '../ui/TextLink'

const WEEK = [1, 2, 3, 4, 5, 6, 0] // display Monday first; indices into `hours`

// Localisation & horaires — details + live status left, warm-toned map right.
export function Location() {
  const { t, l, lang } = useLang()
  const status = useOpenStatus()
  const { street, postalCode } = salon.address
  const city = l(salon.address.city)

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-alabaster">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:col-span-6">
          <RevealItem>
            <Eyebrow>{t('location.eyebrow')}</Eyebrow>
            <SectionTitle id="contact-title" accent={t('location.accent')} className="mt-8">
              {t('location.title')}
            </SectionTitle>
          </RevealItem>

          <RevealItem as="address" className="mt-10 text-body-l font-light not-italic">
            {street}
            <br />
            {postalCode} {city}
          </RevealItem>

          <RevealItem className="mt-10">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${status.open ? 'bg-champagne' : 'bg-stone/50'}`}
              />
              <p className="text-meta font-medium uppercase tracking-label">
                {t(status.open ? 'status.openNow' : 'status.closed')}
              </p>
            </div>
            <table className="mt-6 w-full max-w-sm text-start">
              <caption className="sr-only">{t('location.hours')}</caption>
              <tbody>
                {WEEK.map((d) => {
                  const today = d === status.day
                  return (
                    <tr key={d} className={`border-b border-sand ${today ? 'text-charcoal' : 'text-stone'}`}>
                      <th scope="row" className={`py-3 text-start font-normal ${today ? 'font-medium' : ''}`}>
                        {dayName(d, lang)}
                        {today && <span className="ms-2 text-meta text-champagne-deep">{t('common.today')}</span>}
                      </th>
                      <td className={`py-3 text-end tabular-nums ${today ? 'font-medium' : ''}`}>
                        {formatTime(hours[d].open, lang)} – {formatTime(hours[d].close, lang)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </RevealItem>

          <RevealItem className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <TextLink href={`tel:${salon.phone.tel}`} arrow={false}>
              {salon.phone.display}
            </TextLink>
            <TextLink href={salon.instagram.url}>{salon.instagram.handle}</TextLink>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-wrap gap-3">
            <Button href={salon.mapsUrl}>{t('location.directions')}</Button>
            <Button variant="whatsapp">{t('common.whatsapp')}</Button>
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <iframe
            title={t('location.map', { name: salon.name, address: `${street}, ${city}` })}
            src={salon.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-4/5 h-full w-full bg-linen grayscale sepia-25 lg:aspect-auto lg:min-h-[36rem]"
          />
        </Reveal>
      </div>
    </section>
  )
}
