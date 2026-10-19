import { Star } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { images } from '../../data/images'
import { salon } from '../../data/salon'
import { useOpenStatus } from '../../hooks/useOpenStatus'
import { DURATION, EASE } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'

const WORDS = ['Votre', 'moment']
const title = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }
const word = {
  hidden: { opacity: 0, y: '0.35em' },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE } },
}

export function Hero({ onBook }) {
  const reduce = useReducedMotion()
  const status = useOpenStatus()
  // Supporting lines follow the headline in.
  const after = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: DURATION.reveal, ease: EASE, delay } }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-charcoal text-alabaster [&_.accent]:text-champagne [&_.eyebrow]:text-champagne"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: EASE }}
      >
        {/* focus right so the oil drop sits beside the headline, not under it */}
        <ImageFrame
          image={images.hero}
          fill
          priority
          zoom={false}
          ratio={[16, 9]}
          mobileRatio={[4, 5]}
          imgClassName="object-[75%_50%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/40 to-charcoal/80 lg:from-charcoal/25 lg:to-charcoal/65" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/45 to-transparent lg:to-60%" />
      </motion.div>

      <div className="container-site pb-24 pt-40 lg:pb-32">
        <motion.div {...after(0)}>
          <Eyebrow>Beauty Lounge · Fès</Eyebrow>
        </motion.div>

        <motion.h1
          id="hero-title"
          className="mt-8 text-display"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={title}
        >
          {WORDS.map((w) => (
            <motion.span key={w} variants={word} className="inline-block">
              {w}&nbsp;
            </motion.span>
          ))}
          <motion.em variants={word} className="accent inline-block">
            beauté.
          </motion.em>
        </motion.h1>

        <motion.p {...after(0.6)} className="mt-8 max-w-[40ch] text-body-l font-light text-alabaster/85">
          Coiffure, onglerie et soins visage dans un lounge pensé pour vous — au cœur de Champs de Course.
        </motion.p>

        <motion.div {...after(0.75)} className="mt-10 flex flex-wrap gap-3">
          <Button variant="solid-light" onClick={() => onBook()}>
            Réserver une expérience
          </Button>
          <Button variant="whatsapp-light">WhatsApp</Button>
        </motion.div>

        <motion.p
          {...after(0.9)}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-meta text-alabaster/80 sm:gap-x-3"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} strokeWidth={1.25} aria-hidden="true" className="fill-champagne text-champagne" />
            {salon.rating.value.toLocaleString('fr-FR')} sur Google
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${status.open ? 'bg-champagne' : 'bg-alabaster/40'}`}
            />
            {status.label}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Café offert à l’arrivée</span>
        </motion.p>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 end-6 h-20 w-px overflow-hidden bg-alabaster/20 lg:end-12">
        <span className="block h-full w-full animate-scroll-cue bg-champagne" />
      </div>
    </section>
  )
}
