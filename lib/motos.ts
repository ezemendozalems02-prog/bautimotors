import type { Currency } from '@/lib/site'

/**
 * Inventario de Tu Moto Ya: acá se cargan todas las unidades.
 * Agregar un objeto a `motos` la publica en catálogo, ficha, buscador, sitemap
 * y SEO. Las categorías y filtros se calculan solos desde estos datos.
 *
 * Las fotos van en /public/motos. Si falta el archivo, se muestra una placa
 * de la marca: nunca la foto de otra unidad.
 */
export type MotoStatus = 'Disponible' | 'Reservada' | 'Vendida'
export type MotoCondition = '0 km' | 'Usada'
export type MotoUse = 'Trabajo' | 'Uso diario' | 'Reparto' | 'Viajes' | 'Recreación'

export const categories = {
  urbanas: { name: 'Urbanas', blurb: 'Para moverte todos los días por la ciudad.' },
  street: { name: 'Street', blurb: 'Carácter y versatilidad para la calle y la ruta.' },
  deportivas: { name: 'Deportivas', blurb: 'Diseño y prestaciones para quienes buscan más.' },
  trail: { name: 'Trail', blurb: 'Preparadas para el asfalto y para salir de él.' },
  scooters: { name: 'Scooters', blurb: 'Prácticos, simples y fáciles de usar.' },
  enduro: { name: 'Enduro', blurb: 'Hechas para el barro, la tierra y el camino difícil.' },
  triciclos: { name: 'Tres ruedas', blurb: 'Una experiencia distinta sobre tres ruedas.' },
} as const

export type MotoCategory = keyof typeof categories

export interface Moto {
  id: string
  slug: string
  name: string
  brand: string
  model: string
  version: string
  category: MotoCategory
  /** Cilindrada en cc. */
  cc: number
  /** null muestra "Consultar". */
  year: number | null
  km: number | null
  condition: MotoCondition
  /** Estado tal como lo informó la agencia, sin agregar certificaciones. */
  stateNote?: string
  /** Precio de contado. null muestra "Consultar precio". */
  price: number | null
  /** Precio financiado informado por la agencia. */
  financedPrice: number | null
  currency: Currency
  status: MotoStatus
  transmission: string
  engine: string
  /** Vacío muestra "Consultar colores". */
  colors: string[]
  description: string
  features: string[]
  images: string[]
  /** true cuando las imágenes no son fotos de la unidad: se rotula en pantalla. */
  illustrativeImages?: boolean
  /** Muestra la etiqueta de consulta de financiación. */
  financingInquiry: boolean
  featured: boolean
  newArrival: boolean
  /** Usos para los que se recomienda en el buscador. */
  uses: MotoUse[]
}

/** Uso sugerido en el buscador según el tipo de moto. */
const usesByCategory: Record<MotoCategory, MotoUse[]> = {
  urbanas: ['Trabajo', 'Uso diario', 'Reparto'],
  street: ['Trabajo', 'Uso diario', 'Recreación'],
  deportivas: ['Uso diario', 'Recreación'],
  trail: ['Uso diario', 'Viajes', 'Recreación'],
  scooters: ['Uso diario', 'Reparto'],
  enduro: ['Recreación'],
  triciclos: ['Viajes', 'Recreación'],
}

type ListedMoto = Pick<Moto, 'brand' | 'model' | 'category' | 'cc' | 'colors' | 'price'> & Partial<Moto> & { slug: string }

/**
 * Unidad de la lista de precios. La foto se busca en /public/motos/<slug>.jpg:
 * al subir el archivo con ese nombre aparece sola.
 */
function listed(moto: ListedMoto): Moto {
  const name = `${moto.brand} ${moto.model}`
  return {
    id: moto.slug,
    name,
    version: '',
    year: null,
    km: null,
    condition: '0 km',
    financedPrice: null,
    currency: 'ARS',
    status: 'Disponible',
    transmission: '',
    engine: `${moto.cc} cc`,
    description: `${name}. Consultá disponibilidad y alternativas de financiación.`,
    features: [],
    images: [`/motos/${moto.slug}.jpg`],
    financingInquiry: true,
    featured: false,
    newArrival: false,
    uses: usesByCategory[moto.category],
    ...moto,
  }
}

export const motos: Moto[] = [
  // 0 km
  listed({ slug: 'yamaha-xtz-125', brand: 'Yamaha', model: 'XTZ 125', category: 'trail', cc: 125, year: 2026, km: 0, colors: ['Blanco', 'Azul'], price: 6380000, financedPrice: 7950000, featured: true }),
  listed({ slug: 'keller-classic-eco', brand: 'Keller', model: 'Classic Eco', category: 'urbanas', cc: 110, km: 0, colors: ['Blanco'], price: 1750000, financedPrice: 2700000 }),
  listed({ slug: 'keller-classic-full', brand: 'Keller', model: 'Classic Full', category: 'urbanas', cc: 110, km: 0, colors: ['Gris'], price: 1920000, financedPrice: 2880000, features: ['Tablero digital'] }),
  listed({ slug: 'keller-miracle-150', brand: 'Keller', model: 'Miracle 150', category: 'street', cc: 150, km: 0, colors: ['Rojo'], price: 2880000, financedPrice: 3800000 }),
  listed({ slug: 'motomel-blitz-full-x2', brand: 'Motomel', model: 'Blitz Full X2', category: 'urbanas', cc: 110, km: 0, colors: ['Azul'], price: 2040000, financedPrice: 3800000 }),
  listed({ slug: 'motomel-b110', brand: 'Motomel', model: 'B110', category: 'urbanas', cc: 110, km: 0, colors: [], price: 2158750, financedPrice: 3108600 }),
  listed({ slug: 'motomel-cg-150-s3', brand: 'Motomel', model: 'CG 150 S3', category: 'street', cc: 150, km: 0, colors: [], price: 2543736, financedPrice: 3662980 }),
  listed({ slug: 'motomel-s2-full', brand: 'Motomel', model: 'S2 Full', category: 'street', cc: 150, km: 0, colors: [], price: 3396250, financedPrice: 4890600 }),
  listed({ slug: 'gilera-smash-auto-new', brand: 'Gilera', model: 'Smash Auto New', category: 'urbanas', cc: 110, km: 0, colors: ['Gris'], price: 1980000, financedPrice: 2970001 }),
  listed({ slug: 'gilera-smash-vs-new', brand: 'Gilera', model: 'Smash VS New', category: 'urbanas', cc: 110, km: 0, colors: ['Azul'], price: 2100000, financedPrice: 2970000 }),
  listed({ slug: 'gilera-smash-full', brand: 'Gilera', model: 'Smash Full', category: 'urbanas', cc: 110, km: 0, colors: ['Gris mate'], price: 2557500, financedPrice: 3682800 }),
  listed({ slug: 'gilera-vc-150', brand: 'Gilera', model: 'VC 150', category: 'street', cc: 150, km: 0, colors: [], price: 2873750, financedPrice: 4138200 }),
  listed({ slug: 'zanella-zb-110-full-z3-nueva', brand: 'Zanella', model: 'ZB 110 Full Z3 Nueva', category: 'urbanas', cc: 110, km: 0, colors: ['Blanco'], price: 2040000, financedPrice: 3000000 }),
  listed({ slug: 'zanella-zb-110-base-2027', brand: 'Zanella', model: 'ZB 110 Base', category: 'urbanas', cc: 110, year: 2027, km: 0, colors: [], price: 2145000, financedPrice: 3088800 }),
  listed({ slug: 'corven-energy-110-max-full-new', brand: 'Corven', model: 'Energy 110 Max Full New', category: 'urbanas', cc: 110, km: 0, colors: ['Rojo'], price: 2100000, financedPrice: 3100000 }),
  listed({ slug: 'siam-qu-110', brand: 'Siam', model: 'QU 110', category: 'urbanas', cc: 110, km: 0, colors: ['Blanca'], price: 1850000, financedPrice: 3060000 }),
  listed({ slug: 'ika-p110', brand: 'IKA', model: 'P110', category: 'urbanas', cc: 110, km: 0, colors: [], price: 1761375, financedPrice: 2536380 }),

  // Usadas
  listed({ slug: 'ducati-multistrada-v2', brand: 'Ducati', model: 'Multistrada V2', category: 'trail', cc: 937, condition: 'Usada', colors: ['Roja'], price: 21000, currency: 'USD', featured: true, uses: ['Viajes', 'Recreación'] }),
  listed({ slug: 'bmw-gs650-2014', brand: 'BMW', model: 'GS650', category: 'trail', cc: 650, year: 2014, condition: 'Usada', colors: ['Roja'], price: 10000, currency: 'USD', uses: ['Viajes', 'Recreación'] }),
  listed({ slug: 'honda-twister-125-2014', brand: 'Honda', model: 'Twister 125', category: 'street', cc: 125, year: 2014, km: 5000, condition: 'Usada', colors: ['Gris'], price: 3700000 }),
  listed({ slug: 'rouser-ns250', brand: 'Rouser', model: 'NS250', category: 'street', cc: 250, condition: 'Usada', colors: ['Rojo'], price: 5000000 }),
  listed({ slug: 'motomel-s2-2026', brand: 'Motomel', model: 'S2', category: 'street', cc: 150, year: 2026, condition: 'Usada', colors: ['Gris'], price: 2700000 }),
  listed({ slug: 'corven-mirage', brand: 'Corven', model: 'Mirage', category: 'urbanas', cc: 110, condition: 'Usada', colors: ['Gris'], price: 1500000 }),

  {
    id: 'bajaj-dominar-400',
    slug: 'bajaj-dominar-400-2023',
    name: 'Bajaj Dominar 400',
    brand: 'Bajaj',
    model: 'Dominar',
    version: '400',
    category: 'street',
    cc: 373,
    year: 2023,
    km: 140,
    condition: 'Usada',
    stateNote: 'Como nuevo',
    price: 5200,
    financedPrice: null,
    currency: 'USD',
    status: 'Disponible',
    transmission: 'Manual 6 velocidades',
    engine: '373.3 cc',
    colors: [],
    description: 'Bajaj Dominar 400 prácticamente nueva. Moto touring sport con excelentes prestaciones y mínimo uso.',
    features: ['ABS doble canal', 'LED', 'Display digital', 'Asiento comfort'],
    images: ['/motos/bajaj-dominar.jpg'],
    financingInquiry: true,
    featured: true,
    newArrival: true,
    uses: ['Uso diario', 'Viajes', 'Recreación'],
  },
  {
    id: 'can-am-spyder-f3s',
    slug: 'can-am-spyder-1300-f3s-2017',
    name: 'Can-Am Spyder 1300 F3-S',
    brand: 'Can-Am',
    model: 'Spyder',
    version: '1300 F3-S',
    category: 'triciclos',
    cc: 1330,
    year: 2017,
    km: 44000,
    condition: 'Usada',
    stateNote: 'Excelente',
    price: 15900,
    financedPrice: null,
    currency: 'USD',
    status: 'Disponible',
    transmission: 'Semiautomática',
    engine: '1330 cc Rotax',
    colors: [],
    description:
      'Can-Am Spyder F3-S, la experiencia de conducción más exclusiva sobre tres ruedas. Potencia y estabilidad en un diseño único.',
    features: ['Estabilidad dinámica', 'ABS', 'Control de tracción', 'Modo Sport'],
    images: ['/motos/can-am-spyder.jpg'],
    illustrativeImages: true,
    financingInquiry: true,
    featured: true,
    newArrival: false,
    uses: ['Viajes', 'Recreación'],
  },
]

export const getMotoBySlug = (slug: string) => motos.find((moto) => moto.slug === slug)

export const motoPath = (moto: Pick<Moto, 'slug'>) => `/motos/${moto.slug}`

/** Las vendidas salen de las recomendaciones, pero conservan su ficha. */
export const availableMotos = () => motos.filter((moto) => moto.status !== 'Vendida')

export const featuredMotos = () => availableMotos().filter((moto) => moto.featured)

export const usedMotos = () => availableMotos().filter((moto) => moto.condition === 'Usada')

/** Solo categorías con unidades cargadas. */
export function activeCategories() {
  const present = new Set(motos.map((moto) => moto.category))
  return (Object.keys(categories) as MotoCategory[]).filter((key) => present.has(key))
}

export function relatedMotos(moto: Moto, limit = 3) {
  return availableMotos()
    .filter((item) => item.id !== moto.id)
    .sort((a, b) => {
      const affinity = (item: Moto) => Number(item.category === moto.category) * 2 + Number(item.brand === moto.brand)
      return affinity(b) - affinity(a)
    })
    .slice(0, limit)
}
