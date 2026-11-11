import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { VehicleDetail } from '@/components/vehicle-detail'
import { vehicles, getVehicleBySlug } from '@/lib/vehicles'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const vehicle = getVehicleBySlug(slug)

  if (!vehicle) {
    return {
      title: 'Vehículo no encontrado',
    }
  }

  return {
    title: `${vehicle.name} ${vehicle.year}`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.name} ${vehicle.year} | Ghanima Motors`,
      description: vehicle.description,
    },
  }
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const vehicle = getVehicleBySlug(slug)

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <VehicleDetail vehicle={vehicle} />
      <WhatsAppButton
        className="bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-6"
        message={`Hola, vengo desde la web de Ghanima Motors y quiero consultar por el ${vehicle.name} (${vehicle.year}).`}
      />
    </main>
  )
}
