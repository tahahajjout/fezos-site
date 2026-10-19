import { Stars } from './Stars'

export function ReviewCard({ author, quote, rating, className = '' }) {
  return (
    <figure className={`flex h-full flex-col border-t border-sand pt-8 ${className}`}>
      <Stars rating={rating} />
      <blockquote className="mt-6 font-display text-h3 font-light italic">« {quote} »</blockquote>
      <figcaption className="mt-auto pt-8 text-meta">
        <span className="font-medium">{author}</span>
        <span className="text-stone"> · Avis Google</span>
      </figcaption>
    </figure>
  )
}
