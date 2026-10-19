import { offer, serviceCategories } from '../../data/salon'
import { useLang } from '../../i18n'
import { formatDate, formatPrice } from '../../lib/format'
import { isOfferActive } from '../../lib/time'
import { Arrow } from '../ui/Arrow'
import { Container } from '../ui/Container'

const service = serviceCategories.flatMap((c) => c.services).find((s) => s.id === offer.serviceId)

// Thin champagne strip under the hero; hidden automatically after offer.endsAt.
export function OfferBanner({ onBook }) {
  const { t, l, lang } = useLang()
  if (!isOfferActive(offer)) return null

  return (
    <aside aria-label={t('offer.label')} className="bg-champagne-soft text-charcoal">
      <Container>
        <button
          type="button"
          onClick={() => onBook(offer.serviceId)}
          className="group flex min-h-14 w-full flex-wrap items-baseline gap-x-3 gap-y-1 py-4 text-start lg:justify-center"
        >
          <span className="eyebrow basis-full sm:basis-auto">{t('offer.label')}</span>
          <span aria-hidden="true" className="hidden text-stone sm:inline">
            —
          </span>
          <span>
            {l(service.name)} <span className="price">{formatPrice(offer.price, lang)}</span>
          </span>
          <span aria-hidden="true" className="hidden text-stone sm:inline">
            ·
          </span>
          <span className="text-meta text-stone">
            {t('offer.until', { date: formatDate(offer.endsAt, lang, { weekday: false }) })}
          </span>
          <Arrow className="self-center" />
        </button>
      </Container>
    </aside>
  )
}
