// Single source of truth for business content. Edit here, not in components.
// Text fields are { fr, en, ar }; FR is the default and the fallback.
// `confirmed: false` = placeholder to validate with the owner (CLAUDE.md §17).
// Sources (Nov 2026): Google Maps listing, Facebook "À propos", Instagram @beautyparkfez.

export const salon = {
  name: 'Beauty Park Fez',
  // The logo's two lines (Latin in every language): splash, header, book cover, footer.
  // "The Art of Beauty" is the salon's own line (Facebook).
  wordmark: { name: 'Beauty Park', tagline: 'The Art of Beauty' },
  // Public URL of the site (canonical, hreflang, Open Graph). Change when the real domain is live.
  url: 'https://beautypark-fez.vercel.app',
  instagram: { handle: '@beautyparkfez', url: 'https://www.instagram.com/beautyparkfez/' },
  phone: { display: '05 35 65 27 87', tel: '+212535652787' },
  // The mobile listed for bookings in the Instagram bio — confirm it is the salon's WhatsApp.
  whatsapp: '212661246105', // wa.me number, no "+"
  address: {
    street: 'Rue Lalla Nezha, Ville Nouvelle',
    city: { fr: 'Fès', en: 'Fès', ar: 'فاس' },
    postalCode: '30050',
    country: 'MA',
  },
  geo: { lat: 34.035528, lng: -5.0072277 },
  mapsUrl: 'https://maps.google.com/?cid=5828499719354901220',
  mapsEmbed: 'https://maps.google.com/maps?q=34.035528,-5.0072277&z=16&output=embed',
  rating: { value: 4.5, count: 99 },
  timeZone: 'Africa/Casablanca',
}

// Index = Date#getDay() (0 = Sunday). Times are "HH:MM" in salon.timeZone; null = closed.
export const hours = [
  { open: '10:00', close: '20:00' },
  null,
  { open: '10:00', close: '20:00' },
  { open: '10:00', close: '20:00' },
  { open: '10:00', close: '20:00' },
  { open: '10:00', close: '20:00' },
  { open: '10:00', close: '20:00' },
]

// Price list, grouped by tab. price: number (DH) | null → "on request". duration: minutes | null.
// Services come from the salon's Instagram highlights and Google reviews; prices are placeholders
// except where a review quoted one (still to confirm).
export const serviceCategories = [
  {
    id: 'hammam',
    label: { fr: 'Hammam & Massage', en: 'Hammam & Massage', ar: 'الحمام والتدليك' },
    services: [
      {
        id: 'hammam-traditionnel',
        name: { fr: 'Hammam traditionnel', en: 'Traditional hammam', ar: 'حمام تقليدي' },
        description: {
          fr: 'Savon noir et gommage au kessa, en cabine individuelle.',
          en: 'Black soap and kessa scrub, in a private room.',
          ar: 'صابون بلدي وتقشير بالكيس، في غرفة خاصة.',
        },
        duration: 60,
        price: 120,
        confirmed: false,
      },
      {
        id: 'hammam-rituel',
        name: { fr: 'Hammam rituel', en: 'Hammam ritual', ar: 'طقس الحمام' },
        description: {
          fr: 'Savon noir, gommage et enveloppement au rhassoul pour une peau de soie.',
          en: 'Black soap, scrub and a rhassoul wrap for silky skin.',
          ar: 'صابون بلدي وتقشير ولفافة الغاسول لبشرة حريرية.',
        },
        duration: 90,
        price: 200,
        confirmed: false,
      },
      {
        id: 'massage-relaxant',
        name: { fr: 'Massage relaxant', en: 'Relaxing massage', ar: 'تدليك للاسترخاء' },
        description: {
          fr: 'Un massage du corps aux huiles pour relâcher les tensions.',
          en: 'A full-body oil massage to release tension.',
          ar: 'تدليك للجسم بالزيوت لإزالة التوتر.',
        },
        duration: 60,
        price: 250,
        confirmed: false,
      },
    ],
  },
  {
    id: 'coiffure',
    label: { fr: 'Coiffure', en: 'Hair', ar: 'الشعر' },
    services: [
      {
        id: 'brushing',
        name: { fr: 'Brushing', en: 'Blow-dry', ar: 'براشينغ' },
        description: {
          fr: 'Lisse, wavy ou volume, selon votre envie.',
          en: 'Sleek, wavy or voluminous, as you like it.',
          ar: 'أملس أو مموج أو بحجم، حسب رغبتك.',
        },
        duration: 45,
        price: 80,
        confirmed: false,
      },
      {
        id: 'balayage',
        name: { fr: 'Balayage', en: 'Balayage', ar: 'بالياج' },
        description: {
          fr: 'Des reflets lumineux et naturels, posés à main levée.',
          en: 'Natural, luminous highlights, painted by hand.',
          ar: 'خصلات مضيئة وطبيعية بلمسة يدوية.',
        },
        duration: 180,
        price: null,
        confirmed: false,
      },
      {
        id: 'coloration',
        name: { fr: 'Coloration', en: 'Colour', ar: 'صباغة' },
        description: {
          fr: 'Une couleur uniforme et brillante, des racines aux pointes.',
          en: 'Even, glossy colour from roots to ends.',
          ar: 'لون موحد ولامع من الجذور إلى الأطراف.',
        },
        duration: 120,
        price: 300,
        confirmed: false,
      },
      {
        id: 'botox-capillaire',
        name: { fr: 'Botox capillaire naturel', en: 'Natural hair botox', ar: 'بوتوكس طبيعي للشعر' },
        description: {
          fr: 'Répare la fibre et rend aux longueurs leur brillance.',
          en: 'Repairs the fibre and brings back shine to the lengths.',
          ar: 'يصلح ألياف الشعر ويعيد اللمعان إلى الأطراف.',
        },
        duration: 120,
        price: 500,
        confirmed: false,
      },
      {
        id: 'coiffure-soiree',
        name: { fr: 'Coiffure de soirée', en: 'Occasion hair', ar: 'تسريحة السهرة' },
        description: {
          fr: 'Chignon ou ondulations pour un mariage ou une fête.',
          en: 'An updo or waves for a wedding or a celebration.',
          ar: 'شينيون أو تموجات لعرس أو حفل.',
        },
        duration: 60,
        price: null,
        confirmed: false,
      },
    ],
  },
  {
    id: 'onglerie',
    label: { fr: 'Ongles', en: 'Nails', ar: 'الأظافر' },
    services: [
      {
        id: 'manucure',
        name: { fr: 'Manucure', en: 'Manicure', ar: 'مانيكير' },
        description: {
          fr: 'Soin des cuticules, limage et vernis, pour des mains impeccables.',
          en: 'Cuticle care, shaping and polish for impeccable hands.',
          ar: 'عناية بالجلد المحيط، برد وطلاء، لأيدٍ أنيقة.',
        },
        duration: 45,
        price: 100,
        confirmed: false,
      },
      {
        id: 'pedicure',
        name: { fr: 'Pédicure', en: 'Pedicure', ar: 'باديكير' },
        description: {
          fr: 'Un vrai moment de détente, sans se presser.',
          en: 'A truly relaxing moment, never rushed.',
          ar: 'لحظة استرخاء حقيقية، دون استعجال.',
        },
        duration: 60,
        price: 150,
        confirmed: false,
      },
      {
        id: 'semi-permanent',
        name: { fr: 'Vernis semi-permanent', en: 'Gel polish', ar: 'طلاء شبه دائم' },
        description: {
          fr: 'Une couleur nette qui tient plusieurs semaines.',
          en: 'Clean colour that lasts for weeks.',
          ar: 'لون أنيق يدوم لأسابيع.',
        },
        duration: 60,
        price: 120,
        confirmed: false,
      },
      {
        id: 'capsules',
        name: { fr: 'Pose de capsules', en: 'Nail tips', ar: 'تركيب الكبسولات' },
        description: {
          fr: 'Forme et longueur sur mesure.',
          en: 'Shape and length made to measure.',
          ar: 'بالشكل والطول الذي تختارينه.',
        },
        duration: 90,
        price: 220, // quoted in a Google review
        confirmed: false,
      },
    ],
  },
  {
    id: 'visage',
    label: { fr: 'Visage & Maquillage', en: 'Face & Make-up', ar: 'الوجه والمكياج' },
    services: [
      {
        id: 'soin-visage',
        name: { fr: 'Soin du visage', en: 'Facial', ar: 'علاج الوجه' },
        description: {
          fr: 'Nettoyage, gommage et masque, pour un teint frais et lumineux.',
          en: 'Cleanse, exfoliation and mask for a fresh, glowing complexion.',
          ar: 'تنظيف وتقشير وقناع لبشرة نضرة ومشرقة.',
        },
        duration: 60,
        price: 300,
        confirmed: false,
      },
      {
        id: 'maquillage',
        name: { fr: 'Maquillage', en: 'Make-up', ar: 'مكياج' },
        description: {
          fr: 'Un maquillage soirée ou naturel, adapté à votre teint.',
          en: 'Evening or natural make-up, matched to your skin.',
          ar: 'مكياج سهرة أو طبيعي يناسب بشرتك.',
        },
        duration: 60,
        price: 300,
        confirmed: false,
      },
      {
        id: 'epilation',
        name: { fr: 'Épilation', en: 'Waxing', ar: 'إزالة الشعر' },
        description: {
          fr: 'Visage ou corps, selon les zones.',
          en: 'Face or body, by area.',
          ar: 'للوجه أو الجسم، حسب المنطقة.',
        },
        duration: 30,
        price: null,
        confirmed: false,
      },
    ],
  },
]

// The 4 numbered cards of "Nos soins". `category` links to the price-list tab.
export const treatments = [
  {
    id: 'hammam',
    number: '01',
    title: { fr: 'Hammam & Massage', en: 'Hammam & Massage', ar: 'الحمام والتدليك' },
    description: {
      fr: 'Savon noir, gommage au kessa et massages, en cabine individuelle.',
      en: 'Black soap, kessa scrub and massages, in a private room.',
      ar: 'صابون بلدي وتقشير بالكيس وتدليك، في غرفة خاصة.',
    },
    category: 'hammam',
    image: 'hammam',
  },
  {
    id: 'coiffure',
    number: '02',
    title: { fr: 'Coiffure & Couleur', en: 'Hair & Colour', ar: 'تصفيف وصباغة الشعر' },
    description: {
      fr: 'Brushings, balayages, colorations et soins réparateurs.',
      en: 'Blow-dries, balayage, colour and repair treatments.',
      ar: 'براشينغ وبالياج وصباغة وعلاجات إصلاحية.',
    },
    category: 'coiffure',
    image: 'coiffure',
  },
  {
    id: 'onglerie',
    number: '03',
    title: { fr: 'Ongles', en: 'Nails', ar: 'الأظافر' },
    description: {
      fr: 'Manucure, pédicure, semi-permanent et capsules.',
      en: 'Manicure, pedicure, gel polish and tips.',
      ar: 'مانيكير وباديكير وطلاء شبه دائم وكبسولات.',
    },
    category: 'onglerie',
    image: 'onglerie',
  },
  {
    id: 'visage',
    number: '04',
    title: { fr: 'Visage & Maquillage', en: 'Face & Make-up', ar: 'الوجه والمكياج' },
    description: {
      fr: 'Soins du visage, maquillage et épilation.',
      en: 'Facials, make-up and waxing.',
      ar: 'علاجات الوجه والمكياج وإزالة الشعر.',
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
      fr: 'Le hammam de la mariée, puis maquillage et coiffure pour le grand jour.',
      en: 'The bride’s hammam, then make-up and hair for the big day.',
      ar: 'حمام العروس، ثم المكياج والتسريحة ليومك الكبير.',
    },
    price: null,
    confirmed: false,
    image: 'mariee',
  },
  {
    id: 'detente',
    number: '02',
    name: { fr: 'Pack Détente', en: 'Unwind pack', ar: 'باقة الاسترخاء' },
    description: {
      fr: 'Hammam, massage et brushing, en un seul rendez-vous.',
      en: 'Hammam, massage and blow-dry, in a single visit.',
      ar: 'حمام وتدليك وبراشينغ، في موعد واحد.',
    },
    price: 230, // the promo price quoted in a Google review
    confirmed: false,
    image: 'detente',
  },
  {
    id: 'mains-pieds',
    number: '03',
    name: { fr: 'Pack Mains & Pieds', en: 'Hands & Feet pack', ar: 'باقة اليدين والقدمين' },
    description: {
      fr: 'Manucure et pédicure, pour des mains et des pieds soignés.',
      en: 'Manicure and pedicure, for well-cared-for hands and feet.',
      ar: 'مانيكير وباديكير، ليدين وقدمين بأبهى حلة.',
    },
    price: 220,
    confirmed: false,
    image: 'mainsPieds',
  },
  {
    id: 'eclat',
    number: '04',
    name: { fr: 'Pack Éclat', en: 'Glow pack', ar: 'باقة الإشراقة' },
    description: {
      fr: 'Soin du visage suivi d’un maquillage, pour briller à votre soirée.',
      en: 'A facial followed by make-up, to shine at your evening out.',
      ar: 'علاج للوجه يليه مكياج، لتتألقي في سهرتك.',
    },
    price: 500,
    confirmed: false,
    image: 'eclat',
  },
]

// "Trouver mon soin": step 1 picks an area, step 2 a wish; each wish points to a bookable id (service or pack).
export const finder = [
  {
    id: 'detente',
    image: 'hammam', // images.treatments key
    label: { fr: 'Me détendre', en: 'Unwind', ar: 'الاسترخاء' },
    wishes: [
      { serviceId: 'hammam-traditionnel', label: { fr: 'Un vrai hammam marocain', en: 'A true Moroccan hammam', ar: 'حمام مغربي أصيل' } },
      { serviceId: 'hammam-rituel', label: { fr: 'Une peau douce et purifiée', en: 'Soft, purified skin', ar: 'بشرة ناعمة ونقية' } },
      { serviceId: 'massage-relaxant', label: { fr: 'Relâcher les tensions', en: 'Release tension', ar: 'التخلص من التوتر' } },
      { serviceId: 'detente', label: { fr: 'Tout, en un seul rendez-vous', en: 'Everything, in one visit', ar: 'كل شيء في موعد واحد' } },
    ],
  },
  {
    id: 'cheveux',
    image: 'coiffure', // images.treatments key
    label: { fr: 'Mes cheveux', en: 'My hair', ar: 'شعري' },
    wishes: [
      { serviceId: 'brushing', label: { fr: 'Un brushing impeccable', en: 'A flawless blow-dry', ar: 'براشينغ مثالي' } },
      { serviceId: 'balayage', label: { fr: 'Des reflets lumineux', en: 'Luminous highlights', ar: 'خصلات مضيئة' } },
      { serviceId: 'botox-capillaire', label: { fr: 'Des cheveux réparés et brillants', en: 'Repaired, shiny hair', ar: 'شعر مُصلَح ولامع' } },
      { serviceId: 'coiffure-soiree', label: { fr: 'Une coiffure pour une fête', en: 'Hair for a celebration', ar: 'تسريحة لحفل' } },
    ],
  },
  {
    id: 'beaute',
    image: 'visage', // images.treatments key
    label: { fr: 'Ma beauté', en: 'My beauty', ar: 'جمالي' },
    wishes: [
      { serviceId: 'soin-visage', label: { fr: 'Un teint éclatant', en: 'A radiant complexion', ar: 'بشرة مشرقة' } },
      { serviceId: 'maquillage', label: { fr: 'Un maquillage pour un événement', en: 'Make-up for an event', ar: 'مكياج لمناسبة' } },
      { serviceId: 'capsules', label: { fr: 'Des ongles longs', en: 'Long nails', ar: 'أظافر طويلة' } },
      { serviceId: 'mains-pieds', label: { fr: 'Des mains et des pieds soignés', en: 'Cared-for hands and feet', ar: 'يدان وقدمان بعناية' } },
    ],
  },
]

// Team members named in Google reviews. Typographic cards, no portraits until the salon sends real photos.
export const team = [
  {
    id: 'latifa',
    name: 'Latifa',
    role: { fr: 'Fondatrice & accueil', en: 'Founder & welcome', ar: 'المؤسسة والاستقبال' },
    text: {
      fr: 'Nos clientes la décrivent adorable et toujours à l’écoute : elle veille à ce que chacune reparte comblée.',
      en: 'Clients describe her as lovely and always listening: she makes sure every woman leaves delighted.',
      ar: 'تصفها زبوناتنا بالرائعة والمصغية دائماً، وتحرص على أن تغادر كل واحدة راضية.',
    },
    serviceId: null,
  },
  {
    id: 'afef',
    name: 'Afef',
    role: { fr: 'Hammam & gommage', en: 'Hammam & scrub', ar: 'الحمام والتقشير' },
    text: {
      fr: 'Citée dans les avis pour ses gommages, minutieux et tout en douceur.',
      en: 'Mentioned in reviews for her scrubs, thorough and gentle.',
      ar: 'تُذكر في التقييمات بتقشيرها الدقيق واللطيف.',
    },
    serviceId: 'hammam-traditionnel',
  },
  {
    id: 'hajar',
    name: 'Hajar',
    role: { fr: 'Massage', en: 'Massage', ar: 'التدليك' },
    text: {
      fr: 'Ses massages reviennent souvent dans les avis : une vraie parenthèse de détente.',
      en: 'Her massages come up often in reviews: a true pause to unwind.',
      ar: 'تدليكها يتكرر ذكره في التقييمات: استراحة حقيقية للاسترخاء.',
    },
    serviceId: 'massage-relaxant',
  },
]

// Gift card amounts in DH. The offer itself is to confirm with the owner.
export const giftCard = { amounts: [300, 500, 1000], confirmed: false }

// Limited offer banner. Hidden automatically once `endsAt` has passed (inclusive, salon time).
// Text comes from the service/pack name + i18n; the end date is formatted per language.
// Price from a promo quoted in a Google review; the dates are placeholders.
export const offer = {
  serviceId: 'detente',
  price: 230,
  startsAt: '2026-11-12',
  endsAt: '2026-11-30',
}

// "Pourquoi Beauty Park" — taken from recurring themes in Google reviews.
// `icon` is one of the names in Why.jsx's ICONS.
export const promises = [
  {
    id: 'femmes',
    icon: 'flower',
    title: { fr: '100 % femmes', en: 'Women only', ar: 'للنساء فقط' },
    text: {
      fr: 'Un lieu pensé par et pour les femmes, où l’on se sent à l’aise du hammam au brushing.',
      en: 'A place made by and for women, where you feel at ease from the hammam to the blow-dry.',
      ar: 'مكان صُمم من النساء وللنساء، تشعرين فيه بالراحة من الحمام إلى البراشينغ.',
    },
  },
  {
    id: 'cabine',
    icon: 'door',
    title: { fr: 'Soins en cabine individuelle', en: 'Private treatment rooms', ar: 'علاجات في غرف خاصة' },
    text: {
      fr: 'Chaque soin se fait en privé, jamais dans un espace collectif.',
      en: 'Every treatment is private, never in a shared space.',
      ar: 'كل علاج يتم على انفراد، وليس في فضاء مشترك.',
    },
  },
  {
    id: 'proprete',
    icon: 'sparkles',
    title: { fr: 'Moderne et impeccable', en: 'Modern and spotless', ar: 'عصري ونظيف' },
    text: {
      fr: 'Un institut moderne, que nos clientes trouvent très propre.',
      en: 'A modern institute that clients find very clean.',
      ar: 'مركز عصري تجده زبوناتنا نظيفاً جداً.',
    },
  },
  {
    id: 'prix',
    icon: 'badge',
    title: { fr: 'Des prix justes', en: 'Fair prices', ar: 'أسعار معقولة' },
    text: {
      fr: 'Des prestations de qualité à des tarifs raisonnables, et des promos régulières.',
      en: 'Quality treatments at reasonable prices, with regular offers.',
      ar: 'خدمات عالية الجودة بأسعار معقولة، وعروض منتظمة.',
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
      fr: 'La propriétaire est adorable et à l’écoute : on se sent bien accueillie, entre de bonnes mains.',
      en: 'The owner is lovely and attentive: you feel welcome and in good hands.',
      ar: 'صاحبة المركز رائعة ومصغية: تشعرين بالترحيب وبأنك في أيادٍ أمينة.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r2',
    author: 'Kenza',
    quote: {
      fr: 'Du hammam au massage, sans oublier le brushing : tout était parfait, dans un institut très propre.',
      en: 'From the hammam to the massage and the blow-dry: everything was perfect, in a very clean institute.',
      ar: 'من الحمام إلى التدليك والبراشينغ: كل شيء كان مثالياً، في مركز نظيف جداً.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r3',
    author: 'Imane',
    quote: {
      fr: 'Venues sans rendez-vous pour une pédicure, nous avons été prises en charge tout de suite. Très relaxant.',
      en: 'We came in for a pedicure without booking and were looked after right away. Very relaxing.',
      ar: 'جئنا لباديكير دون موعد وتم الاهتمام بنا فوراً. تجربة مريحة جداً.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r4',
    author: 'Nadia',
    quote: {
      fr: 'Cliente fidèle depuis des années, pour la coiffure, les balayages et les soins : jamais déçue.',
      en: 'A loyal client for years, for hair, balayage and treatments: never disappointed.',
      ar: 'زبونة وفية منذ سنوات للتصفيف والبالياج والعلاجات: لم أخب أبداً.',
    },
    rating: 5,
    confirmed: false,
  },
  {
    id: 'r5',
    author: 'Houda',
    quote: {
      fr: 'Une équipe chaleureuse, des produits de qualité et des prix très raisonnables.',
      en: 'A warm team, quality products and very reasonable prices.',
      ar: 'فريق دافئ ومنتجات عالية الجودة وأسعار معقولة جداً.',
    },
    rating: 5,
    confirmed: false,
  },
]

export const featuredQuote = {
  fr: 'Du hammam au massage, tout a été parfait.',
  en: 'From the hammam to the massage, everything was perfect.',
  ar: 'من الحمام إلى التدليك، كان كل شيء مثالياً.',
}

// Header + mobile menu. Anchors match the section ids; labels live in i18n under nav.<id>.
export const nav = [
  { id: 'soins', href: '#soins' },
  { id: 'trouver', href: '#trouver' },
  { id: 'visite', href: '#visite' },
  { id: 'packs', href: '#packs' },
  { id: 'avis', href: '#avis' },
  { id: 'contact', href: '#contact' },
]
