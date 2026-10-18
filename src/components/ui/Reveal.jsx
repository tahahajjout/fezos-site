import { motion, useReducedMotion } from 'motion/react'
import { DURATION, EASE, STAGGER, VIEWPORT } from '../../lib/motion'

// Reduced motion renders a plain element: no hidden initial state, no animation.
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE } },
}

export function Reveal({ as = 'div', stagger = false, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={stagger ? { hidden: {}, show: { transition: { staggerChildren: STAGGER } } } : item}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Child of <Reveal stagger> — inherits the parent's variant timing.
export function RevealItem({ as = 'div', className, children, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Plain = as
    return <Plain className={className} {...rest}>{children}</Plain>
  }
  const Tag = motion[as]
  return <Tag className={className} variants={item} {...rest}>{children}</Tag>
}
