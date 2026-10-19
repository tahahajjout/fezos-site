import { MessageCircle } from 'lucide-react'
import { salon } from '../../data/salon'
import { linkProps } from '../../lib/links'
import { Arrow } from './Arrow'

const base =
  'group inline-flex min-h-11 items-center justify-center gap-3 rounded-sharp px-7 py-3 text-meta font-medium uppercase tracking-label transition-colors duration-300 ease-lux'

const variants = {
  solid: 'bg-charcoal text-alabaster hover:bg-charcoal-soft [&_svg]:group-hover:text-champagne',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster',
  'ghost-light': 'border border-alabaster/40 text-alabaster hover:border-champagne hover:text-champagne',
  whatsapp: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-alabaster',
}

export function Button({ variant = 'solid', href, arrow = variant !== 'whatsapp', className = '', children, ...rest }) {
  const link = href ?? (variant === 'whatsapp' ? `https://wa.me/${salon.whatsapp}` : undefined)
  const Tag = link ? 'a' : 'button'
  const props = link ? { href: link, ...linkProps(link) } : { type: 'button' }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props} {...rest}>
      {variant === 'whatsapp' && <MessageCircle size={18} strokeWidth={1.25} aria-hidden="true" />}
      {children}
      {arrow && <Arrow />}
    </Tag>
  )
}
