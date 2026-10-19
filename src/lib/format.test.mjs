import assert from 'node:assert/strict'
import { formatDuration, formatPrice } from './format.js'

assert.equal(formatPrice(780), '780 DH')
assert.equal(formatPrice(1500).replace(/\s/g, ' '), '1 500 DH')
assert.equal(formatPrice(null), 'Sur demande')
assert.equal(formatDuration(45), '45 min')
assert.equal(formatDuration(180), '3 h')
assert.equal(formatDuration(75), '1 h 15')
assert.equal(formatDuration(65), '1 h 05')
assert.equal(formatDuration(null), '')
console.log('format OK')
