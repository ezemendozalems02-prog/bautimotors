import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/catalog-view'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'Vehículos',
  description: 'Explorá el catálogo de Bauti Motors: filtrá por marca, precio, año y disponibilidad.',
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen">
      <PageHero label="Catálogo completo" lines={['Nuestros', 'vehículos']}>
        Cada unidad fue elegida para ofrecerte la mejor calidad y experiencia.
      </PageHero>
      <Suspense>
        <CatalogView />
      </Suspense>
      <WhatsAppButton />
    </main>
  )
}
