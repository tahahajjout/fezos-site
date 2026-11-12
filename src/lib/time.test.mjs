import assert from 'node:assert/strict'
import { isOfferActive, openStatus, salonNow } from './time.js'

// Morocco is UTC+1 (no DST since 2018, except Ramadan UTC+0).
const at = (iso) => new Date(iso)
assert.deepEqual(salonNow(at('2026-10-19T09:00:00Z')), { day: 1, minutes: 600, iso: '2026-10-19' })
// Monday closed, Tuesday–Sunday 10:00–20:00
assert.equal(openStatus(at('2026-10-19T11:00:00Z')).open, false) // Mon 12:00, closed day
assert.equal(openStatus(at('2026-10-19T11:00:00Z')).today, null)
assert.deepEqual(openStatus(at('2026-10-19T11:00:00Z')).next, { inDays: 1, day: 2, time: '10:00' })
assert.equal(openStatus(at('2026-10-20T19:15:00Z')).open, false) // Tue 20:15
assert.equal(openStatus(at('2026-10-20T08:59:00Z')).open, false) // Tue 09:59
assert.equal(openStatus(at('2026-10-20T09:00:00Z')).open, true) // Tue 10:00
assert.deepEqual(openStatus(at('2026-10-20T07:00:00Z')).next, { inDays: 0, day: 2, time: '10:00' })
assert.deepEqual(openStatus(at('2026-10-20T20:00:00Z')).next, { inDays: 1, day: 3, time: '10:00' })
assert.deepEqual(openStatus(at('2026-10-18T20:00:00Z')).next, { inDays: 2, day: 2, time: '10:00' }) // Sun night → skips Monday
assert.equal(openStatus(at('2026-10-20T12:00:00Z')).next, null)
// Late UTC evening is already the next day in Fès
assert.equal(salonNow(at('2026-10-18T23:30:00Z')).iso, '2026-10-19')

const offer = { startsAt: '2026-10-05', endsAt: '2026-10-12' }
assert.equal(isOfferActive(offer, at('2026-10-12T22:00:00Z')), true) // 23:00 on the 12th, last day
assert.equal(isOfferActive(offer, at('2026-10-12T23:30:00Z')), false) // 00:30 on the 13th
assert.equal(isOfferActive(offer, at('2026-10-04T12:00:00Z')), false)
assert.equal(isOfferActive(null), false)
console.log('time OK')
