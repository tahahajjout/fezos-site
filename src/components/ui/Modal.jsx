import { X } from 'lucide-react'
import { useId } from 'react'
import { onNativeClose, useDialog } from '../../hooks/useDialog'
import { useLang } from '../../i18n'

/**
 * Native <dialog>: showModal() gives aria-modal, Esc-to-close, inert background
 * (focus stays inside) and focus restore for free. useDialog adds the scroll lock.
 */
export function Modal({ open, onClose, title, className = '', children }) {
  const { t } = useLang()
  const ref = useDialog(open)
  const titleId = useId()

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onNativeClose(onClose)}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto max-h-[90svh] w-full max-w-[min(36rem,calc(100%-2rem))] overflow-y-auto rounded-sharp bg-alabaster p-0 text-charcoal shadow-modal backdrop:bg-charcoal/60 transition-[opacity,translate] duration-500 ease-lux starting:open:translate-y-4 starting:open:opacity-0 ${className}`}
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="text-h3">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="-me-3 -mt-2 inline-flex size-11 shrink-0 items-center justify-center text-stone transition-colors hover:text-charcoal"
          >
            <X size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </dialog>
  )
}
