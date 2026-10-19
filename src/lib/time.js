import { hours, salon } from '../data/salon.js'

const parts = new Intl.DateTimeFormat('en-GB', {
  timeZone: salon.timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  weekday: 'short',
  hourCycle: 'h23',
})
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Wall-clock in Fès, whatever the visitor's own time zone. */
export function salonNow(date = new Date()) {
  const p = Object.fromEntries(parts.formatToParts(date).map(({ type, value }) => [type, value]))
  return {
    day: WEEKDAYS.indexOf(p.weekday),
    minutes: Number(p.hour) * 60 + Number(p.minute),
    iso: `${p.year}-${p.month}-${p.day}`,
  }
}

/** { open, today: {day, open, close} } for the salon's current day. */
export function openStatus(date = new Date()) {
  const now = salonNow(date)
  const today = hours[now.day]
  const open = now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)
  let label
  if (open) label = `Ouvert · jusqu’à ${frenchTime(today.close)}`
  else if (now.minutes < toMinutes(today.open)) label = `Fermé · ouvre à ${frenchTime(today.open)}`
  else label = `Fermé · ouvre demain à ${frenchTime(hours[(now.day + 1) % 7].open)}`
  return { open, today, day: now.day, label }
}

/** "20:00" → "20h", "10:30" → "10h30" */
export const frenchTime = (hhmm) => hhmm.replace(':', 'h').replace(/h00$/, 'h')

/** Offer runs from startsAt to endsAt inclusive, in salon time. */
export function isOfferActive(offer, date = new Date()) {
  const { iso } = salonNow(date)
  return Boolean(offer) && iso >= offer.startsAt && iso <= offer.endsAt
}
