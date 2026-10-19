// Plain-JS registry (no React) so lib/ helpers and their Node tests can use the dictionaries.
import ar from './ar.js'
import en from './en.js'
import fr from './fr.js'

export const DICTS = { fr, en, ar }
export const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français', locale: 'fr-FR', dir: 'ltr' },
  { code: 'en', label: 'EN', name: 'English', locale: 'en-GB', dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية', locale: 'ar-MA', dir: 'rtl' },
]
export const localeOf = (lang) => LANGS.find((l) => l.code === lang)?.locale ?? 'fr-FR'

const lookup = (dict, key) => key.split('.').reduce((o, k) => o?.[k], dict)

/** UI string by dotted key for `lang`, French fallback, {placeholders} filled from vars. */
export function translate(lang, key, vars) {
  const s = lookup(DICTS[lang], key) ?? lookup(fr, key) ?? key
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : s
}
