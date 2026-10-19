// Single source of truth for business content. Edit here, not in components.
// `confirmed: false` = placeholder to validate with the owner (CLAUDE.md §17).
// EN/AR strings are added in build step 11.

export const salon = {
  name: "Fezo's Beauty Lounge",
  tagline: 'Coiffure · Onglerie · Esthétique',
  instagram: { handle: '@fezos_beautylounge', url: 'https://www.instagram.com/fezos_beautylounge/' },
  phone: { display: '06 70 85 35 30', tel: '+212670853530' },
  whatsapp: '212670853530', // wa.me number, no "+"
  address: {
    street: 'Blad Tazi, Champs de Course, n°22 lotissement',
    city: 'Fès',
    postalCode: '30000',
    country: 'MA',
  },
  geo: { lat: 34.0377896, lng: -5.0162399 },
  mapsUrl: 'https://maps.app.goo.gl/Sid9PLjydTBSJF73A',
  mapsEmbed: 'https://maps.google.com/maps?q=34.0377896,-5.0162399&z=16&output=embed',
  rating: { value: 4.9, count: 29 },
  timeZone: 'Africa/Casablanca',
}

// Index = Date#getDay() (0 = dimanche). Times are "HH:MM" in salon.timeZone.
export const hours = [
  { day: 'Dimanche', open: '10:30', close: '20:00' },
  { day: 'Lundi', open: '10:30', close: '20:30' },
  { day: 'Mardi', open: '10:30', close: '20:00' },
  { day: 'Mercredi', open: '10:30', close: '20:00' },
  { day: 'Jeudi', open: '10:30', close: '20:00' },
  { day: 'Vendredi', open: '10:30', close: '20:00' },
  { day: 'Samedi', open: '10:30', close: '20:00' },
]

// Price list, grouped by tab. price: number (DH) | null → "Sur demande".
// duration in minutes | null.
export const serviceCategories = [
  {
    id: 'coiffure',
    label: 'Coiffure',
    services: [
      {
        id: 'lissage-bresilien',
        name: 'Lissage brésilien',
        description: 'Sans formol ni acide glyoxylique — protéines, filler et vitamines.',
        duration: 180,
        price: 780,
        confirmed: true,
      },
      { id: 'lissage-pro-filler', name: 'Lissage Pro Filler', description: 'Comble la fibre, brillance et discipline durables.', duration: 150, price: 900, confirmed: false },
      { id: 'soin-boucles', name: 'Soin hydratant boucles — Soin21', description: 'Hydratation intense et définition des boucles.', duration: 60, price: 250, confirmed: false },
      { id: 'soin-apres-ete', name: 'Soin réparateur après l’été', description: 'Répare les longueurs abîmées par le sel, le chlore et le soleil.', duration: 45, price: 200, confirmed: false },
      { id: 'brushing', name: 'Brushing', description: 'Lisse, wavy ou volume, selon votre envie.', duration: 45, price: 100, confirmed: false },
      { id: 'tresses', name: 'Tresses', description: 'Tresses classiques ou bohèmes.', duration: 60, price: 150, confirmed: false },
      { id: 'chignon-invitee', name: 'Chignon invitée', description: 'Coiffure de cérémonie pour mariages et fêtes.', duration: 60, price: null, confirmed: false },
    ],
  },
  {
    id: 'onglerie',
    label: 'Onglerie',
    services: [
      { id: 'biab', name: 'BIAB « clean & natural »', description: 'Renforcement de l’ongle naturel, fini net et discret.', duration: 75, price: 250, confirmed: false },
      { id: 'manucure', name: 'Manucure', description: 'Soin des cuticules, limage et vernis, pour des mains impeccables.', duration: 45, price: 120, confirmed: false },
      { id: 'pose', name: 'Pose', description: 'Gel ou capsules, forme et longueur sur mesure.', duration: 90, price: 300, confirmed: false },
      {
        id: 'pedicure-medicale',
        name: 'Pédicure médicale',
        description: 'Gamme Eucalyptus PN Pronails — massage des pieds inclus.',
        duration: 60,
        price: 250,
        confirmed: false,
      },
    ],
  },
  {
    id: 'visage',
    label: 'Visage & Regard',
    services: [
      { id: 'hydrafacial', name: 'Hydrafacial', description: 'Nettoie, exfolie et hydrate en profondeur — éclat immédiat.', duration: 60, price: 600, confirmed: false },
      { id: 'brow-lift', name: 'Brow Lift', description: 'Sourcils restructurés et disciplinés pour plusieurs semaines.', duration: 45, price: 250, confirmed: false },
      { id: 'lash-lift', name: 'Lash Lift', description: 'Recourbe et sublime vos cils naturels.', duration: 60, price: 250, confirmed: false },
    ],
  },
]

// The 4 numbered cards of "Nos soins". `category` links to the price-list tab.
export const treatments = [
  { id: 'coiffure', number: '01', title: 'Coiffure & Lissages', description: 'Lissages sans formol, soins réparateurs et brushings signature.', category: 'coiffure', image: 'coiffure' },
  { id: 'onglerie', number: '02', title: 'Onglerie', description: 'BIAB, manucure et poses, dans l’esprit « clean & natural ».', category: 'onglerie', image: 'onglerie' },
  { id: 'pedicure', number: '03', title: 'Pédicure médicale', description: 'En partenariat avec PN Pronails, massage des pieds inclus.', category: 'onglerie', image: 'pedicure' },
  { id: 'visage', number: '04', title: 'Visage & Regard', description: 'Hydrafacial, Brow Lift et Lash Lift pour un regard éclatant.', category: 'visage', image: 'visage' },
]

export const packs = [
  { id: 'mariee', number: '01', name: 'Pack Mariée', description: 'Coiffure, mise en beauté des mains et pieds, pour le grand jour.', price: 1500, confirmed: false, image: 'mariee' },
  { id: 'mains-pieds', number: '02', name: 'Pack Mains & Pieds', description: 'Manucure et pédicure médicale, massage des pieds offert.', price: 330, confirmed: false, image: 'mainsPieds' },
  { id: 'eclat', number: '03', name: 'Pack Éclat Visage', description: 'Hydrafacial suivi d’un Brow Lift pour un visage lumineux.', price: 780, confirmed: false, image: 'eclat' },
  { id: 'rentree', number: '04', name: 'Pack Rentrée', description: 'Soin réparateur après l’été, brushing et manucure.', price: 380, confirmed: false, image: 'rentree' },
]

// Limited offer banner. Hidden automatically once `endsAt` has passed (inclusive, salon time).
export const offer = {
  label: 'Offre du moment',
  text: 'Lissage brésilien',
  price: '780 DH',
  until: 'jusqu’au 12 octobre',
  startsAt: '2026-10-05',
  endsAt: '2026-10-12',
  serviceId: 'lissage-bresilien',
}

// "Pourquoi Fezo's" — taken from recurring themes in Google reviews.
export const promises = [
  { id: 'cafe', title: 'Café d’accueil', text: 'Café et eau offerts dès votre arrivée, le temps de vous installer.' },
  { id: 'ponctualite', title: 'Ponctualité', text: 'Votre rendez-vous est respecté à l’heure — votre temps compte.' },
  { id: 'massage', title: 'Massage des pieds offert', text: 'Inclus avec chaque manucure et pédicure.' },
  { id: 'produits', title: 'Produits professionnels', text: 'PN Pronails, Soin21, Hydrafacial — uniquement des gammes pro.' },
]

// Paraphrased from real Google review themes. Author first names are placeholders
// (confirmed: false) — replace with the real reviewers' first names before showing publicly.
export const reviews = [
  { id: 'r1', author: 'Salma', quote: 'Un accueil chaleureux, une équipe attentionnée : on se sent vraiment chouchoutée du début à la fin.', rating: 5, confirmed: false },
  { id: 'r2', author: 'Kenza', quote: 'Café et eau offerts à l’arrivée, et un rendez-vous respecté à la minute près. C’est rare.', rating: 5, confirmed: false },
  { id: 'r3', author: 'Imane', quote: 'Le massage des pieds offert avec la pédicure est un vrai moment de détente.', rating: 5, confirmed: false },
  { id: 'r4', author: 'Nadia', quote: 'Une décoration magnifique et une ambiance raffinée — on a envie d’y rester.', rating: 5, confirmed: false },
  { id: 'r5', author: 'Houda', quote: 'Lala Fatima Zohra vous reçoit avec le sourire, et Aziza a des doigts de fée pour le brushing.', rating: 5, confirmed: false },
]

export const featuredQuote = {
  text: 'On se sent chouchoutée dès la porte franchie.',
  source: 'Avis Google',
}

// Header + mobile menu. Anchors match the section ids.
export const nav = [
  { href: '#soins', label: 'Soins' },
  { href: '#visite', label: 'Visite 360°' },
  { href: '#packs', label: 'Packs' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]
