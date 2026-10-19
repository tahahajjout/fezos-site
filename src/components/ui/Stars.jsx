import { Star } from 'lucide-react'

export function Stars({ rating = 5, className = '' }) {
  return (
    <span role="img" aria-label={`${rating} sur 5`} className={`inline-flex gap-1 text-champagne ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} strokeWidth={1.25} aria-hidden="true" className={i < rating ? 'fill-current' : ''} />
      ))}
    </span>
  )
}
