import { Pointer } from 'lucide-react'

const face = 'absolute inset-0 backface-hidden'
const SIDES = {
  // hinged on the spine: an end-side leaf turns on its start edge, a start-side leaf on its end edge
  end: 'inset-y-0 end-0 w-1/2 origin-left rtl:origin-right',
  start: 'inset-y-0 start-0 w-1/2 origin-right rtl:origin-left',
  full: 'inset-0 origin-left rtl:origin-right',
}

/** A two-faced sheet that GSAP rotates around the spine (rotateY). */
export function Leaf({ ref, side, front, back, style, className = '', ...rest }) {
  return (
    <div ref={ref} style={style} className={`absolute transform-3d ${SIDES[side]} ${className}`} {...rest}>
      <div className={face}>{front}</div>
      <div className={`${face} rotate-y-180`}>{back}</div>
    </div>
  )
}

/** Blank linen sheet for the riffle and the back of turning pages. */
export function BlankPage() {
  return (
    <div className="relative h-full border border-sand bg-linen">
      <span className="absolute inset-4 border border-sand/70 sm:inset-6" />
    </div>
  )
}

/** Front of the closed book: leather-dark board, darker spine, gold frame, and the "open me" cue. */
export function CoverFront({ eyebrow, hint }) {
  return (
    <div className="relative flex h-full flex-col items-center bg-charcoal-soft px-6 pt-16 text-alabaster sm:pt-24">
      <span className="absolute inset-y-0 start-0 w-3 bg-charcoal" />
      <span className="absolute inset-4 border border-champagne/40 sm:inset-6" />
      <span className="eyebrow text-champagne">{eyebrow}</span>
      <span className="gold-rule mt-5" />
      <span className="mt-8 font-display text-display font-light italic leading-none">Fezo’s</span>
      <span className="mt-4 text-eyebrow font-medium uppercase text-alabaster/70">Beauty Lounge · Fès</span>
      <span className="mt-auto mb-12 inline-flex items-center gap-3 text-eyebrow font-medium uppercase text-champagne sm:mb-16">
        <Pointer size={18} strokeWidth={1.25} aria-hidden="true" className="animate-tap" />
        {hint}
      </span>
    </div>
  )
}

/** Inside of the cover, seen once it has swung open. */
export function CoverBack() {
  return (
    <div className="relative h-full border border-sand bg-linen">
      <span className="absolute inset-4 border border-champagne/30 sm:inset-6" />
    </div>
  )
}
