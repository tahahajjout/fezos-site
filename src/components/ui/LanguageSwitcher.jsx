import { LANGS, useLang } from '../../i18n'

// FR / EN / AR. Each button names its language in that language for screen readers.
export function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t('common.language')} className={`flex items-center ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-label={l.name}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
          className={`inline-flex min-h-11 min-w-9 items-center justify-center text-meta font-medium tracking-label transition-colors duration-300 ${
            l.code === lang ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
