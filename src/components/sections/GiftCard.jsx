import { useState } from 'react'
import { images } from '../../data/images'
import { giftCard } from '../../data/salon'
import { useLang } from '../../i18n'
import { formatPrice } from '../../lib/format'
import { whatsappUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ImageFrame } from '../ui/ImageFrame'
import { Reveal, RevealItem } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

// Carte cadeau — picture left, amount choice right; the request goes to WhatsApp like bookings.
export function GiftCard() {
  const { t, lang } = useLang()
  const [amount, setAmount] = useState(giftCard.amounts[1])
  const message = t('gift.message', { amount: formatPrice(amount, lang) })

  return (
    <section id="cadeau" aria-labelledby="cadeau-title" className="section-y bg-alabaster">
      <Reveal stagger className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <RevealItem className="lg:col-span-5">
          <ImageFrame image={images.gift} ratio={[4, 5]} sizes="(min-width: 1024px) 40vw, calc(100vw - 3rem)" />
        </RevealItem>

        <RevealItem className="lg:col-span-5 lg:col-start-8">
          <Eyebrow>{t('gift.eyebrow')}</Eyebrow>
          <SectionTitle id="cadeau-title" accent={t('gift.accent')} className="mt-8">
            {t('gift.title')}
          </SectionTitle>
          <p className="mt-8 max-w-[40ch] text-body-l font-light">{t('gift.body')}</p>

          <fieldset className="mt-10">
            <legend className="text-meta font-medium uppercase tracking-label">{t('gift.amount')}</legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {giftCard.amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={a === amount}
                  onClick={() => setAmount(a)}
                  className="min-h-11 rounded-sharp border border-sand px-5 font-display text-price italic transition-colors duration-300 ease-lux hover:border-charcoal aria-pressed:border-charcoal aria-pressed:bg-charcoal aria-pressed:text-alabaster"
                >
                  {formatPrice(a, lang)}
                </button>
              ))}
            </div>
          </fieldset>

          <Button variant="whatsapp" href={whatsappUrl(message)} className="mt-10">
            {t('gift.submit')}
          </Button>
          <p className="mt-4 text-meta text-stone">{t('gift.note')}</p>
        </RevealItem>
      </Reveal>
    </section>
  )
}
