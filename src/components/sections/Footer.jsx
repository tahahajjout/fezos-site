import { hours, nav, salon } from '../../data/salon'
import { frenchTime } from '../../lib/time'
import { TextLink } from '../ui/TextLink'

// Designed close: the name returns at full width. Extra bottom padding on phones clears the sticky bar.
export function Footer() {
  const { street, postalCode, city } = salon.address
  return (
    <footer className="bg-charcoal [&_.eyebrow]:text-champagne pb-[calc(6rem+env(safe-area-inset-bottom))] pt-20 text-alabaster lg:pb-10 lg:pt-28">
      <div className="container-site">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <p className="max-w-[30ch] text-body-l font-light text-alabaster/85 lg:col-span-4">
            Beauty Lounge à Fès. Coiffure, onglerie et soins visage, sur rendez-vous 7j/7.
          </p>

          <div className="text-alabaster/75 lg:col-span-3 lg:col-start-6">
            <p className="eyebrow">Contact</p>
            <address className="mt-4 not-italic">
              {street}
              <br />
              {postalCode} {city}
            </address>
            <a href={`tel:${salon.phone.tel}`} className="mt-3 inline-block hover:text-alabaster">
              {salon.phone.display}
            </a>
          </div>

          <div className="text-alabaster/75 lg:col-span-2">
            <p className="eyebrow">Horaires</p>
            <p className="mt-4">
              Lun {frenchTime(hours[1].open)}–{frenchTime(hours[1].close)}
              <br />
              Mar–Dim {frenchTime(hours[2].open)}–{frenchTime(hours[2].close)}
            </p>
          </div>

          <nav aria-label="Pied de page" className="lg:col-span-2">
            <p className="eyebrow">Suivre</p>
            <ul className="mt-2">
              <li>
                <TextLink href={salon.instagram.url}>Instagram</TextLink>
              </li>
              <li>
                <TextLink href={`https://wa.me/${salon.whatsapp}`}>WhatsApp</TextLink>
              </li>
              <li>
                <TextLink href={nav[0].href} arrow={false}>
                  Nos soins
                </TextLink>
              </li>
            </ul>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none font-display text-wordmark font-light italic text-alabaster lg:mt-28"
        >
          Fezo’s
        </p>

        <div className="mt-10 flex flex-col gap-2 border-t border-alabaster/15 pt-6 text-meta text-alabaster/60 lg:flex-row lg:justify-between">
          <p>© {new Date().getFullYear()} {salon.name}. Photos : Unsplash (images indicatives).</p>
          <p>Démo réalisée par Taha Hajjout — proposition de site web</p>
        </div>
      </div>
    </footer>
  )
}
