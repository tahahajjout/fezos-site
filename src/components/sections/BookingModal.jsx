import { useId, useState } from 'react'
import { packs, serviceCategories } from '../../data/salon'
import { useLang } from '../../i18n'
import { bookables, bookingRange, firstOpenDate, slotsFor, validateBooking } from '../../lib/booking'
import { formatTime } from '../../lib/format'
import { bookingMessage, whatsappUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Field, control } from '../ui/Field'
import { Modal } from '../ui/Modal'

const ORDER = ['service', 'date', 'time', 'name', 'phone', 'note', 'consent'] // focus the first error

// Booking modal (CLAUDE.md §6.16): validated form → prefilled WhatsApp message. No backend.
export function BookingModal({ booking, onClose }) {
  const { t } = useLang()
  return (
    <Modal open={booking !== null} onClose={onClose} title={t('booking.title')}>
      {booking && <BookingForm initialService={booking.serviceId ?? ''} onDone={onClose} />}
    </Modal>
  )
}

function BookingForm({ initialService, onDone }) {
  const { t, l, lang } = useLang()
  const uid = useId()
  const [v, setV] = useState(() => ({
    service: initialService,
    date: firstOpenDate(),
    time: '',
    name: '',
    phone: '',
    note: '',
    consent: false,
  }))
  const [errors, setErrors] = useState({})
  const slots = slotsFor(v.date)
  const range = bookingRange()

  const set = (key, value) => {
    setV((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'date' && !slotsFor(value).includes(prev.time)) next.time = '' // keep time only if still valid
      return next
    })
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }
  // Shared props for each control: id, value, change handler, error wiring.
  const field = (key) => ({
    id: `${uid}-${key}`,
    name: key,
    value: v[key],
    onChange: (e) => set(key, e.target.value),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${uid}-${key}-error` : undefined,
  })
  const err = (key) => errors[key] && t(`booking.errors.${errors[key]}`)

  function submit(e) {
    e.preventDefault()
    const found = validateBooking(v)
    setErrors(found)
    const first = ORDER.find((k) => found[k])
    if (first) return document.getElementById(`${uid}-${first}`)?.focus()

    const item = bookables.find((b) => b.id === v.service)
    const url = whatsappUrl(bookingMessage({ ...v, serviceName: l(item.name) }, lang))
    const win = window.open(url, '_blank')
    if (win) win.opener = null
    else window.location.href = url // popup blocked: go there directly
    onDone()
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      <Field id={`${uid}-service`} label={t('booking.service')} error={err('service')} className="sm:col-span-2">
        <select {...field('service')} className={control}>
          <option value="">{t('booking.choose')}</option>
          {serviceCategories.map((c) => (
            <optgroup key={c.id} label={l(c.label)}>
              {c.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {l(s.name)}
                </option>
              ))}
            </optgroup>
          ))}
          <optgroup label={t('booking.packs')}>
            {packs.map((p) => (
              <option key={p.id} value={p.id}>
                {l(p.name)}
              </option>
            ))}
          </optgroup>
        </select>
      </Field>

      <Field id={`${uid}-date`} label={t('booking.date')} error={err('date')}>
        <input type="date" min={range.min} max={range.max} {...field('date')} className={control} />
      </Field>

      <Field id={`${uid}-time`} label={t('booking.time')} error={err('time')}>
        <select {...field('time')} disabled={!slots.length} className={`${control} disabled:opacity-60`}>
          <option value="">{!v.date ? t('booking.pickDate') : slots.length ? t('booking.chooseTime') : t('booking.noSlots')}</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {formatTime(s, lang)}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${uid}-name`} label={t('booking.name')} error={err('name')}>
        <input type="text" autoComplete="given-name" maxLength={50} {...field('name')} className={control} />
      </Field>

      <Field id={`${uid}-phone`} label={t('booking.phone')} optional={t('booking.optional')} error={err('phone')}>
        <input type="tel" inputMode="tel" autoComplete="tel" dir="ltr" {...field('phone')} className={`${control} text-start`} />
      </Field>

      <Field
        id={`${uid}-note`}
        label={t('booking.note')}
        optional={t('booking.optional')}
        error={err('note')}
        className="sm:col-span-2"
      >
        <textarea rows={3} maxLength={300} {...field('note')} className={`${control} resize-y`} />
      </Field>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-meta">
          <input
            type="checkbox"
            id={`${uid}-consent`}
            checked={v.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-0.5 size-5 shrink-0 accent-charcoal"
          />
          {t('booking.consent')}
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} className="mt-2 text-meta text-champagne-deep">
            {err('consent')}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" variant="solid" className="w-full sm:w-auto">
          {t('booking.submit')}
        </Button>
        <p className="mt-4 text-meta text-stone">{t('booking.footnote')}</p>
      </div>
    </form>
  )
}
