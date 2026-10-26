import { useLang } from '../../../i18n'
import { formatDuration, formatPrice } from '../../../lib/format'
import { Arrow } from '../Arrow'

const leader = 'min-w-4 flex-1 border-b border-dotted border-stone/40'

// One service, compact for a fixed-size page: name ··· price ↗, then duration · description.
function BookRow({ service, onBook, interactive }) {
  const { t, l, lang } = useLang()
  const meta = [formatDuration(service.duration, lang), service.description && l(service.description)]
  return (
    <li className="border-b border-sand last:border-0">
      <button
        type="button"
        tabIndex={interactive ? 0 : -1}
        onClick={() => onBook(service.id)}
        className="group block w-full py-2.5 text-start lg:py-3.5"
      >
        <span className="flex items-baseline gap-3">
          <span className="font-display text-price leading-tight transition-colors duration-300 group-hover:text-champagne-deep">
            <span className="sr-only">{t('prices.bookSr')}</span>
            {l(service.name)}
          </span>
          <span aria-hidden="true" className={leader} />
          <span className="price whitespace-nowrap">{formatPrice(service.price, lang)}</span>
          <Arrow className="self-center text-stone group-hover:text-charcoal" />
        </span>
        <span className="mt-1 line-clamp-2 block text-meta text-stone">{meta.filter(Boolean).join(' · ')}</span>
      </button>
    </li>
  )
}

/**
 * A linen page. `side` places the spine shading ('start' page → shade at its end edge).
 * `page` null renders the closing page (the tariff note). Non-interactive copies (inside
 * turning leaves) are hidden from assistive tech and keyboard.
 */
export function BookPage({ page, folio, side = 'end', onBook, interactive = true }) {
  const { t, l } = useLang()
  const spine = side === 'start' ? 'end-0 bg-linear-to-l rtl:bg-linear-to-r' : 'start-0 bg-linear-to-r rtl:bg-linear-to-l'
  return (
    <div
      aria-hidden={!interactive || undefined}
      inert={!interactive || undefined}
      className="relative flex h-full flex-col overflow-hidden border border-sand bg-linen px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-9"
    >
      <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 w-10 from-charcoal/8 to-transparent ${spine}`} />
      <p className="eyebrow">{t('prices.eyebrow')}</p>
      {page ? (
        <>
          <h3 className="mt-3 text-h3">
            {l(page.category.label)}
            {page.continued && <em className="accent"> — {t('prices.continued')}</em>}
          </h3>
          <ul className="mt-4 flex-1">
            {page.services.map((s) => (
              <BookRow key={s.id} service={s} onBook={onBook} interactive={interactive} />
            ))}
          </ul>
        </>
      ) : (
        <p className="m-auto max-w-[24ch] text-center font-display text-h3 italic text-stone">{t('prices.note')}</p>
      )}
      <p className="mt-3 text-center text-meta text-stone">— {folio} —</p>
    </div>
  )
}
