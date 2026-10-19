// Single source of truth for business content. Edit here, not in components.
// Text fields are { fr, en, ar }; FR is the default and the fallback.
// `confirmed: false` = placeholder to validate with the owner (CLAUDE.md §17).

export const salon = {
  name: "Fezo's Beauty Lounge",
  // Public URL of the site (canonical, hreflang, Open Graph). Change when the real domain is live.
  url: 'https://fezos-site.vercel.app',
  instagram: { handle: '@fezos_beautylounge', url: 'https://www.instagram.com/fezos_beautylounge/' },
  phone: { display: '06 70 85 35 30', tel: '+212670853530' },
  whatsapp: '212670853530', // wa.me number, no "+"
  address: {
    street: 'Blad Tazi, Champs de Course, n°22 lotissement',
    city: { fr: 'Fès', en: 'Fès', ar: 'فاس' },
    postalCode: '30000',
    country: 'MA',
  },
  geo: { lat: 34.0377896, lng: -5.0162399 },
  mapsUrl: 'https://maps.app.goo.gl/Sid9PLjydTBSJF73A',
  mapsEmbed: 'https://maps.google.com/maps?q=34.0377896,-5.0162399&z=16&output=embed',
  rating: { value: 4.9, count: 29 },
  timeZone: 'Africa/Casablanca',
}

// Index = Date#getDay() (0 = Sunday). Times are "HH:MM" in salon.timeZone. Day names come from Intl.
export const hours = [
  { open: '10:30', close: '20:00' },
  { open: '10:30', close: '20:30' },
  { open: '10:30', close: '20:00' },
  { open: '10:30', close: '20:00' },
  { open: '10:30', close: '20:00' },
  { open: '10:30', close: '20:00' },
  { open: '10:30', close: '20:00' },
]

// Price list, grouped by tab. price: number (DH) | null → "on request". duration: minutes | null.
export const serviceCategories = [
  {
    id: 'coiffure',
    label: { fr: 'Coiffure', en: 'Hair', ar: 'الشعر' },
    services: [
      {
        id: 'lissage-bresilien',
        name: { fr: 'Lissage brésilien', en: 'Brazilian straightening', ar: 'تمليس برازيلي' },
        description: {
          fr: 'Sans formol ni acide glyoxylique — protéines, filler et vitamines.',
          en: 'No formaldehyde, no glyoxylic acid — proteins, filler and vitamins.',
          ar: 'بدون فورمول ولا حمض الغليوكسيليك، بالبروتينات والفيلر والفيتامينات.',
        },
        duration: 180,
        price: 780,
        confirmed: true,
      },
      {
        id: 'lissage-pro-filler',
        name: { fr: 'Lissage Pro Filler', en: 'Pro Filler straightening', ar: 'تمليس برو فيلر' },
        description: {
          fr: 'Comble la fibre, brillance et discipline durables.',
          en: 'Fills the hair fibre for lasting shine and smoothness.',
          ar: 'يملأ ألياف الشعر للمعان ونعومة تدوم.',
        },
        duration: 150,
        price: 900,
        confirmed: false,
      },
      {
        id: 'soin-boucles',
        name: { fr: 'Soin hydratant boucles — Soin21', en: 'Curl hydration ritual — Soin21', ar: 'علاج ترطيب الشعر المجعد — Soin21' },
        description: {
          fr: 'Hydratation intense et définition des boucles.',
          en: 'Deep hydration and defined curls.',
          ar: 'ترطيب عميق وتحديد للتموجات.',
        },
        duration: 60,
        price: 250,
        confirmed: false,
      },
      {
        id: 'soin-apres-ete',
        name: { fr: 'Soin réparateur après l’été', en: 'After-summer repair treatment', ar: 'علاج إصلاحي بعد الصيف' },
        description: {
          fr: 'Répare les longueurs abîmées par le sel, le chlore et le soleil.',
          en: 'Repairs lengths damaged by salt, chlorine and sun.',
          ar: 'يصلح أطراف الشعر المتضررة من الملح والكلور والشمس.',
        },
        duration: 45,
        price: 200,
        confirmed: false,
      },
      {
        id: 'brushing',
        name: { fr: 'Brushing', en: 'Blow-dry', ar: 'براشينغ' },
        description: {
          fr: 'Lisse, wavy ou volume, selon votre envie.',
          en: 'Sleek, wavy or voluminous, as you like it.',
          ar: 'أملس أو مموج أو بحجم، حسب رغبتك.',
        },
        duration: 45,
        price: 100,
        confirmed: false,
      },
      {
        id: 'tresses',
        name: { fr: 'Tresses', en: 'Braids', ar: 'ضفائر' },
        description: {
          fr: 'Tresses classiques ou bohèmes.',
          en: 'Classic or bohemian braids.',
          ar: 'ضفائر كلاسيكية أو بوهيمية.',
        },
        duration: 60,
        price: 150,
        confirmed: false,
      },
      {
        id: 'chignon-invitee',
        name: { fr: 'Chignon invitée', en: 'Wedding guest updo', ar: 'تسريحة شينيون للمدعوات' },
        description: {
          fr: 'Coiffure de cérémonie pour mariages et fêtes.',
          en: 'Occasion hair for weddings and celebrations.',
          ar: 'تسريحة للمناسبات والأعراس والحفلات.',
        },
        duration: 60,
        price: null,
        confirmed: false,
      },
    ],
  },
  {
    id: 'onglerie',
    label: { fr: 'Onglerie', en: 'Nails', ar: 'الأظافر' },
    services: [
      {
        id: 'biab',
        name: { fr: 'BIAB « clean & natural »', en: 'BIAB “clean & natural”', ar: 'BIAB «clean & natural»' },
        description: {
          fr: 'Renforcement de l’ongle naturel, fini net et discret.',
          en: 'Strengthens the natural nail with a clean, discreet finish.',
          ar: 'تقوية الظفر الطبيعي بلمسة نظيفة وناعمة.',
        },
        duration: 75,
        price: 250,
        confirmed: false,
      },
      {
        id: 'manucure',
        name: { fr: 'Manucure', en: 'Manicure', ar: 'مانيكير' },
        description: {
          fr: 'Soin des cuticules, limage et vernis, pour des mains impeccables.',
          en: 'Cuticle care, shaping and polish for impeccable hands.',
          ar: 'عناية بالجلد المحيط، برد وطلاء، لأيدٍ أنيقة.',
        },
        duration: 45,
        price: 120,
        confirmed: false,
      },
      {
        id: 'pose',
        name: { fr: 'Pose', en: 'Nail extensions', ar: 'تركيب الأظافر' },
        description: {
          fr: 'Gel ou capsules, forme et longueur sur mesure.',
          en: 'Gel or tips, shape and length made to measure.',
          ar: 'جل أو كبسولات، بالشكل والطول الذي تختارينه.',
        },
        duration: 90,
        price: 300,
        confirmed: false,
      },
      {
        id: 'pedicure-medicale',
        name: { fr: 'Pédicure médicale', en: 'Medical pedicure', ar: 'باديكير طبي' },
        description: {
          fr: 'Gamme Eucalyptus PN Pronails — massage des pieds inclus.',
          en: 'PN Pronails Eucalyptus range — foot massage included.',
          ar: 'مجموعة Eucalyptus من PN Pronails، مع تدليك القدمين.',
        },
        duration: 60,
        price: 250,
        confirmed: false,
      },
    ],
  },
  {
    id: 'visage',
    label: { fr: 'Visage & Regard', en: 'Face & Eyes', ar: 'الوجه والنظرة' },
    services: [
      {
        id: 'hydrafacial',
        name: { fr: 'Hydrafacial', en: 'Hydrafacial', ar: 'هيدرافيشل' },
        description: {
          fr: 'Nettoie, exfolie et hydrate en profondeur — éclat immédiat.',
          en: 'Deep cleanse, exfoliation and hydration — instant glow.',
          ar: 'تنظيف وتقشير وترطيب عميق لإشراقة فورية.',
        },
        duration: 60,
        price: 600,
        confirmed: false,
      },
      {
        id: 'brow-lift',
        name: { fr: 'Brow Lift', en: 'Brow Lift', ar: 'رفع الحواجب' },
        description: {
          fr: 'Sourcils restructurés et disciplinés pour plusieurs semaines.',
          en: 'Reshaped, groomed brows that last for weeks.',
          ar: 'حواجب منظمة ومرتبة لعدة أسابيع.',
        },
        duration: 45,
        price: 250,
        confirmed: false,
      },
      {
        id: 'lash-lift',
        name: { fr: 'Lash Lift', en: 'Lash Lift', ar: 'رفع الرموش' },
        description: {
          fr: 'Recourbe et sublime vos cils naturels.',
          en: 'Curls and enhances your natural lashes.',
          ar: 'يرفع رموشك الطبيعية ويبرزها.',
        },
        duration: 60,
        price: 250,
        confirmed: false,
      },
    ],
  },
]

// The 4 numbered cards of "Nos soins". `category` links to the price-list tab.
export const treatments = [
  {
    id: 'coiffure',
    number: '01',
    title: { fr: 'Coiffure & Lissages', en: 'Hair & Straightening', ar: 'تصفيف وتمليس الشعر' },
    description: {
      fr: 'Lissages sans formol, soins réparateurs et brushings signature.',
      en: 'Formaldehyde-free straightening, repair rituals and signature blow-dries.',
      ar: 'تمليس بدون فورمول، علاجات إصلاحية وبراشينغ مميز.',
    },
    category: 'coiffure',
    image: 'coiffure',
  },
  {
    id: 'onglerie',
    number: '02',
    title: { fr: 'Onglerie', en: 'Nails', ar: 'الأظافر' },
    description: {
      fr: 'BIAB, manucure et poses, dans l’esprit « clean & natural ».',
      en: 'BIAB, manicures and extensions, in a “clean & natural” spirit.',
      ar: 'BIAB ومانيكير وتركيب، بروح «clean & natural».',
    },
    category: 'onglerie',
    image: 'onglerie',
  },
  {
    id: 'pedicure',
    number: '03',
    title: { fr: 'Pédicure médicale', en: 'Medical pedicure', ar: 'باديكير طبي' },
    description: {
      fr: 'En partenariat avec PN Pronails, massage des pieds inclus.',
      en: 'In partnership with PN Pronails, foot massage included.',
      ar: 'بشراكة مع PN Pronails، مع تدليك القدمين.',
    },
    category: 'onglerie',
    image: 'pedicure',
  },
  {
    id: 'visage',
    number: '04',
    title: { fr: 'Visage & Regard', en: 'Face & Eyes', ar: 'الوجه والنظرة' },
    description: {
      fr: 'Hydrafacial, Brow Lift et Lash Lift pour un regard éclatant.',
      en: 'Hydrafacial, Brow Lift and Lash Lift for a radiant look.',
      ar: 'هيدرافيشل ورفع الحواجب والرموش لنظرة مشرقة.',
    },
    category: 'visage',
    image: 'visage',
  },
]

export const packs = [
  {
    id: 'mariee',
    number: '01',
    name: { fr: 'Pack Mariée', en: 'Bridal pack', ar: 'باقة العروس' },
    description: {
      fr: 'Coiffure, mise en beauté des mains et pieds, pour le grand jour.',
      en: 'Hair, hands and feet, ready for the big day.',
      ar: 'تسريحة وعناية باليدين والقدمين، ليومك الكبير.',
    },
    price: 1500,
    confirmed: false,
    image: 'mariee',
  },
  {
    id: 'mains-pieds',
    number: '02',
    name: { fr: 'Pack Mains & Pieds', en: 'Hands & Feet pack', ar: 'باقة اليدين والقدمين' },
    description: {
      fr: 'Manucure et pédicure médicale, massage des pieds offert.',
      en: 'Manicure and medical pedicure, foot massage included.',
      ar: 'مانيكير وباديكير طبي، مع تدليك القدمين هدية.',
    },
    price: 330,
    confirmed: false,
    image: 'mainsPieds',
  },
  {
    id: 'eclat',
    number: '03',
    name: { fr: 'Pack Éclat Visage', en: 'Radiant Face pack', ar: 'باقة إشراقة الوجه' },
    description: {
      fr: 'Hydrafacial suivi d’un Brow Lift pour un visage lumineux.',
      en: 'Hydrafacial followed by a Brow Lift for a luminous face.',
      ar: 'هيدرافيشل يليه رفع الحواجب لوجه مشرق.',
    },
    price: 780,
    confirmed: false,
    image: 'eclat',
  },
  {
    id: 'rentree',
    number: '04',
    name: { fr: 'Pack Rentrée', en: 'Back-to-routine pack', ar: 'باقة الدخول' },
    description: {
      fr: 'Soin réparateur après l’été, brushing et manucure.',
      en: 'After-summer repair treatment, blow-dry and manicure.',
      ar: 'علاج إصلاحي بعد الصيف، براشينغ ومانيكير.',
    },
    price: 380,
    confirmed: false,
    image: 'rentree',
  },
]

// Limited offer banner. Hidden automatically once `endsAt` has passed (inclusive, salon time).
// Text comes from the service name + i18n; the end date is formatted per language.
export const offer = {
  serviceId: 'lissage-bresilien',
  price: 780,
  startsAt: '2026-10-05',
  endsAt: '2026-10-12',
}

// "Pourquoi Fezo's" — taken from recurring themes in Google reviews.
export const promises = [
  {
    id: 'cafe',
    title: { fr: 'Café d’accueil', en: 'A coffee on arrival', ar: 'قهوة الترحيب' },
    text: {
      fr: 'Café et eau offerts dès votre arrivée, le temps de vous installer.',
      en: 'Coffee and water offered as soon as you arrive, while you settle in.',
      ar: 'قهوة وماء مجاناً عند وصولك، ريثما تستقرين.',
    },
  },
  {
    id: 'ponctualite',
    title: { fr: 'Ponctualité', en: 'On time', ar: 'احترام الموعد' },
    text: {
      fr: 'Votre rendez-vous est respecté à l’heure — votre temps compte.',
      en: 'Your appointment starts on time — your time matters.',
      ar: 'نحترم موعدك بالدقيقة، فوقتك مهم.',
    },
  },
  {
    id: 'massage',
    title: { fr: 'Massage des pieds offert', en: 'Complimentary foot massage', ar: 'تدليك القدمين هدية' },
    text: {
      fr: 'Inclus avec chaque manucure et pédicure.',
      en: 'Included with every manicure and pedicure.',
      ar: 'مع كل مانيكير وباديكير.',
    },
  },
  {
    id: 'produits',
    title: { fr: 'Produits professionnels', en: 'Professional products', ar: 'منتجات احترافية' },
    text: {
      fr: 'PN Pronails, Soin21, Hydrafacial — uniquement des gammes pro.',
      en: 'PN Pronails, Soin21, Hydrafacial — professional ranges only.',
      ar: 'PN Pronails وSoin21 وHydrafacial، مجموعات احترافية فقط.',
    },
  },
]

// Paraphrased from real Google review themes. Author first names are placeholders
// (confirmed: false) — replace with the real reviewers' first names before showing publicly.
export const reviews = [
  {
    id: 'r1',
    author: 'Salma',
    quote: {
      fr: 'Un accueil chaleureux, une équipe attentionnée : on se sent vraiment chouchoutée du début à la fin.',
      en: 'A warm welcome and an attentive team: you feel truly pampered from start to finish.',
      ar: 'استقبال دافئ وفريق مهتم، تشعرين بالدلال من البداية إلى النهاية.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r2',
    author: 'Kenza',
    quote: {
      fr: 'Café et eau offerts à l’arrivée, et un rendez-vous respecté à la minute près. C’est rare.',
      en: 'Coffee and water on arrival, and an appointment kept to the minute. That’s rare.',
      ar: 'قهوة وماء عند الوصول، وموعد محترم بالدقيقة. وهذا نادر.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r3',
    author: 'Imane',
    quote: {
      fr: 'Le massage des pieds offert avec la pédicure est un vrai moment de détente.',
      en: 'The foot massage that comes with the pedicure is a real moment of calm.',
      ar: 'تدليك القدمين مع الباديكير لحظة استرخاء حقيقية.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r4',
    author: 'Nadia',
    quote: {
      fr: 'Une décoration magnifique et une ambiance raffinée — on a envie d’y rester.',
      en: 'Beautiful decor and a refined atmosphere — you want to stay.',
      ar: 'ديكور رائع وأجواء راقية، تتمنين البقاء.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r5',
    author: 'Houda',
    quote: {
      fr: 'Lala Fatima Zohra vous reçoit avec le sourire, et Aziza a des doigts de fée pour le brushing.',
      en: 'Lala Fatima Zohra greets you with a smile, and Aziza works magic with a blow-dry.',
      ar: 'لالة فاطمة الزهراء تستقبلك بابتسامة، وعزيزة أناملها ساحرة في البراشينغ.',
    },
    rating: 5,
    confirmed: false,
  },
]

export const featuredQuote = {
  fr: 'On se sent chouchoutée dès la porte franchie.',
  en: 'You feel pampered the moment you walk in.',
  ar: 'تشعرين بالدلال منذ أن تخطي عتبة الباب.',
}

// Header + mobile menu. Anchors match the section ids; labels live in i18n under nav.<id>.
export const nav = [
  { id: 'soins', href: '#soins' },
  { id: 'visite', href: '#visite' },
  { id: 'packs', href: '#packs' },
  { id: 'avis', href: '#avis' },
  { id: 'contact', href: '#contact' },
]
