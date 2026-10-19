import { useId, useRef } from 'react'

const KEYS = { ArrowRight: 1, ArrowLeft: -1 }

/** Accessible tabs (WAI-ARIA pattern): arrows/Home/End move focus + selection. */
export function Tabs({ tabs, value, onChange, label, className = '', children }) {
  const id = useId()
  const refs = useRef([])

  function onKeyDown(e, i) {
    let next
    if (e.key in KEYS) next = (i + KEYS[e.key] + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex gap-5 overflow-x-auto border-b border-sand sm:gap-8">
        {tabs.map((tab, i) => {
          const selected = tab.id === value
          return (
            <button
              key={tab.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative min-h-11 shrink-0 pb-4 pt-2 text-meta font-medium uppercase tracking-wider transition-colors sm:tracking-label duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-champagne after:transition-transform after:duration-500 after:ease-lux ${
                selected ? 'text-charcoal after:scale-x-100' : 'text-stone after:scale-x-0 hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${value}`} tabIndex={0}>
        {children}
      </div>
    </div>
  )
}
