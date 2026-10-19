// Wordmark: "Fezo's" in Cormorant italic over spaced "BEAUTY LOUNGE". Latin in every language.
export function Logo({ className = '', ...rest }) {
  return (
    <a href="#top" className={`inline-flex flex-col leading-none ${className}`} {...rest}>
      <span className="font-display text-4xl font-normal italic">Fezo’s</span>{' '}
      <span className="mt-1 whitespace-nowrap ps-0.5 text-eyebrow font-medium uppercase">Beauty Lounge</span>
    </a>
  )
}
