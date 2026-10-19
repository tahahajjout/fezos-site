// Spaced uppercase label with the 40px gold rule beneath.
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`flex flex-col gap-3 ${className}`}>
      <span className="eyebrow">{children}</span>
      <span className="gold-rule" aria-hidden="true" />
    </p>
  )
}
