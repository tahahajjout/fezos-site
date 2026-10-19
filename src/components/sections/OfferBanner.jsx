import { offer } from '../../data/salon'
import { isOfferActive } from '../../lib/time'
import { Arrow } from '../ui/Arrow'
import { Container } from '../ui/Container'

// Thin champagne strip under the hero; hidden automatically after offer.endsAt.
export function OfferBanner({ onBook }) {
  if (!isOfferActive(offer)) return null

  return (
    <aside aria-label={offer.label} className="bg-champagne-soft text-charcoal">
      <Container>
        <button
          type="button"
          onClick={() => onBook(offer.serviceId)}
          className="group flex min-h-14 w-full flex-wrap items-baseline gap-x-3 gap-y-1 py-4 text-start lg:justify-center"
        >
          <span className="eyebrow basis-full sm:basis-auto">{offer.label}</span>
          <span aria-hidden="true" className="hidden text-stone sm:inline">
            —
          </span>
          <span>
            {offer.text} <span className="price">{offer.price}</span>
          </span>
          <span aria-hidden="true" className="hidden text-stone sm:inline">
            ·
          </span>
          <span className="text-meta text-stone">{offer.until}</span>
          <Arrow className="self-center" />
        </button>
      </Container>
    </aside>
  )
}
