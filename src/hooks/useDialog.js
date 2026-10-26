import { useEffect, useRef } from 'react'

/** Drives a native <dialog> from React state: showModal() + scroll lock while open. */
export function useDialog(open) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    if (!open) return
    dialog.showModal()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      if (dialog.open) dialog.close()
    }
  }, [open])
  return ref
}

/**
 * <dialog onClose> handler. The native `close` event is queued, so after a quick close → reopen
 * it can land while the dialog is open again and would shut it. Only pass it on if still closed.
 */
export const onNativeClose = (onClose) => (e) => {
  if (!e.currentTarget.open) onClose()
}
