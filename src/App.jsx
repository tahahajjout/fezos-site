import { useState } from 'react'
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
import { Modal } from './components/ui/Modal'
import { packs, serviceCategories } from './data/salon'

// Anything a "Réserver" can preselect: single services and packs.
const bookables = [...serviceCategories.flatMap((c) => c.services), ...packs]

export default function App() {
  // { serviceId } while the booking modal is open. The real form lands in step 10.
  const [booking, setBooking] = useState(null)
  const book = (serviceId = null) => setBooking({ serviceId })
  // Price-list tab lives here so treatment cards can open the right category.
  const [priceTab, setPriceTab] = useState(serviceCategories[0].id)
  const service = bookables.find((s) => s.id === booking?.serviceId)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-alabaster focus:px-4 focus:py-3"
      >
        Aller au contenu
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

      <Modal open={booking !== null} onClose={() => setBooking(null)} title="Réserver">
        <p className="text-stone">
          Soin sélectionné : <span className="text-charcoal">{service?.name ?? 'à choisir'}</span>
        </p>
        <p className="mt-4 text-meta text-stone">Le formulaire complet arrive à l’étape 10.</p>
      </Modal>
    </>
  )
}
