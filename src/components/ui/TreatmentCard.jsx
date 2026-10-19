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
      {/* 40px gold rule; a full-width line grows over it on hover (transform only, no layout) */}
      <span aria-hidden="true" className="relative mt-4 block h-px">
        <span className="gold-rule absolute start-0 top-0" />
        <span className="absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-lux group-hover:scale-x-100" />
      </span>
      <p className="mt-4 max-w-[40ch] text-stone">{description}</p>
      <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-meta font-medium uppercase tracking-label">
        Découvrir <Arrow />
      </span>
    </a>
  )
}
