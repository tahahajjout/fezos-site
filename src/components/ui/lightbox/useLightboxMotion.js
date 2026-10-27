import { animate, useMotionValue } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE } from '../../../lib/motion'

/** Where the photo would sit inside `box` with object-contain. */
export const contain = (box, [rw, rh]) => {
  const width = Math.min(box.width, (box.height * rw) / rh)
  const height = (width * rh) / rw
  return { left: box.left + (box.width - width) / 2, top: box.top + (box.height - height) / 2, width, height }
}

/**
 * The lightbox's motion: the photo grows out of its gallery thumbnail on open and shrinks back into it
 * on close (FLIP), the dark veil fades, a drag follows the finger, and the wheel / trackpad steps photos.
 * `fromThumb()` returns the offset from the thumbnail to the photo's final place, or null when the
 * thumbnail is off screen (then the photo simply fades). Call after useDialog, so the dialog is shown.
 */
export function useLightboxMotion({ open, reduce, fromThumb, onClose, onStep }) {
  const veil = useMotionValue(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  const opacity = useMotionValue(0)
  const dragX = useMotionValue(0)
  const closing = useRef(false)
  const drag = useRef(null)
  const wheelLock = useRef(0)
  const ease = (duration) => ({ duration: reduce ? 0 : duration, ease: EASE })

  useEffect(() => {
    if (!open) return
    closing.current = false
    const from = !reduce && fromThumb()
    x.set(from ? from.x : 0)
    y.set(from ? from.y : 0)
    scale.set(from ? from.scale : reduce ? 1 : 0.94)
    opacity.set(from || reduce ? 1 : 0)
    ;[x, y].forEach((v) => animate(v, 0, ease(1)))
    animate(scale, 1, ease(1))
    animate(opacity, 1, ease(0.6))
    animate(veil, 1, ease(0.7))
  }, [open]) // only on open: the values are re-seeded each time

  const close = () => {
    if (closing.current) return
    closing.current = true
    const to = !reduce && fromThumb()
    animate(veil, 0, ease(0.7))
    if (to) {
      animate(x, to.x, ease(0.8))
      animate(y, to.y, ease(0.8))
      animate(scale, to.scale, { ...ease(0.8), onComplete: onClose })
    } else {
      animate(scale, 0.94, ease(0.5))
      animate(opacity, 0, { ...ease(0.5), onComplete: onClose })
    }
  }

  // Drag: the photo follows the finger at 40%; past 60px it turns the page, then eases back to rest.
  const release = (e) => {
    if (drag.current === null) return
    const dx = e.clientX - drag.current
    drag.current = null
    if (Math.abs(dx) > 60) onStep(dx < 0 ? 1 : -1, true)
    animate(dragX, 0, ease(0.7))
  }
  const pointer = {
    onPointerDown: (e) => {
      drag.current = e.clientX
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e) => drag.current !== null && dragX.set((e.clientX - drag.current) * 0.4),
    onPointerUp: release,
    onPointerCancel: release,
  }

  // Wheel / trackpad: one step per gesture. A trackpad keeps firing during its inertia, so the lock
  // is extended while events keep coming instead of releasing mid-gesture.
  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    const now = Date.now()
    const busy = now < wheelLock.current
    wheelLock.current = busy ? Math.max(wheelLock.current, now + 250) : now + 900
    if (!busy && Math.abs(delta) > 12) onStep(delta > 0 ? 1 : -1)
    else if (!busy) wheelLock.current = 0
  }

  return { veil, flip: { x, y, scale, opacity }, dragX, close, pointer, onWheel }
}
