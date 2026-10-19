const number = new Intl.NumberFormat('fr-FR')

/** 780 → "780 DH", 1500 → "1 500 DH", null → "Sur demande". */
export const formatPrice = (price) => (price == null ? 'Sur demande' : `${number.format(price)} DH`)

/** 45 → "45 min", 180 → "3 h", 75 → "1 h 15", null → "". */
export function formatDuration(min) {
  if (min == null) return ''
  const h = Math.floor(min / 60)
  const m = min % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`
}
