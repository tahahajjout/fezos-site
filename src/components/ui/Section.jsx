import { Container } from './Container'

// On charcoal, gold text switches to the brighter `champagne` (AA on dark).
const variants = {
  alabaster: 'bg-alabaster text-charcoal',
  linen: 'bg-linen text-charcoal',
  charcoal: 'bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne',
}

export function Section({ id, variant = 'alabaster', className = '', children, ...rest }) {
  return (
    <section id={id} className={`section-y ${variants[variant]} ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  )
}
