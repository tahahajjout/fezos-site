import { Menu } from 'lucide-react'
import { useState } from 'react'
import { nav } from '../../data/salon'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { useLang } from '../../i18n'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Logo } from '../ui/Logo'
import { TextLink } from '../ui/TextLink'
import { MobileMenu } from './MobileMenu'

// Transparent with light text over the hero; alabaster + blur + hairline once scrolled.
export function Header({ onBook }) {
  const { t } = useLang()
  const scrolled = useScrollHeader()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ease-lux ${
        scrolled ? 'border-sand bg-alabaster/90 text-charcoal backdrop-blur-md' : 'border-transparent text-alabaster'
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-8 lg:h-24">
        <Logo />

        <nav aria-label={t('nav.main')} className="hidden lg:block">
          <ul className="flex gap-6 whitespace-nowrap xl:gap-10">
            {nav.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} arrow={false}>
                  {t(`nav.${link.id}`)}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="me-2 hidden lg:flex" />
          <div className="hidden sm:block">
            <Button variant={scrolled ? 'solid' : 'ghost-light'} onClick={() => onBook()}>
              {t('common.book')}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.open')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-me-3 inline-flex size-11 items-center justify-center lg:hidden"
          >
            <Menu size={22} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onBook={onBook} />
    </header>
  )
}
