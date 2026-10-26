import { hours, packs, serviceCategories } from '../data/salon.js'
import { salonNow, toMinutes } from './time.js'

export const SLOT = 30 // minutes between start times
export const LEAD = 60 // same-day bookings start at least this long from now
export const MAX_DAYS = 90 // how far ahead the calendar opens

/** Every bookable item (single services and packs) and their ids. The form only accepts these. */
export const bookables = [...serviceCategories.flatMap((c) => c.services), ...packs]
export const BOOKABLE_IDS = new Set(bookables.map((b) => b.id))

const pad = (n) => String(n).padStart(2, '0')
const hhmm = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`
const isoPlus = (iso, days) => new Date(Date.parse(`${iso}T12:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10)

/** Today in salon time, and the last bookable date. */
export function bookingRange(date = new Date()) {
  const { iso } = salonNow(date)
  return { min: iso, max: isoPlus(iso, MAX_DAYS) }
}

/**
 * 30-min start times for a day ("HH:MM"), from opening to the last slot before closing.
 * Past days → none; today → only from now + LEAD, rounded up to the next slot.
 */
export function slotsFor(iso, date = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return []
  const now = salonNow(date)
  if (iso < now.iso) return []
  const { open, close } = hours[new Date(`${iso}T12:00:00Z`).getUTCDay()]
  let start = toMinutes(open)
  if (iso === now.iso) start = Math.max(start, Math.ceil((now.minutes + LEAD) / SLOT) * SLOT)
  const slots = []
  for (let m = start; m <= toMinutes(close) - SLOT; m += SLOT) slots.push(hhmm(m))
  return slots
}

/** First date (from today) that still has a free slot — the form's default. */
export function firstOpenDate(date = new Date()) {
  const { min } = bookingRange(date)
  return slotsFor(min, date).length ? min : isoPlus(min, 1)
}

/** The next `n` dates (from today) that still have a free slot — the booking day strip. */
export function openDays(n, date = new Date()) {
  const { min, max } = bookingRange(date)
  const days = []
  for (let iso = min; iso <= max && days.length < n; iso = isoPlus(iso, 1)) {
    if (slotsFor(iso, date).length) days.push(iso)
  }
  return days
}

const NAME =/^[\p{L}][\p{L}\p{M} '’-]{0,49}$/u

/** Normalises a phone to digits (drops spaces, dots, dashes, brackets, a leading +). */
export const cleanPhone = (raw) => raw.replace(/[\s.\-()]/g, '').replace(/^\+/, '')

/** Field → error key (see i18n booking.errors). Empty object = valid. */
export function validateBooking(v, date = new Date()) {
  const errors = {}
  const { max } = bookingRange(date)
  if (!BOOKABLE_IDS.has(v.service)) errors.service = 'service'
  if (!v.date || v.date > max || !slotsFor(v.date, date).length) errors.date = 'date'
  else if (!slotsFor(v.date, date).includes(v.time)) errors.time = 'time'
  if (!NAME.test(v.name.trim())) errors.name = 'name'
  if (v.phone.trim() && !/^\d{9,15}$/.test(cleanPhone(v.phone))) errors.phone = 'phone'
  if (v.note.length > 300) errors.note = 'note'
  if (!v.consent) errors.consent = 'consent'
  return errors
}
