import { useLang } from '../../i18n'

// Hover roll: the label slides up out of a mask while a copy rises in behind it, letter by letter.
// Arabic rolls as one word (splitting letters would break the joined script). Needs a `group` parent.
export function RollText({ children }) {
  const { rtl } = useLang()
  const parts = rtl ? [children] : [...children]
  const line = (move) =>
    parts.map((part, i) => (
      <span
        key={i}
        className={`inline-block whitespace-pre transition-transform duration-500 ease-lux ${move}`}
        style={{ transitionDelay: `${i * 18}ms` }}
      >
        {part}
      </span>
    ))

  return (
    <span className="relative inline-block overflow-hidden">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="block">
        {line('motion-safe:group-hover:-translate-y-full motion-safe:group-focus-visible:-translate-y-full')}
      </span>
      <span aria-hidden="true" className="absolute inset-0 motion-reduce:hidden">
        {line('translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0')}
      </span>
    </span>
  )
}
