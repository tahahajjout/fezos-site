// Label + control + error. The control gets `id`/`aria-*` from the caller (see BookingModal's `field()`).
export const control =
  'mt-2 block min-h-12 w-full rounded-sharp border border-sand bg-linen px-4 py-3 text-body text-charcoal transition-colors duration-300 focus:border-charcoal aria-invalid:border-champagne-deep'

export function Field({ id, label, optional, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-meta font-medium uppercase tracking-label">
        {label}
        {optional && <span className="ms-2 font-normal normal-case tracking-normal text-stone">({optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-meta text-champagne-deep">
          {error}
        </p>
      )}
    </div>
  )
}
