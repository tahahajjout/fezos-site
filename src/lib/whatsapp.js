import { salon } from '../data/salon.js'
import { translate } from '../i18n/dicts.js'
import { cleanPhone } from './booking.js'
import { formatDate, formatTime } from './format.js'

// User text goes into a single-line message: collapse control chars/newlines, trim.
const oneLine = (s) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim()

/** The booking message in the visitor's language (template from i18n booking.message). */
export function bookingMessage({ serviceName, date, time, name, phone = '', note = '' }, lang = 'fr') {
  const lines = [
    translate(lang, 'booking.message', {
      service: serviceName,
      date: formatDate(date, lang),
      time: formatTime(time, lang),
      name: oneLine(name),
    }),
  ]
  if (phone.trim()) lines.push(translate(lang, 'booking.messagePhone', { phone: cleanPhone(phone) }))
  if (note.trim()) lines.push(translate(lang, 'booking.messageNote', { note: oneLine(note) }))
  return lines.join('\n')
}

/** wa.me deep link; the text is only ever passed through encodeURIComponent. */
export const whatsappUrl = (text) => `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(text)}`
