import { useState } from 'react'
import { packs, serviceCategories } from '../../../data/salon'
import { useLang } from '../../../i18n'
import { formatDuration, formatPrice } from '../../../lib/format'
import { Tabs } from '../../ui/Tabs'

/** Radio option styled as a row: gold dot, name and duration, price. Shared with the moment step's look. */
function Option({ name, item, checked, onChange }) {
  const { l, lang } = useLang()
  return (
    <label className="group relative -mx-3 flex cursor-pointer items-center gap-4 border-b border-sand px-3 py-4 transition-colors duration-300 hover:bg-linen/70 has-checked:bg-linen">
      <input type="radio" name={name} value={item.id} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className="grid size-5 shrink-0 place-items-center rounded-full border border-stone/50 transition-colors group-has-checked:border-champagne-deep group-has-focus-visible:outline-1 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-champagne-deep"
      >
        <span className="size-2 scale-0 rounded-full bg-champagne-deep transition-transform duration-300 ease-lux group-has-checked:scale-100" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-price leading-tight">{l(item.name)}</span>
        {item.duration && <span className="mt-1 block text-meta text-stone">{formatDuration(item.duration, lang)}</span>}
      </span>
      <span className="price whitespace-nowrap">{formatPrice(item.price, lang)}</span>
    </label>
  )
}

const groupOf = (id) =>
  packs.some((p) => p.id === id) ? 'packs' : serviceCategories.find((c) => c.services.some((s) => s.id === id))?.id

// Step 1 — the treatment: category tabs (plus packs), then the choices as radio rows.
export function StepService({ id, value, onChange, error }) {
  const { t } = useLang()
  const [tab, setTab] = useState(() => groupOf(value) ?? serviceCategories[0].id)
  const packsLabel = t('booking.packs')
  const tabs = [...serviceCategories, { id: 'packs', label: { fr: packsLabel, en: packsLabel, ar: packsLabel } }]
  const items = tab === 'packs' ? packs : serviceCategories.find((c) => c.id === tab).services

  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={error ? `${id}-error` : undefined} className="min-w-0 outline-none">
      <legend className="sr-only">{t('booking.service')}</legend>
      <Tabs label={t('booking.service')} tabs={tabs} value={tab} onChange={setTab}>
        <div className="mt-2">
          {items.map((item) => (
            <Option key={item.id} name="service" item={item} checked={value === item.id} onChange={() => onChange(item.id)} />
          ))}
        </div>
      </Tabs>
      {error && (
        <p id={`${id}-error`} className="mt-4 text-meta text-champagne-deep">
          {error}
        </p>
      )}
    </fieldset>
  )
}
