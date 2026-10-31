import type { MetadataRoute } from 'next'
import { activeCategories, motoPath, motos } from '@/lib/motos'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/motos', '/financiacion', '/preguntas-frecuentes', '/contacto', '/nosotros', '/vende-tu-moto', '/privacidad']
  const paths = [...staticPaths, ...activeCategories().map((key) => `/motos/categoria/${key}`), ...motos.map(motoPath)]
  return paths.map((path) => ({ url: `${site.url}${path}` }))
}
