import { useState } from 'react'
import { BookingModal } from './components/sections/BookingModal'
import { FinalCta } from './components/sections/FinalCta'
import { Finder } from './components/sections/Finder'
import { Footer } from './components/sections/Footer'
import { Gallery } from './components/sections/Gallery'
import { GiftCard } from './components/sections/GiftCard'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { Location } from './components/sections/Location'
import { OfferBanner } from './components/sections/OfferBanner'
import { Packs } from './components/sections/Packs'
import { PanoramaTour } from './components/sections/PanoramaTour'
import { PriceList } from './components/sections/PriceList'
import { Reviews } from './components/sections/Reviews'
import { SPLASH_HOLD, Splash, shouldPlaySplash } from './components/sections/Splash'
import { StickyMobileBar } from './components/sections/StickyMobileBar'
import { Team } from './components/sections/Team'
import { Treatments } from './components/sections/Treatments'
import { Why } from './components/sections/Why'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { serviceCategories } from './data/salon'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()
  // { serviceId } while the booking modal is open; every "Réserver" calls book(), optionally with an id.
  const [booking, setBooking] = useState(null)
  const book = (serviceId = null) => setBooking({ serviceId })
  // Price-list tab lives here so treatment cards can open the right category.
  const [priceTab, setPriceTab] = useState(serviceCategories[0].id)
  // Decided once on load, so the hero's delay stays fixed after the splash unmounts.
  const [playSplash] = useState(shouldPlaySplash)
  const [splashDone, setSplashDone] = useState(false)

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
        {/* +0.3s: hero words start rising while the curtain is mid-lift */}
        <Hero onBook={book} introDelay={playSplash ? SPLASH_HOLD + 0.3 : 0} />
        <OfferBanner onBook={book} />
        <Intro />
        <Treatments onSelect={setPriceTab} />
        <Finder onBook={book} />
        <PriceList tab={priceTab} onTab={setPriceTab} onBook={book} />
        <PanoramaTour />
        <Packs onBook={book} />
        <GiftCard />
        <Why />
        <Team onBook={book} />
        <Gallery />
        <Reviews />
        <Location />
        <FinalCta onBook={book} />
      </main>
      <Footer />
      <StickyMobileBar onBook={book} />
      <ScrollProgress />
      <BookingModal booking={booking} onClose={() => setBooking(null)} />
      {playSplash && !splashDone && <Splash onDone={() => setSplashDone(true)} />}
    </>
  )
}
