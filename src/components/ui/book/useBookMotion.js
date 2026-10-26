import { useLayoutEffect } from 'react'

// GSAP timelines for the book (GSAP is lazy-loaded, as for the scroll effects). Leaves turn
// around the spine; z-index swaps at the half-turn so later leaves land on top of earlier ones.
// `s` mirrors the direction in RTL, where the book reads right to left.
const loadGsap = () => import('../../../lib/smoothScroll').then((m) => m.gsap)

function useTimeline(active, build) {
  useLayoutEffect(() => {
    if (!active) return
    let tl
    let cancelled = false
    loadGsap().then((gsap) => {
      if (!cancelled) tl = build(gsap)
    })
    return () => {
      cancelled = true
      tl?.kill()
    }
    // only `active` re-runs it: build reads refs and the state that made `active` true
  }, [active])
}

/** Closed → open: slide to centre, cover swings open, a riffle of pages, settle on the spread. */
export function useOpenMotion(active, { bookRef, leafRefs, spread, rtl, onDone }) {
  useTimeline(active, (gsap) => {
    const s = rtl ? -1 : 1
    const tl = gsap.timeline({ onComplete: onDone })
    if (spread) tl.to(bookRef.current, { x: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
    leafRefs.current.forEach((leaf, i) => {
      const at = i === 0 ? 0.15 : 0.55 + i * 0.09 // cover first, then the riffle
      const duration = i === 0 ? 1.1 : 0.75
      tl.to(leaf, { rotateY: -180 * s, duration, ease: 'power2.inOut' }, at)
      tl.set(leaf, { zIndex: 1 + i }, at + duration / 2)
      // one-page book: leaves swing off the page, so they fade instead of stacking on a left page
      if (!spread) tl.to(leaf, { autoAlpha: 0, duration: duration * 0.3, ease: 'none' }, at + duration * 0.55)
    })
    return tl
  })
}

/** One page turn. Spread: the leaf turns over the spine. One page: it lifts away / lays down. */
export function useTurnMotion(turn, { leafRef, spread, rtl, onDone }) {
  useTimeline(turn, (gsap) => {
    const s = rtl ? -1 : 1
    const leaf = leafRef.current
    const forward = turn.dir > 0
    const tl = gsap.timeline({ onComplete: onDone, defaults: { ease: 'power2.inOut' } })
    if (spread) {
      tl.fromTo(leaf, { rotateY: 0 }, { rotateY: (forward ? -180 : 180) * s, duration: 0.9 })
    } else if (forward) {
      tl.fromTo(leaf, { rotateY: 0 }, { rotateY: -180 * s, duration: 0.8 })
      tl.to(leaf, { autoAlpha: 0, duration: 0.25, ease: 'none' }, 0.45)
    } else {
      tl.fromTo(leaf, { rotateY: -180 * s }, { rotateY: 0, duration: 0.8 })
      tl.fromTo(leaf, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'none' }, 0.1)
    }
    return tl
  })
}
