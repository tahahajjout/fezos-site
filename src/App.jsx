import { useState } from 'react'
import { BookingModal } from './components/sections/BookingModal'
import { FinalCta } from './components/sections/FinalCta'
import { Footer } from './components/sections/Footer'
import { Gallery } from './components/sections/Gallery'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { Location } from './components/sections/Location'
import { OfferBanner } from './components/sections/OfferBanner'
import { Packs } from './components/sections/Packs'
import { PanoramaTour } from './components/sections/PanoramaTour'
import { PriceList } from './components/sections/PriceList'
import { Reviews } from './components/sections/Reviews'
import { StickyMobileBar } from './components/sections/StickyMobileBar'
import { Treatments } from './components/sections/Treatments'
import { Why } from './components/sections/Why'
import { serviceCategories } from './data/salon'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()
  // { serviceId } while the booking modal is open; every "Réserver" calls book(), optionally with an id.
  const [booking, setBooking] = useState(null)
  const book = (serviceId = null) => setBooking({ serviceId })
  // Price-list tab lives here so treatment cards can open the right category.
  const [priceTab, setPriceTab] = useState(serviceCategories[0].id)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-alabaster focus:px-4 focus:py-3"
      >
        {t('common.skip')}
      </a>
      <Header onBook={book} />
      <main id="main">
        <Hero onBook={book} />
        <OfferBanner onBook={book} />
        <Intro />
        <Treatments onSelect={setPriceTab} />
        <PriceList tab={priceTab} onTab={setPriceTab} onBook={book} />
        <PanoramaTour />
        <Packs onBook={book} />
        <Why />
        <Gallery />
        <Reviews />
        <Location />
        <FinalCta onBook={book} />
      </main>
      <Footer />
      <StickyMobileBar onBook={book} />
      <BookingModal booking={booking} onClose={() => setBooking(null)} />
    </>
  )
}
