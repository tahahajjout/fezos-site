import { useState } from 'react'
import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { OfferBanner } from './components/sections/OfferBanner'
import { Treatments } from './components/sections/Treatments'
import { Modal } from './components/ui/Modal'
import { serviceCategories } from './data/salon'
import Preview from './Preview'

const services = serviceCategories.flatMap((c) => c.services)

export default function App() {
  // { serviceId } while the booking modal is open. The real form lands in step 10.
  const [booking, setBooking] = useState(null)
  const book = (serviceId = null) => setBooking({ serviceId })
  // Price-list tab lives here so treatment cards can open the right category.
  const [priceTab, setPriceTab] = useState(serviceCategories[0].id)
  const service = services.find((s) => s.id === booking?.serviceId)

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
        <Preview onBook={book} tab={priceTab} setTab={setPriceTab} />
      </main>

      <Modal open={booking !== null} onClose={() => setBooking(null)} title="Réserver">
        <p className="text-stone">
          Soin sélectionné : <span className="text-charcoal">{service?.name ?? 'à choisir'}</span>
        </p>
        <p className="mt-4 text-meta text-stone">Le formulaire complet arrive à l’étape 10.</p>
      </Modal>
    </>
  )
}
