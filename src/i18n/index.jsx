import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { DICTS, LANGS, translate } from './dicts'

export { LANGS }

// ?lang= wins (shareable links + hreflang), then the visitor's last choice, then French.
function initialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (DICTS[fromUrl]) return fromUrl
    const saved = localStorage.getItem('lang')
    if (DICTS[saved]) return saved
  } catch {
    // storage blocked: fall through to the default
  }
  return 'fr'
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  // Layout effect: <html lang/dir> are set before paint, so Arabic never flashes left-to-right.
  useLayoutEffect(() => {
    const meta = LANGS.find((l) => l.code === lang)
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
    document.title = translate(lang, 'meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(lang, 'meta.description'))
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // private mode: the choice just won't persist
    }
    const url = new URL(window.location.href)
    if (lang === 'fr') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }, [lang])

  const value = useMemo(() => {
    const meta = LANGS.find((l) => l.code === lang)
    const t = (key, vars) => translate(lang, key, vars)
    /** Localised data field: { fr, en, ar } → string (plain strings pass through). */
    const l = (v) => (v == null || typeof v === 'string' ? (v ?? '') : (v[lang] ?? v.fr))
    return { lang, setLang, t, l, locale: meta.locale, rtl: meta.dir === 'rtl' }
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
