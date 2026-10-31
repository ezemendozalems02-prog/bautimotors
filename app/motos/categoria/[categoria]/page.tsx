import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogView } from '@/components/catalog/catalog-view'
import { PageHero } from '@/components/sections/page-hero'
import { breadcrumbSchema, JsonLd } from '@/components/seo/json-ld'
import { activeCategories, categories, type MotoCategory } from '@/lib/motos'

interface PageProps {
  params: Promise<{ categoria: string }>
}

const isActive = (value: string): value is MotoCategory => (activeCategories() as string[]).includes(value)

export function generateStaticParams() {
  return activeCategories().map((categoria) => ({ categoria }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params
  if (!isActive(categoria)) return {}
  const { name, blurb } = categories[categoria]
  return {
    title: `Motos ${name} en Tortuguitas`,
    description: `${blurb} Mirá las motos ${name.toLowerCase()} de Tu Moto Ya y consultá las alternativas de financiación.`,
    alternates: { canonical: `/motos/categoria/${categoria}` },
  }
}

export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  if (!isActive(categoria)) notFound()
  const { name, blurb } = categories[categoria]

  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Motos', path: '/motos' }, { name, path: `/motos/categoria/${categoria}` }])} />
      <PageHero label="Catálogo" lines={[name]}>
        {blurb}
      </PageHero>
      <Suspense>
        <CatalogView lockedCategory={categoria} />
      </Suspense>
    </main>
  )
}
