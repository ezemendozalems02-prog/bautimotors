import type { FaqItem } from '@/lib/faq'
import { categories, motoPath, type Moto } from '@/lib/motos'
import { site } from '@/lib/site'

/** Escapa `<` para que el contenido no pueda cerrar la etiqueta script. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const dealerSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MotorcycleDealer',
  '@id': `${site.url}/#agencia`,
  name: site.name,
  url: site.url,
  image: `${site.url}/images/og.jpg`,
  logo: `${site.url}/icon-512.png`,
  telephone: site.phoneDisplay.replace(/[\s-]/g, ''),
  sameAs: [site.instagram.url],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
})

const availability = {
  Disponible: 'https://schema.org/InStock',
  Reservada: 'https://schema.org/LimitedAvailability',
  Vendida: 'https://schema.org/SoldOut',
}

export const motoSchema = (moto: Moto) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: moto.name,
  description: moto.description,
  brand: { '@type': 'Brand', name: moto.brand },
  category: categories[moto.category].name,
  url: `${site.url}${motoPath(moto)}`,
  ...(moto.price !== null && {
    offers: {
      '@type': 'Offer',
      price: moto.price,
      priceCurrency: moto.currency,
      availability: availability[moto.status],
      itemCondition: moto.condition === '0 km' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      url: `${site.url}${motoPath(moto)}`,
      seller: { '@id': `${site.url}/#agencia` },
    },
  }),
})

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${site.url}${item.path}` })),
})

export const faqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
})
