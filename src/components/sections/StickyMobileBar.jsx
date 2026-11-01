import { CalendarHeart, MapPin, Phone } from 'lucide-react'
import { salon } from '../../data/salon'
import { useLang } from '../../i18n'
import { linkProps } from '../../lib/links'

const item = 'flex min-h-16 flex-col items-center justify-center gap-1 text-meta active:bg-charcoal-soft'
const icon = { size: 20, strokeWidth: 1.25, 'aria-hidden': true, className: 'text-champagne' }

// Phones/tablets only: the three things a visitor needs, always one thumb away.
export function StickyMobileBar({ onBook }) {
  const { t } = useLang()
  return (
    <nav
      aria-label={t('bar.label')}
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 stay-dark bg-charcoal pb-[env(safe-area-inset-bottom)] text-alabaster lg:hidden"
    >
      <a href={`tel:${salon.phone.tel}`} className={item}>
        <Phone {...icon} />
        {t('bar.call')}
      </a>
      <a href={salon.mapsUrl} {...linkProps(salon.mapsUrl)} className={item}>
        <MapPin {...icon} />
        {t('bar.directions')}
      </a>
      <button type="button" onClick={() => onBook()} className={item}>
        <CalendarHeart {...icon} />
        {t('bar.book')}
      </button>
    </nav>
  )
}
