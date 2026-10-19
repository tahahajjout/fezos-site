import { MoveHorizontal } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { srcSet, url } from '../../data/images'

const DRIFT = 10 // px/s idle auto-pan until the first interaction
const FRICTION = 0.95 // velocity kept per 60fps frame after release
const KEY_PUSH = 900 // px/s impulse per arrow key press
const MAX_V = 2500 // px/s fling cap: a flick glides, it never spins the room
const KEY_STEP = 160 // px jump per arrow key when motion is reduced
const MARKER = 0.15 // progress marker width, as a share of its track

/**
 * Drag-to-pan looping panorama (zero dependencies). Pointer Events for mouse/touch/pen,
 * `touch-action: pan-y` keeps vertical page scroll, inertia + idle drift run in rAF on refs
 * (no React render per frame). `image.mirror` alternates a flipped copy so a non-360 photo
 * still loops without a visible seam.
 */
export function PanoramaViewer({ image, label, hint, description, className = '' }) {
  const reduce = useReducedMotion()
  const descId = useId()
  const frameRef = useRef(null)
  const trackRef = useRef(null)
  const markerRef = useRef(null)
  const s = useRef({ x: 0, v: 0, dragging: false, lastX: 0, lastT: 0, touched: false, tileW: 0 }).current
  const [hintHidden, setHintHidden] = useState(false)
  const tiles = image.mirror ? [false, true, false] : [false, false]

  function render() {
    const period = s.tileW * (image.mirror ? 2 : 1)
    if (!period) return
    const p = ((s.x % period) + period) % period
    trackRef.current.style.transform = `translate3d(${-p}px,0,0)`
    markerRef.current.style.transform = `translateX(${(p / period) * ((1 - MARKER) / MARKER) * 100}%)`
  }

  function touch() {
    if (s.touched) return
    s.touched = true
    setHintHidden(true)
  }

  useEffect(() => {
    const frame = frameRef.current
    const measure = () => {
      s.tileW = trackRef.current.firstElementChild.getBoundingClientRect().width
      render()
    }
    const resize = new ResizeObserver(measure)
    resize.observe(frame)

    let raf = 0
    let prev = 0
    const tick = (t) => {
      const dt = prev ? Math.min(t - prev, 64) / 1000 : 0
      prev = t
      if (!s.dragging) {
        if (Math.abs(s.v) > 4) {
          s.x += s.v * dt
          s.v *= FRICTION ** (dt * 60)
        } else {
          s.v = 0
          if (!s.touched && !reduce) s.x += DRIFT * dt
        }
      }
      render()
      raf = requestAnimationFrame(tick)
    }
    // Only animate while the viewer is on screen.
    const visible = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      prev = 0
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
    })
    visible.observe(frame)

    return () => {
      resize.disconnect()
      visible.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduce]) // everything else is refs or a stable image

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.dataset.dragging = 'true'
    Object.assign(s, { dragging: true, lastX: e.clientX, lastT: e.timeStamp, v: 0 })
    touch()
  }
  const onPointerMove = (e) => {
    if (!s.dragging) return
    const dx = e.clientX - s.lastX
    const dt = e.timeStamp - s.lastT
    s.x -= dx // content follows the finger
    if (dt > 0) s.v = 0.8 * ((-dx / dt) * 1000) + 0.2 * s.v
    s.lastX = e.clientX
    s.lastT = e.timeStamp
  }
  const onPointerUp = (e) => {
    if (!s.dragging) return
    s.dragging = false
    delete e.currentTarget.dataset.dragging
    // A pause before release means "stop here", not "fling".
    if (reduce || e.timeStamp - s.lastT > 80) s.v = 0
    s.v = Math.max(-MAX_V, Math.min(MAX_V, s.v))
  }
  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!dir) return
    e.preventDefault()
    touch()
    if (reduce) s.x += dir * KEY_STEP
    else s.v += dir * KEY_PUSH
  }

  return (
    <div className={className}>
      <div
        ref={frameRef}
        role="img"
        dir="ltr" // the strip and drag direction stay physical in RTL pages
        aria-label={label}
        aria-describedby={descId}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative aspect-4/5 cursor-grab touch-pan-y select-none overflow-hidden bg-charcoal-soft data-dragging:cursor-grabbing lg:aspect-video"
      >
        <div ref={trackRef} className="flex h-full w-max will-change-transform">
          {tiles.map((flip, i) => (
            <img
              key={i}
              src={url(image, 2400, image.ratio)}
              srcSet={srcSet(image, image.ratio, 4000)}
              sizes="(min-width: 1024px) 160vw, 365vw"
              width={4000}
              height={1200}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className={`h-full w-auto max-w-none ${flip ? '-scale-x-100' : ''}`}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ease-lux ${
            hintHidden ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="flex size-20 items-center justify-center rounded-full border border-alabaster/30 bg-charcoal/40 text-alabaster backdrop-blur-md">
            <MoveHorizontal size={22} strokeWidth={1.25} />
          </span>
          <span className="max-w-[calc(100%-3rem)] rounded-full bg-charcoal/55 px-4 py-1.5 text-center text-meta text-alabaster backdrop-blur-md">
            {hint}
          </span>
        </div>
      </div>

      <div aria-hidden="true" className="mt-6 h-px w-full bg-alabaster/15">
        <div ref={markerRef} className="h-px bg-champagne" style={{ width: `${MARKER * 100}%` }} />
      </div>
      <p id={descId} className="sr-only">
        {image.alt}. {description}
      </p>
    </div>
  )
}
