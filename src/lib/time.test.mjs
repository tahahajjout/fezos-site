import assert from 'node:assert/strict'
import { isOfferActive, openStatus, salonNow } from './time.js'

// Morocco is UTC+1 (no DST since 2018, except Ramadan UTC+0).
const at = (iso) => new Date(iso)
assert.deepEqual(salonNow(at('2026-10-19T09:00:00Z')), { day: 1, minutes: 600, iso: '2026-10-19' })
// Monday closes 20:30, other days 20:00
assert.equal(openStatus(at('2026-10-19T19:15:00Z')).open, true) // Mon 20:15
assert.equal(openStatus(at('2026-10-20T19:15:00Z')).open, false) // Tue 20:15
assert.equal(openStatus(at('2026-10-20T09:29:00Z')).open, false) // Tue 10:29
assert.equal(openStatus(at('2026-10-20T09:30:00Z')).open, true) // Tue 10:30
assert.deepEqual(openStatus(at('2026-10-20T08:00:00Z')).next, { tomorrow: false, time: '10:30' })
assert.deepEqual(openStatus(at('2026-10-20T20:00:00Z')).next, { tomorrow: true, time: '10:30' })
assert.equal(openStatus(at('2026-10-19T19:15:00Z')).next, null)
// Late UTC evening is already the next day in Fès
assert.equal(salonNow(at('2026-10-18T23:30:00Z')).iso, '2026-10-19')

const offer = { startsAt: '2026-10-05', endsAt: '2026-10-12' }
assert.equal(isOfferActive(offer, at('2026-10-12T22:00:00Z')), true) // 23:00 on the 12th, last day
assert.equal(isOfferActive(offer, at('2026-10-12T23:30:00Z')), false) // 00:30 on the 13th
assert.equal(isOfferActive(offer, at('2026-10-04T12:00:00Z')), false)
assert.equal(isOfferActive(null), false)
console.log('time OK')
