import { formatPrice } from '../../lib/format'
import { TextLink } from './TextLink'

// Text-led card (no image) so Packs reads differently from the Treatments grid.
export function PackCard({ number, name, description, price, onBook, className = '' }) {
  return (
    <article
      className={`flex h-full flex-col border border-sand p-8 transition-colors duration-500 ease-lux hover:border-champagne lg:p-10 ${className}`}
    >
      <span className="font-display text-price italic text-champagne-deep">{number}</span>
      <h3 className="mt-10 text-h3">{name}</h3>
      <p className="mt-3 text-stone">{description}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-10">
        <span className="price">{formatPrice(price)}</span>
        <TextLink onClick={onBook} aria-label={`Réserver le ${name}`}>
          Réserver
        </TextLink>
      </div>
    </article>
  )
}
