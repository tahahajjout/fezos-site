import { MessageCircle } from 'lucide-react'
import { salon } from '../../data/salon'
import { linkProps } from '../../lib/links'
import { Arrow } from './Arrow'

const base =
  'group inline-flex min-h-11 items-center justify-center gap-3 rounded-sharp px-7 py-3 text-meta font-medium uppercase tracking-label transition-[color,background-color,border-color,scale] duration-300 ease-lux active:scale-[0.98]'

const variants = {
  solid: 'bg-charcoal text-alabaster hover:bg-charcoal-soft [&_svg]:group-hover:text-champagne',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster',
  'ghost-light': 'border border-alabaster/40 text-alabaster hover:border-champagne hover:text-champagne',
  whatsapp: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster',
  // On dark backgrounds (hero, charcoal sections, mobile menu)
  'solid-light': 'bg-alabaster text-charcoal hover:bg-champagne-soft [&_svg]:group-hover:text-champagne-deep',
  'whatsapp-light': 'border border-alabaster/40 text-alabaster hover:border-champagne hover:text-champagne',
}

export function Button({ variant = 'solid', href, arrow, className = '', children, ...rest }) {
  const whatsapp = variant.startsWith('whatsapp')
  arrow ??= !whatsapp
  const link = href ?? (whatsapp ? `https://wa.me/${salon.whatsapp}` : undefined)
  const Tag = link ? 'a' : 'button'
  const props = link ? { href: link, ...linkProps(link) } : { type: 'button' }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props} {...rest}>
      {whatsapp && <MessageCircle size={18} strokeWidth={1.25} aria-hidden="true" />}
      {children}
      {arrow && <Arrow />}
    </Tag>
  )
}
