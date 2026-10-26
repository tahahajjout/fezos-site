import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Scroll-scrubbed word effects for text split with <Words>. Words render fully visible;
// the hidden start state is only set here, so no-JS and reduced-motion visitors read plain text.
const EFFECTS = {
  // Blurred, faint words come into focus one after another.
  focus: (gsap, words, scrollTrigger) =>
    gsap.fromTo(
      words,
      { filter: 'blur(10px)', opacity: 0.15 },
      { filter: 'blur(0px)', opacity: 1, ease: 'none', stagger: 0.15, scrollTrigger },
    ),
  // Dim words fill in; each one lights up in the edge colour, then settles to its own colour.
  fill: (gsap, words, scrollTrigger, edge) => {
    const tl = gsap.timeline({ scrollTrigger })
    words.forEach((word, i) => {
      const color = getComputedStyle(word).color
      tl.fromTo(word, { opacity: 0.2, color }, { opacity: 1, color: edge, duration: 1, ease: 'none' }, i * 0.3)
      tl.to(word, { color, duration: 1, ease: 'none' }, i * 0.3 + 1)
    })
    return tl
  },
}

/**
 * @param effect 'focus' | 'fill'
 * @param edgeToken colour token (e.g. 'champagne') for the fill's leading edge
 * @param deps re-split triggers, e.g. [lang]
 */
export function useScrollWords(effect, { edgeToken = 'champagne', deps = [] } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const edge = getComputedStyle(document.documentElement).getPropertyValue(`--color-${edgeToken}`).trim()
    const scrollTrigger = { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true }
    let ctx
    let cancelled = false
    import('../lib/smoothScroll').then(({ gsap }) => {
      if (cancelled) return // unmounted or language switched before the chunk arrived
      ctx = gsap.context(() => EFFECTS[effect](gsap, el.querySelectorAll('[data-word]'), scrollTrigger, edge), el)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [effect, edgeToken, ...deps])
  return ref
}
