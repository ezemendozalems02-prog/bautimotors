/**
 * Datos comerciales de Ghanima Motors. Es la única fuente de verdad:
 * cambiar un valor acá lo actualiza en todo el sitio.
 */
export const site = {
  name: 'Ghanima Motors',
  /** Número en formato internacional, sin signos. Es el mismo que tenía el sitio. */
  whatsappNumber: '5491100000000',
  phoneDisplay: '+54 9 11 0000-0000',
  email: 'info@bautimotors.com',
  location: 'Buenos Aires, Argentina',
  hours: ['Lunes a Viernes: 09:00 - 18:00 hs', 'Sábados: 09:00 - 13:00 hs'],
  /** Los íconos de redes solo se muestran cuando la URL está cargada. */
  social: {
    instagram: '',
    facebook: '',
  },
}

export const primaryNav = [
  { name: 'Inicio', href: '/' },
  { name: 'Vehículos', href: '/catalogo' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Preguntas frecuentes', shortName: 'Preguntas', href: '/#preguntas-frecuentes' },
  { name: 'Contacto', href: '/contacto' },
]

export const secondaryNav = [
  { name: 'Servicios', href: '/servicios' },
  { name: 'Vendé tu auto', href: '/vende-tu-auto' },
]

export const defaultWhatsappMessage =
  'Hola, vengo desde la web de Ghanima Motors y quiero consultar por un vehículo.'

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function formatPrice(price: number) {
  return `USD ${price.toLocaleString('es-AR')}`
}

export function formatKm(km: number) {
  return `${km.toLocaleString('es-AR')} km`
}
