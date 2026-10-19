// Serif title whose last word(s) — `accent` — are set in italic gold.
export function SectionTitle({ as: Tag = 'h2', accent, align = 'left', className = '', children, ...rest }) {
  const size = Tag === 'h1' ? 'text-display' : 'text-h2'
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <Tag className={`${size} ${alignment} ${className}`} {...rest}>
      {children}
      {accent && (
        <>
          {' '}
          <em className="accent">{accent}</em>
        </>
      )}
    </Tag>
  )
}
