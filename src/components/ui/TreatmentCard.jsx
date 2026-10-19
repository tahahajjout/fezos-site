import { Arrow } from './Arrow'
import { ImageFrame } from './ImageFrame'

// Numbered editorial card: 4:5 image, gold numeral, serif title with a hairline that extends on hover.
export function TreatmentCard({ number, title, description, image, href, onClick, className = '' }) {
  return (
    <a href={href} onClick={onClick} className={`group block ${className}`}>
      <ImageFrame image={image} ratio={[4, 5]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-display text-price italic text-champagne-deep">{number}</span>
        <h3 className="text-h3">{title}</h3>
      </div>
      <span
        aria-hidden="true"
        className="mt-4 block h-px w-10 bg-champagne transition-[width] duration-700 ease-lux group-hover:w-full"
      />
      <p className="mt-4 max-w-[40ch] text-stone">{description}</p>
      <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-meta font-medium uppercase tracking-label">
        Découvrir <Arrow />
      </span>
    </a>
  )
}
