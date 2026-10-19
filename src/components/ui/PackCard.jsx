import { useLang } from '../../i18n'
import { formatPrice } from '../../lib/format'
import { ImageFrame } from './ImageFrame'
import { TextLink } from './TextLink'

// Alabaster card on the linen section (tone step, no border). With `image` it becomes a
// featured card: picture beside the text from sm up, stacked on phones.
export function PackCard({ number, name, description, price, image, reverse = false, onBook, className = '' }) {
  const { t, l, lang } = useLang()
  return (
    <article className={`group flex h-full flex-col bg-alabaster ${reverse ? 'sm:flex-row-reverse' : 'sm:flex-row'} ${className}`}>
      {image && (
        <ImageFrame
          image={image}
          ratio={[4, 5]}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, calc(100vw - 3rem)"
          className="sm:w-2/5 sm:shrink-0"
        />
      )}
      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <span className="font-display text-price italic text-champagne-deep">{number}</span>
        <h3 className="mt-8 text-h3">{l(name)}</h3>
        <p className="mt-3 max-w-[40ch]">{l(description)}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pt-10">
          <span className="price">{formatPrice(price, lang)}</span>
          <TextLink onClick={onBook} aria-label={t('packs.bookAria', { name: l(name) })}>
            {t('common.book')}
          </TextLink>
        </div>
      </div>
    </article>
  )
}
