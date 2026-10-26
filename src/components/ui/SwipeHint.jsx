import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLang } from '../../i18n'

const pad = (n) => String(n).padStart(2, '0')

// Cue under a horizontal swipe row: "01 / 04", a hairline that fills as you go, and "Glissez →".
// Decorative (aria-hidden): the cards themselves stay a normal, readable list.
export function SwipeHint({ trackRef, count, className = '' }) {
  const { t } = useLang()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      // abs(): in RTL scrollLeft runs negative
      setIndex(max > 0 ? Math.round((Math.abs(el.scrollLeft) / max) * (count - 1)) : 0)
    }
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [trackRef, count])

  return (
    <div aria-hidden="true" className={`mt-8 flex items-center gap-4 text-meta text-stone ${className}`}>
      <span className="tabular-nums">
        <span className="font-display text-h3 text-charcoal">{pad(index + 1)}</span> / {pad(count)}
      </span>
      <span className="relative h-px flex-1 bg-sand">
        <span
          className="absolute inset-0 origin-left bg-charcoal transition-transform duration-500 ease-lux rtl:origin-right"
          style={{ transform: `scaleX(${(index + 1) / count})` }}
        />
      </span>
      <span className="inline-flex items-center gap-2 text-eyebrow font-medium uppercase text-charcoal">
        {t('common.swipe')}
        <ArrowRight size={16} strokeWidth={1.25} className="animate-nudge rtl:-scale-x-100" />
      </span>
    </div>
  )
}
