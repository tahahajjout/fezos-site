import { hours, nav, salon } from '../../data/salon'
import { useLang } from '../../i18n'
import { formatTime } from '../../lib/format'
import { TextLink } from '../ui/TextLink'

// Designed close: the name returns at full width. Extra bottom padding on phones clears the sticky bar.
export function Footer() {
  const { t, l, lang } = useLang()
  const { street, postalCode } = salon.address
  const time = (d, k) => formatTime(hours[d][k], lang)
  return (
    <footer className="bg-charcoal [&_.eyebrow]:text-champagne pb-[calc(6rem+env(safe-area-inset-bottom))] pt-20 text-alabaster lg:pb-10 lg:pt-28">
      <div className="container-site">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <p className="max-w-[30ch] text-body-l font-light text-alabaster/85 lg:col-span-4">
            {t('footer.line')}
          </p>

          <div className="text-alabaster/75 lg:col-span-3 lg:col-start-6">
            <p className="eyebrow">{t('footer.contact')}</p>
            <address className="mt-4 not-italic">
              {street}
              <br />
              {postalCode} {l(salon.address.city)}
            </address>
            <a href={`tel:${salon.phone.tel}`} className="mt-3 inline-block hover:text-alabaster">
              {salon.phone.display}
            </a>
          </div>

          <div className="text-alabaster/75 lg:col-span-2">
            <p className="eyebrow">{t('footer.hours')}</p>
            <p className="mt-4">
              {t('footer.monday')} {time(1, 'open')}–{time(1, 'close')}
              <br />
              {t('footer.tueSun')} {time(2, 'open')}–{time(2, 'close')}
            </p>
          </div>

          <nav aria-label={t('footer.nav')} className="lg:col-span-2">
            <p className="eyebrow">{t('footer.follow')}</p>
            <ul className="mt-2">
              <li>
                <TextLink href={salon.instagram.url}>Instagram</TextLink>
              </li>
              <li>
                <TextLink href={`https://wa.me/${salon.whatsapp}`}>{t('common.whatsapp')}</TextLink>
              </li>
              <li>
                <TextLink href={nav[0].href} arrow={false}>
                  {t('footer.services')}
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
          <p>
            © {new Date().getFullYear()} {salon.name}. {t('footer.photos')}
          </p>
          <p>{t('footer.credit')}</p>
        </div>
      </div>
    </footer>
  )
}
