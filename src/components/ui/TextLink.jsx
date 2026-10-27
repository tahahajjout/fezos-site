import { linkProps } from '../../lib/links'
import { Arrow } from './Arrow'
import { RollText } from './RollText'

// Inline link/button: underline grows from the reading start on hover, or (`roll`, header nav) the letters roll.
export function TextLink({ href, arrow = true, roll = false, className = '', children, ...rest }) {
  const Tag = href ? 'a' : 'button'
  const props = href ? { href, ...linkProps(href) } : { type: 'button' }
  return (
    <Tag
      className={`group inline-flex min-h-11 items-center gap-2 text-meta font-medium uppercase tracking-label ${className}`}
      {...props}
      {...rest}
    >
      {roll ? (
        <RollText>{children}</RollText>
      ) : (
        <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-lux group-hover:after:scale-x-100 rtl:after:origin-right">
          {children}
        </span>
      )}
      {arrow && <Arrow />}
    </Tag>
  )
}
