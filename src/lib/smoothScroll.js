import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Loaded with dynamic import() only (main.jsx, useScrollWords), so GSAP + Lenis ship in their
// own chunk after first paint, and never for reduced-motion visitors (callers check first).
gsap.registerPlugin(ScrollTrigger)
export { gsap }

/** Lenis inertia scroll on GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  const lenis = new Lenis({
    anchors: true, // Lenis already honours the CSS scroll-padding-top (fixed header)
    allowNestedScroll: true, // carousels and modal content keep their own native scroll
    prevent: (node) => Boolean(node.closest?.('dialog')), // open dialogs (and their backdrop) stay native
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}
