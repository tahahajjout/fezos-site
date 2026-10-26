import { m as motion, useScroll } from 'motion/react'

// Gold hairline that grows with page scroll: top edge on phones (the sticky bar owns the bottom), bottom from lg.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-champagne lg:top-auto lg:bottom-0 rtl:origin-right"
    />
  )
}
