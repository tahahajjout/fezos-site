import { useLang } from '../../i18n'
import { Stars } from './Stars'

// English uses curly quotes; French and Arabic use guillemets.
const QUOTES = { en: ['“', '”'], fr: ['« ', ' »'], ar: ['« ', ' »'] }

export function ReviewCard({ author, quote, rating, className = '' }) {
  const { t, l, lang } = useLang()
  const [open, close] = QUOTES[lang]
  return (
    <figure className={`flex h-full flex-col border-t border-sand pt-8 ${className}`}>
      <Stars rating={rating} />
      <blockquote className="mt-6 font-display text-h3 font-light italic">
        {open}
        {l(quote)}
        {close}
      </blockquote>
      <figcaption className="mt-auto pt-8 text-meta">
        <span className="font-medium">{author}</span>
        <span className="text-stone"> · {t('common.googleReview')}</span>
      </figcaption>
    </figure>
  )
}
