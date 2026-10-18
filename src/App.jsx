import { Reveal, RevealItem } from './components/ui/Reveal'

// Step 1 token preview — replaced by real sections from step 4.
export default function App() {
  return (
    <main className="container-site section-y">
      <Reveal stagger>
        <RevealItem className="flex flex-col gap-3">
          <span className="eyebrow">Beauty Lounge · Fès</span>
          <span className="gold-rule" />
        </RevealItem>
        <RevealItem as="h1" className="mt-8 text-display">
          Votre moment <em className="accent">beauté.</em>
        </RevealItem>
        <RevealItem as="p" className="mt-8 max-w-[40ch] text-body-l font-light text-stone">
          Coiffure, onglerie et soins visage dans un lounge pensé pour vous — au cœur de Champs de Course.
        </RevealItem>
        <RevealItem className="mt-6 price">780 DH</RevealItem>
      </Reveal>
    </main>
  )
}
