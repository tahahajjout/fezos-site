import { useLang } from '../../i18n'
import { formatDuration, formatPrice } from '../../lib/format'
import { Arrow } from './Arrow'

const leader = 'min-w-6 flex-1 border-b border-dotted border-stone/40'

// Name ····· duration ····· price ↗ — the whole row books that service.
export function PriceRow({ service, onSelect }) {
  const { t, l, lang } = useLang()
  const duration = formatDuration(service.duration, lang)
  return (
    <li className="border-b border-sand">
      <button type="button" onClick={() => onSelect(service.id)} className="group block w-full py-6 text-start">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="basis-full font-display text-h3 transition-colors duration-300 group-hover:text-champagne-deep sm:basis-auto">
            <span className="sr-only">{t('prices.bookSr')}</span>
            {l(service.name)}
          </span>
          {duration && (
            <>
              <span aria-hidden="true" className={`hidden sm:block ${leader}`} />
              <span className="whitespace-nowrap text-meta text-stone">{duration}</span>
            </>
          )}
          <span aria-hidden="true" className={leader} />
          <span className="price whitespace-nowrap">{formatPrice(service.price, lang)}</span>
          <Arrow className="self-center text-stone group-hover:text-charcoal" />
        </span>
        {service.description && (
          <span className="mt-2 block max-w-[60ch] text-meta text-stone">{l(service.description)}</span>
        )}
      </button>
    </li>
  )
}
