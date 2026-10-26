import { useLang } from '../../../i18n'
import { Field, control } from '../../ui/Field'

// Step 3 — you: first name, optional phone and note, consent. `field(key)` wires id/value/errors.
export function StepDetails({ field, err, consent }) {
  const { t } = useLang()
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id={field('name').id} label={t('booking.name')} error={err('name')}>
        <input type="text" autoComplete="given-name" maxLength={50} {...field('name')} className={control} />
      </Field>
      <Field id={field('phone').id} label={t('booking.phone')} optional={t('booking.optional')} error={err('phone')}>
        <input type="tel" inputMode="tel" autoComplete="tel" dir="ltr" {...field('phone')} className={`${control} text-start`} />
      </Field>
      <Field id={field('note').id} label={t('booking.note')} optional={t('booking.optional')} error={err('note')} className="sm:col-span-2">
        <textarea rows={3} maxLength={300} {...field('note')} className={`${control} resize-y`} />
      </Field>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-meta">
          <input type="checkbox" {...consent} className="mt-0.5 size-5 shrink-0 accent-charcoal" />
          {t('booking.consent')}
        </label>
        {err('consent') && (
          <p id={`${consent.id}-error`} className="mt-2 text-meta text-champagne-deep">
            {err('consent')}
          </p>
        )}
      </div>
    </div>
  )
}
