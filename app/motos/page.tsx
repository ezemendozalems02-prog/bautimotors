import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/catalog-view'
import { MotoCard } from '@/components/moto/moto-card'
import { PageHero } from '@/components/sections/page-hero'
import { breadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { motos } from '@/lib/motos'

export const metadata: Metadata = {
  title: 'Motos 0 km y usadas en Tortuguitas',
  description: 'Catálogo de motos de Tu Moto Ya en Tortuguitas, zona norte. Filtrá por marca, cilindrada, precio y condición, y consultá las alternativas de financiación.',
  alternates: { canonical: '/motos' },
}

/** El listado queda en el HTML inicial aunque los filtros se activen en el cliente. */
function StaticList() {
  return (
    <div className="shell grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {motos.map((moto) => (
        <MotoCard key={moto.id} moto={moto} />
      ))}
    </div>
  )
}

export default function MotosPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Motos', path: '/motos' }])} />
      <PageHero label="Catálogo" lines={['Elegí tu moto.', 'Consultá cómo', 'financiarla.']}>
        Las unidades disponibles hoy, con sus datos reales.
      </PageHero>
      <Suspense fallback={<StaticList />}>
        <CatalogView />
      </Suspense>
    </main>
  )
}
