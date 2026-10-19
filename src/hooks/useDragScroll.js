import { useEffect, useRef } from 'react'

/** Mouse drag-to-scroll for a scroll-snap row (touch and trackpads already scroll natively). */
export function useDragScroll() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let start = null
    const down = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      start = { x: e.clientX, left: el.scrollLeft }
      el.setPointerCapture(e.pointerId)
      el.style.scrollSnapType = 'none' // let it follow the cursor freely
    }
    const move = (e) => {
      if (start) el.scrollLeft = start.left - (e.clientX - start.x)
    }
    const up = () => {
      if (!start) return
      start = null
      el.style.scrollSnapType = '' // re-snap to the nearest card
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [])
  return ref
}
