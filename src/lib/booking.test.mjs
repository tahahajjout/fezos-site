import assert from 'node:assert/strict'
import { bookingRange, firstOpenDate, openDays, slotsFor, validateBooking } from './booking.js'
import { bookingMessage, whatsappUrl } from './whatsapp.js'

const at = (iso) => new Date(iso)
const MON_9AM = at('2026-10-19T08:00:00Z') // Monday 09:00 in Fès

// Monday 10:30–20:30 → first 10:30, last start 20:00; Tuesday closes 20:00 → last 19:30
const mon = slotsFor('2026-10-19', MON_9AM)
assert.equal(mon[0], '10:30')
assert.equal(mon.at(-1), '20:00')
assert.equal(mon.length, 20)
assert.equal(slotsFor('2026-10-20', MON_9AM).at(-1), '19:30')
// Today at 15:10 → from 16:30 (now + 60 min, rounded up to the half hour)
assert.equal(slotsFor('2026-10-19', at('2026-10-19T14:10:00Z'))[0], '16:30')
// Past day, garbage, late evening
assert.deepEqual(slotsFor('2026-10-18', MON_9AM), [])
assert.deepEqual(slotsFor('nope', MON_9AM), [])
assert.deepEqual(slotsFor('2026-10-19', at('2026-10-19T19:00:00Z')), []) // 20:00, nothing left today
assert.equal(firstOpenDate(at('2026-10-19T19:00:00Z')), '2026-10-20')
assert.equal(bookingRange(MON_9AM).max, '2027-01-17')

const ok = { service: 'biab', date: '2026-10-20', time: '15:00', name: 'Fatima Zohra', phone: '06 70 85 35 30', note: '', consent: true }
assert.deepEqual(validateBooking(ok, MON_9AM), {})
assert.deepEqual(validateBooking({ ...ok, name: 'آمنة' }, MON_9AM), {}) // Arabic names are letters too
assert.deepEqual(validateBooking({ ...ok, phone: '' }, MON_9AM), {}) // phone is optional
assert.equal(validateBooking({ ...ok, service: 'laser' }, MON_9AM).service, 'service')
assert.equal(validateBooking({ ...ok, date: '2026-10-18' }, MON_9AM).date, 'date')
assert.equal(validateBooking({ ...ok, date: '2027-06-01' }, MON_9AM).date, 'date') // beyond 90 days
assert.equal(validateBooking({ ...ok, time: '20:00' }, MON_9AM).time, 'time') // Tuesday closes at 20:00
assert.equal(validateBooking({ ...ok, time: '15:15' }, MON_9AM).time, 'time')
assert.equal(validateBooking({ ...ok, name: '<script>' }, MON_9AM).name, 'name')
assert.equal(validateBooking({ ...ok, name: 'x'.repeat(51) }, MON_9AM).name, 'name')
assert.equal(validateBooking({ ...ok, phone: '06-70-AB' }, MON_9AM).phone, 'phone')
assert.equal(validateBooking({ ...ok, note: 'x'.repeat(301) }, MON_9AM).note, 'note')
assert.equal(validateBooking({ ...ok, consent: false }, MON_9AM).consent, 'consent')

const msg = bookingMessage({ serviceName: 'BIAB', date: '2026-10-20', time: '15:00', name: ' Salma\n ', phone: '+212 6 70 85 35 30', note: 'Première\nfois' })
assert.equal(msg, 'Bonjour Fezo’s 🧡 Je souhaite réserver : BIAB — mardi 20 octobre à 15h. Prénom : Salma.\nTéléphone : 212670853530.\nNote : Première fois')
assert.ok(bookingMessage({ serviceName: 'BIAB', date: '2026-10-20', time: '15:00', name: 'Salma' }, 'en').startsWith('Hello Fezo’s 🧡 I would like to book: BIAB — Tuesday 20 October at 15:00.'))
const url = whatsappUrl('a & b?')
assert.equal(url, 'https://wa.me/212670853530?text=a%20%26%20b%3F')
assert.deepEqual(openDays(3, MON_9AM), ['2026-10-19', '2026-10-20', '2026-10-21'])
assert.deepEqual(openDays(2, at('2026-10-19T19:30:00Z')), ['2026-10-20', '2026-10-21']) // Monday 20:30: today is over
console.log('booking OK')
