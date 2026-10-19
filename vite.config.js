import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { images, srcSet } from './src/data/images.js'
import { hours, salon } from './src/data/salon.js'
import fr from './src/i18n/fr.js'

// Builds <head> SEO tags from the same data the page uses, so they never drift apart.
function seoHead() {
  const abs = (path) => new URL(path, salon.url).href
  const link = (attrs) => ({ tag: 'link', attrs, injectTo: 'head' })
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: salon.name,
    url: salon.url,
    image: abs('/og-image.jpg'),
    telephone: salon.phone.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: salon.address.street,
      addressLocality: salon.address.city.fr,
      postalCode: salon.address.postalCode,
      addressCountry: salon.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: salon.geo.lat, longitude: salon.geo.lng },
    hasMap: salon.mapsUrl,
    sameAs: [salon.instagram.url],
    openingHoursSpecification: hours.map((h, d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${DAYS[d]}`,
      opens: h.open,
      closes: h.close,
    })),
  }

  return {
    name: 'seo-head',
    transformIndexHtml: () => [
      meta({ name: 'description', content: fr.meta.description }),
      link({ rel: 'canonical', href: abs('/') }),
      ...['fr', 'en', 'ar'].map((l) =>
        link({ rel: 'alternate', hreflang: l, href: abs(l === 'fr' ? '/' : `/?lang=${l}`) }),
      ),
      link({ rel: 'alternate', hreflang: 'x-default', href: abs('/') }),
      meta({ property: 'og:type', content: 'website' }),
      meta({ property: 'og:site_name', content: salon.name }),
      meta({ property: 'og:title', content: fr.meta.title }),
      meta({ property: 'og:description', content: fr.meta.description }),
      meta({ property: 'og:url', content: abs('/') }),
      meta({ property: 'og:image', content: abs('/og-image.jpg') }),
      meta({ property: 'og:image:width', content: '1200' }),
      meta({ property: 'og:image:height', content: '630' }),
      meta({ property: 'og:locale', content: 'fr_MA' }),
      meta({ name: 'twitter:card', content: 'summary_large_image' }),
      // LCP: preload exactly the hero file the <picture> will pick (4:5 on phones, 16:9 from lg).
      link({ rel: 'preload', as: 'image', media: '(max-width: 1023.98px)', imagesrcset: srcSet(images.hero, [4, 5]), imagesizes: '100vw', fetchpriority: 'high' }),
      link({ rel: 'preload', as: 'image', media: '(min-width: 1024px)', imagesrcset: srcSet(images.hero, [16, 9]), imagesizes: '100vw', fetchpriority: 'high' }),
      { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd), injectTo: 'head' },
    ],
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoHead()],
})
