import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '../../i18n'
import { prefersReducedMotion } from '../../lib/motion'

const root = document.documentElement

// Before the first render: the visitor's saved choice, else their device's setting.
export function initTheme() {
  let saved = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  root.dataset.theme = saved ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

// Light / dark switch; the page crossfades between the two (instant with reduced motion).
export function ThemeToggle({ className = '' }) {
  const { t } = useLang()
  const [dark, setDark] = useState(root.dataset.theme === 'dark')

  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    const apply = () => {
      root.dataset.theme = next
      setDark(!dark)
    }
    if (document.startViewTransition && !prefersReducedMotion()) document.startViewTransition(apply)
    else apply()
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  const Icon = dark ? Sun : Moon
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('common.darkMode')}
      aria-pressed={dark}
      className={`inline-flex size-11 items-center justify-center transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      <Icon size={20} strokeWidth={1.25} aria-hidden="true" />
    </button>
  )
}
