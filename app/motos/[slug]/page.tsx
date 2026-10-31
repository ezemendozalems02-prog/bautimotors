import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MotoDetail } from '@/components/moto/moto-detail'
import { breadcrumbSchema, JsonLd, motoSchema } from '@/components/seo/json-ld'
import { getMotoBySlug, motoPath, motos } from '@/lib/motos'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return motos.map((moto) => ({ slug: moto.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const moto = getMotoBySlug((await params).slug)
  if (!moto) return {}

  const title = [moto.name, moto.year, moto.condition === '0 km' ? '0 km' : 'usada'].filter(Boolean).join(' ')
  const description = `${moto.name}, ${moto.cc} cc. Consultá disponibilidad y alternativas de financiación en Tu Moto Ya, Tortuguitas.`
  return {
    title,
    description,
    alternates: { canonical: motoPath(moto) },
    openGraph: { title, description, images: ['/images/og.jpg'] },
  }
}

export default async function MotoPage({ params }: PageProps) {
  const moto = getMotoBySlug((await params).slug)
  if (!moto) notFound()

  return (
    <main>
      <JsonLd data={motoSchema(moto)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Motos', path: '/motos' }, { name: moto.name, path: motoPath(moto) }])} />
      <MotoDetail moto={moto} />
    </main>
  )
}
