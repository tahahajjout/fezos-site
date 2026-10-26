import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { serviceCategories } from '../../../data/salon'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useLang } from '../../../i18n'
import { paginate, toViews, viewOfCategory } from '../../../lib/bookPages'
import { prefersReducedMotion } from '../../../lib/motion'
import { BlankPage, CoverBack, CoverFront, Leaf } from './BookParts'
import { BookPage } from './BookPage'
import { useOpenMotion, useTurnMotion } from './useBookMotion'

const RIFFLE = 6 // blank pages flipping between the cover and the first spread
const navButton =
  'inline-flex size-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-300 hover:border-charcoal disabled:opacity-30'

// The price list as a book: closed (tap to open) → riffle → spread of two pages (one on phones),
// page turns by buttons, swipe or arrow keys. `tab` (from the treatment cards) opens a category.
export function Book({ tab, onBook }) {
  const { t, l, rtl } = useLang()
  const spread = useMediaQuery('(min-width: 1024px)')
  const views = useMemo(() => toViews(paginate(serviceCategories, spread ? 4 : 3), spread ? 2 : 1), [spread])
  const [phase, setPhase] = useState('closed') // closed → opening → open
  const [view, setView] = useState(0)
  const [turn, setTurn] = useState(null) // { to, dir } while a leaf is turning
  const bookRef = useRef(null)
  const leafRefs = useRef([])
  const turnRef = useRef(null)
  const swipe = useRef(null)

  const open = () => {
    if (phase !== 'closed') return
    setPhase(prefersReducedMotion() ? 'open' : 'opening')
  }
  const go = (dir) => {
    const to = view + dir
    if (phase !== 'open' || turn || to < 0 || to >= views.length) return
    if (prefersReducedMotion()) setView(to)
    else setTurn({ to, dir })
  }

  useOpenMotion(phase === 'opening', { bookRef, leafRefs, spread, rtl, onDone: () => setPhase('open') })
  useTurnMotion(turn, { leafRef: turnRef, spread, rtl, onDone: () => (setView(turn.to), setTurn(null)) })

  // A treatment card asked for a category: jump there (opening the book if needed).
  const firstTab = useRef(tab)
  useEffect(() => {
    if (tab === firstTab.current) return
    firstTab.current = null
    setView(viewOfCategory(views, tab))
    setPhase((p) => (p === 'closed' ? (prefersReducedMotion() ? 'open' : 'opening') : p))
  }, [tab, views])

  // Desktop ↔ phone re-paginates: stay on the same category.
  const category = useRef(null)
  category.current = views[Math.min(view, views.length - 1)][0].category.id
  useEffect(() => {
    setTurn(null)
    setView(viewOfCategory(views, category.current))
  }, [views])

  const current = views[Math.min(view, views.length - 1)]
  const target = turn && views[turn.to]
  const folio = (v, i) => views.slice(0, v).flat().length + i + 1
  const page = (v, i, side, interactive = true) => (
    <BookPage page={views[v][i] ?? null} folio={folio(v, i)} side={side} onBook={onBook} interactive={interactive} />
  )

  // What lies flat while a leaf turns over it: the destination on the uncovered side.
  const forward = turn?.dir > 0
  const startView = turn && !forward ? turn.to : view
  const endView = turn && forward ? turn.to : view
  const singleView = turn && forward ? turn.to : view

  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (dir) go(rtl ? -dir : dir)
  }
  const onPointerUp = (e) => {
    const dx = e.clientX - (swipe.current?.x ?? e.clientX)
    if (Math.abs(dx) < 50) return
    swipe.current.moved = true // swallow the click that ends a swipe
    go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1))
  }

  return (
    <div role="region" aria-label={t('prices.eyebrow')} onKeyDown={onKeyDown} className="mx-auto w-full max-w-md lg:max-w-5xl">
      <div
        ref={bookRef}
        onPointerDown={(e) => (swipe.current = { x: e.clientX, moved: false })}
        onPointerUp={onPointerUp}
        onClickCapture={(e) => swipe.current?.moved && (e.stopPropagation(), (swipe.current = null))}
        // closed spread: only the cover (end half) shows, so slide it to the centre
        style={spread && phase !== 'open' ? { transform: `translateX(${rtl ? 25 : -25}%)` } : undefined}
        className="relative aspect-3/5 touch-pan-y perspective-distant lg:aspect-8/5"
      >
        {spread ? (
          <div className="absolute inset-0 grid grid-cols-2">
            <div>{phase === 'open' && page(startView, 0, 'start')}</div>
            <div>{page(endView, 1, 'end', phase === 'open' && !turn)}</div>
          </div>
        ) : (
          <div className="absolute inset-0">{page(singleView, 0, 'end', phase === 'open' && !turn)}</div>
        )}

        {phase === 'closed' && (
          <>
            {/* page block thickness under the cover */}
            <span aria-hidden="true" className="absolute inset-y-0 end-0 w-full translate-x-2 translate-y-2 border border-sand bg-linen lg:w-1/2 rtl:-translate-x-2" />
            <span aria-hidden="true" className="absolute inset-y-0 end-0 w-full translate-x-1 translate-y-1 border border-sand bg-linen lg:w-1/2 rtl:-translate-x-1" />
          </>
        )}

        {phase !== 'open' && (
          <>
            <Leaf
              ref={(el) => (leafRefs.current[0] = el)}
              side={spread ? 'end' : 'full'}
              style={{ zIndex: 40 }}
              className={phase === 'closed' ? 'transition-transform duration-700 ease-lux hover:-rotate-y-12 rtl:hover:rotate-y-12' : ''}
              front={
                <button type="button" onClick={open} aria-label={t('prices.open')} className="block size-full cursor-pointer text-start">
                  <CoverFront eyebrow={t('prices.eyebrow')} hint={t('prices.open')} />
                </button>
              }
              back={<CoverBack />}
            />
            {Array.from({ length: RIFFLE }, (_, i) => (
              <Leaf
                key={i}
                aria-hidden="true"
                ref={(el) => (leafRefs.current[i + 1] = el)}
                side={spread ? 'end' : 'full'}
                style={{ zIndex: 39 - i }}
                front={<BlankPage />}
                // the last riffle page lands as the spread's first page, so "open" swaps in seamlessly
                back={spread && i === RIFFLE - 1 ? page(view, 0, 'start', false) : <BlankPage />}
              />
            ))}
          </>
        )}

        {turn && (
          <Leaf
            aria-hidden="true"
            ref={turnRef}
            side={spread ? (forward ? 'end' : 'start') : 'full'}
            style={{ zIndex: 40 }}
            front={spread ? page(view, forward ? 1 : 0, forward ? 'end' : 'start', false) : page(forward ? view : turn.to, 0, 'end', false)}
            back={spread ? page(turn.to, forward ? 0 : 1, forward ? 'start' : 'end', false) : <BlankPage />}
          />
        )}
      </div>

      {phase === 'open' && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <button type="button" onClick={() => go(-1)} disabled={view === 0} aria-label={t('prices.prev')} className={navButton}>
            <ChevronLeft size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
          </button>
          <p aria-live="polite" className="text-center text-meta text-stone">
            <span className="text-charcoal">{l((target || current)[0].category.label)}</span> ·{' '}
            {t('prices.page', { n: (turn ? turn.to : view) + 1, total: views.length })}
          </p>
          <button type="button" onClick={() => go(1)} disabled={view === views.length - 1} aria-label={t('prices.next')} className={navButton}>
            <ChevronRight size={20} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
          </button>
        </div>
      )}
    </div>
  )
}
