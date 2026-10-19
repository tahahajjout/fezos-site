import { hours, salon } from '../../data/salon'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { frenchTime } from '../../lib/time'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { TextLink } from '../ui/TextLink'

const WEEK = [1, 2, 3, 4, 5, 6, 0] // display Monday first; indices into `hours`

// Localisation & horaires — details + live status left, warm-toned map right.
export function Location() {
  const status = useOpenStatus()
  const { street, postalCode, city } = salon.address

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-alabaster">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal stagger className="lg:col-span-5">
          <RevealItem>
            <Eyebrow>Nous trouver</Eyebrow>
            <SectionTitle id="contact-title" accent="Fès." className="mt-8">
              Votre lounge à
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
                {status.open ? 'Ouvert maintenant' : 'Fermé'}
              </p>
            </div>
            <table className="mt-6 w-full max-w-sm text-start">
              <caption className="sr-only">Horaires d’ouverture</caption>
              <tbody>
                {WEEK.map((d) => {
                  const today = d === status.day
                  return (
                    <tr key={d} className={`border-b border-sand ${today ? 'text-charcoal' : 'text-stone'}`}>
                      <th scope="row" className={`py-3 text-start font-normal ${today ? 'font-medium' : ''}`}>
                        {hours[d].day}
                        {today && <span className="ms-2 text-meta text-champagne-deep">aujourd’hui</span>}
                      </th>
                      <td className={`py-3 text-end tabular-nums ${today ? 'font-medium' : ''}`}>
                        {frenchTime(hours[d].open)} – {frenchTime(hours[d].close)}
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
            <Button href={salon.mapsUrl}>Itinéraire</Button>
            <Button variant="whatsapp">WhatsApp</Button>
          </RevealItem>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <iframe
            title={`Carte : ${salon.name}, ${street}, ${city}`}
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
