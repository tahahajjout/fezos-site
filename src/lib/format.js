import { localeOf, translate } from '../i18n/dicts.js'

const UNITS = { fr: ['min', 'h'], en: ['min', 'h'], ar: ['د', 'س'] }
// A Sunday at noon UTC: day names are read off it, so no hand-written weekday lists.
const SUNDAY = Date.UTC(2026, 9, 18, 12)
const noonUtc = (iso) => new Date(`${iso}T12:00:00Z`)

/** 780 → "780 DH" / "780 MAD" / "780 درهم"; null → "Sur demande". */
export function formatPrice(price, lang = 'fr') {
  if (price == null) return translate(lang, 'common.onRequest')
  return `${new Intl.NumberFormat(localeOf(lang)).format(price)} ${translate(lang, 'common.currency')}`
}

/** 45 → "45 min", 180 → "3 h", 75 → "1 h 15", null → "". */
export function formatDuration(min, lang = 'fr') {
  if (min == null) return ''
  const [mn, hr] = UNITS[lang] ?? UNITS.fr
  const h = Math.floor(min / 60)
  const m = min % 60
  if (!h) return `${m} ${mn}`
  return m ? `${h} ${hr} ${String(m).padStart(2, '0')}` : `${h} ${hr}`
}

/** "20:00" → "20h" / "10h30" in French, "20:00" elsewhere. */
export const formatTime = (hhmm, lang = 'fr') => (lang === 'fr' ? hhmm.replace(':', 'h').replace(/h00$/, 'h') : hhmm)

/** 0–6 (Sunday first, like Date#getDay) → "Lundi" / "Monday" / "الإثنين". */
export function dayName(day, lang = 'fr') {
  const name = new Intl.DateTimeFormat(localeOf(lang), { weekday: 'long', timeZone: 'UTC' }).format(
    SUNDAY + day * 86_400_000,
  )
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/** "2026-10-20" → { weekday: 'mar.', day: '20', month: 'oct.' } for a calendar tile. */
export function dayParts(iso, lang = 'fr') {
  const part = (opts) => new Intl.DateTimeFormat(localeOf(lang), { ...opts, timeZone: 'UTC' }).format(noonUtc(iso))
  return { weekday: part({ weekday: 'short' }), day: part({ day: 'numeric' }), month: part({ month: 'short' }) }
}

/** "2026-10-20" → "mardi 20 octobre" (long) or "20 octobre" (short). */
export function formatDate(iso, lang = 'fr', { weekday = true } = {}) {
  return new Intl.DateTimeFormat(localeOf(lang), {
    ...(weekday && { weekday: 'long' }),
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(noonUtc(iso))
}
