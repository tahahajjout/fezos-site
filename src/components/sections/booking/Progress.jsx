import { useLang } from '../../../i18n'

// The three steps as gold lines that fill in turn; a finished step can be clicked to go back.
export function Progress({ steps, step, onGo }) {
  const { t } = useLang()
  return (
    <>
      <ol className="mt-6 flex gap-3 px-6 lg:px-12">
        {steps.map((s, i) => (
          <li key={s.id} className="flex-1">
            <button
              type="button"
              disabled={i >= step}
              onClick={() => onGo(i)}
              aria-current={i === step ? 'step' : undefined}
              className="block w-full text-start disabled:cursor-default"
            >
              <span className="relative block h-px overflow-hidden bg-sand">
                <span
                  className={`absolute inset-0 origin-left bg-champagne transition-transform duration-700 ease-lux rtl:origin-right ${i <= step ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </span>
              <span className={`mt-3 block text-meta ${i === step ? 'text-charcoal' : 'text-stone'}`}>{t(`booking.steps.${s.id}`)}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        {t('booking.stepOf', { n: step + 1, total: steps.length })}
      </p>
    </>
  )
}
