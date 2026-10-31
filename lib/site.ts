/**
 * Identidad y datos comerciales de Tu Moto Ya. Es la única fuente de verdad:
 * cambiar un valor acá lo actualiza en todo el sitio.
 */
export const site = {
  name: 'Tu Moto Ya',
  tagline: 'Tu moto. Tu libertad.',
  fullClaim: 'Tu moto. Tu libertad. Empezá con tu DNI.',
  description:
    'Motos 0 km y usadas en Tortuguitas, zona norte de Buenos Aires. Elegí tu moto y consultá las alternativas de financiación con Tu Moto Ya.',
  /** Dominio público. Definilo en NEXT_PUBLIC_SITE_URL cuando esté contratado. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  ).replace(/\/$/, ''),
  /** Número en formato internacional, sin signos. */
  whatsappNumber: '5491124817987',
  phoneDisplay: '+54 9 11 2481-7987',
  address: {
    street: 'Colectora Oeste, Ramal Pilar km 57',
    city: 'Tortuguitas',
    region: 'Buenos Aires',
    country: 'AR',
    display: 'Colectora Oeste, Ramal Pilar km 57, Tortuguitas, Buenos Aires',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Colectora Oeste Ramal Pilar km 57, Tortuguitas, Buenos Aires'),
  instagram: { handle: '@tumotoya.ok', url: 'https://www.instagram.com/tumotoya.ok/' },
}

/** Aclaración que acompaña toda mención de financiación. */
export const financingDisclaimer =
  'La consulta no implica aprobación crediticia. Las alternativas, requisitos y condiciones dependen de cada entidad y de la evaluación correspondiente.'

export const primaryNav = [
  { name: 'Inicio', href: '/' },
  { name: 'Motos', href: '/motos' },
  { name: 'Financiación', href: '/financiacion' },
  { name: 'Cómo comprar', href: '/#como-comprar' },
  { name: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { name: 'Contacto', href: '/contacto' },
]

export const secondaryNav = [
  { name: 'Encontrá tu moto ideal', href: '/#encontra-tu-moto' },
  { name: 'Calculadora', href: '/financiacion#calculadora' },
  { name: 'Tu moto usada', href: '/vende-tu-moto' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Privacidad', href: '/privacidad' },
]

export const quoteCta = { label: 'Quiero mi moto', href: '/financiacion#simulador' }

const currencyPrefix = { USD: 'USD', ARS: '$' } as const
export type Currency = keyof typeof currencyPrefix

export function formatMoney(value: number, currency: Currency = 'USD') {
  return `${currencyPrefix[currency]} ${Math.round(value).toLocaleString('es-AR')}`
}

export function formatKm(km: number) {
  return `${km.toLocaleString('es-AR')} km`
}
