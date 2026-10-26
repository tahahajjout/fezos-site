import { useMemo } from 'react'
import { useLang } from '../../../i18n'
import { bookingRange, openDays, slotsFor } from '../../../lib/booking'
import { dayParts, formatTime } from '../../../lib/format'

const label = 'text-meta font-medium uppercase tracking-label'
// A tile that turns charcoal when its hidden radio is checked.
const tile =
  'relative cursor-pointer border border-sand text-center transition-colors duration-300 hover:border-charcoal has-checked:border-charcoal has-checked:bg-charcoal has-checked:text-alabaster has-focus-visible:outline-1 has-focus-visible:outline-offset-2 has-focus-visible:outline-champagne-deep'

const PERIODS = [
  ['morning', (s) => s < '12:00'],
  ['afternoon', (s) => s >= '12:00' && s < '17:00'],
  ['evening', (s) => s >= '17:00'],
]

function Error({ id, children }) {
  return children ? (
    <p id={`${id}-error`} className="mt-3 text-meta text-champagne-deep">
      {children}
    </p>
  ) : null
}

// Step 2 — the moment: a strip of the next open days, then the free times grouped by part of day.
export function StepMoment({ ids, date, time, onDate, onTime, errors }) {
  const { t, lang } = useLang()
  const days = useMemo(() => openDays(14), [])
  const range = bookingRange()
  const slots = slotsFor(date)

  return (
    <div className="grid gap-10">
      <fieldset id={ids.date} tabIndex={-1} className="min-w-0 outline-none">
        <legend className={label}>{t('booking.day')}</legend>
        {/* phones: a swipe strip; desktop (no sideways wheel): wraps into a two-week grid */}
        <div className="-mx-6 mt-4 flex snap-x gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {days.map((iso) => {
            const d = dayParts(iso, lang)
            return (
              <label key={iso} className={`${tile} w-18 shrink-0 snap-start py-3`}>
                <input type="radio" name="date" value={iso} checked={date === iso} onChange={() => onDate(iso)} className="sr-only" />
                <span className="block text-meta capitalize opacity-70">{d.weekday}</span>
                <span className="block font-display text-h3 leading-tight">{d.day}</span>
                <span className="block text-meta opacity-70">{d.month}</span>
              </label>
            )
          })}
        </div>
        <label className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-meta text-stone">
          <span className="whitespace-nowrap">{t('booking.otherDate')}</span>
          <input
            type="date"
            min={range.min}
            max={range.max}
            value={days.includes(date) ? '' : date}
            onChange={(e) => onDate(e.target.value)}
            className="min-h-11 w-44 rounded-sharp border border-sand bg-linen px-3 py-2 text-meta text-charcoal transition-colors focus:border-charcoal"
          />
        </label>
        <Error id={ids.date}>{errors.date}</Error>
      </fieldset>

      <fieldset id={ids.time} tabIndex={-1} className="min-w-0 outline-none">
        <legend className={label}>{t('booking.time')}</legend>
        {!slots.length && <p className="mt-4 text-meta text-stone">{t('booking.noSlots')}</p>}
        {PERIODS.map(([period, inPeriod]) => {
          const list = slots.filter(inPeriod)
          if (!list.length) return null
          return (
            <div key={period} className="mt-5">
              <p className="text-meta text-stone">{t(`booking.periods.${period}`)}</p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {list.map((s) => (
                  <label key={s} className={`${tile} py-2.5 text-meta`}>
                    <input type="radio" name="time" value={s} checked={time === s} onChange={() => onTime(s)} className="sr-only" />
                    {formatTime(s, lang)}
                  </label>
                ))}
              </div>
            </div>
          )
        })}
        <Error id={ids.time}>{errors.time}</Error>
      </fieldset>
    </div>
  )
}
