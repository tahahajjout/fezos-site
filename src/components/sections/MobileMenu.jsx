import { X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { nav, salon } from '../../data/salon'
import { useDialog } from '../../hooks/useDialog'
import { DURATION, EASE, STAGGER } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const list = { show: { transition: { staggerChildren: STAGGER, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE } },
}

// Full-screen charcoal overlay; native <dialog> handles focus, Esc and inert page.
export function MobileMenu({ open, onClose, onBook }) {
  const ref = useDialog(open)
  const reduce = useReducedMotion()

  return (
    <dialog
      ref={ref}
      id="mobile-menu"
      aria-label="Menu"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-charcoal p-0 text-alabaster backdrop:bg-charcoal"
    >
      {open && (
        <div className="container-site flex min-h-full flex-col">
          <div className="flex h-20 items-center justify-between">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="-me-3 inline-flex size-11 items-center justify-center"
            >
              <X size={22} strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navigation principale" className="mt-10">
            <motion.ul initial={reduce ? false : 'hidden'} animate="show" variants={list}>
              {nav.map((link) => (
                <motion.li key={link.href} variants={item}>
                  <a href={link.href} onClick={onClose} className="block py-2 font-display text-h2 font-light">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pb-10 pt-12">
            <Button
              variant="solid-light"
              onClick={() => {
                onClose()
                onBook()
              }}
            >
              Réserver une expérience
            </Button>
            <Button variant="whatsapp-light">WhatsApp</Button>
            <a href={`tel:${salon.phone.tel}`} className="mt-4 text-meta text-alabaster/70">
              {salon.phone.display} · {salon.address.street}, {salon.address.city}
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}
