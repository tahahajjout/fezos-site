import { Star } from 'lucide-react'
import { useLang } from '../../i18n'

export function Stars({ rating = 5, className = '' }) {
  const { t } = useLang()
  return (
    <span role="img" aria-label={t('common.outOf5', { n: rating })} className={`inline-flex gap-1 text-champagne ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} strokeWidth={1.25} aria-hidden="true" className={i < rating ? 'fill-current' : ''} />
      ))}
    </span>
  )
}
