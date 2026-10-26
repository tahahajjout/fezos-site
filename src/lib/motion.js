// Motion tokens (CLAUDE.md §4). Keep in sync with --ease-lux in index.css.
export const EASE = [0.22, 1, 0.36, 1]
export const DURATION = { micro: 0.3, reveal: 0.9, zoom: 1.2 }
export const STAGGER = 0.08
export const VIEWPORT = { once: true, margin: '-10%' }

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
