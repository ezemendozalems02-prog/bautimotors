'use client'

import Link from 'next/link'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { VehiclePhoto } from '@/components/vehicle-photo'
import { formatKm, formatPrice, whatsappUrl } from '@/lib/site'
import { getVehicleStatus, type Vehicle } from '@/lib/vehicles'
import { cn } from '@/lib/utils'

interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
  /** `lead` es la versión grande para la pieza principal de una composición. */
  size?: 'default' | 'lead'
  sizes?: string
  priority?: boolean
}

export function VehicleCard({
  vehicle,
  className,
  size = 'default',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority,
}: VehicleCardProps) {
  const status = getVehicleStatus(vehicle)
  const lead = size === 'lead'
  const href = `/catalogo/${vehicle.slug}`
  const whatsappMessage = `Hola, vengo desde la web de Bauti Motors y quiero consultar por el ${vehicle.name} (${vehicle.year}).`

  const specs = [
    { label: 'Año', value: String(vehicle.year) },
    { label: 'Kilometraje', value: formatKm(vehicle.km) },
    { label: 'Transmisión', value: vehicle.transmission },
    { label: 'Combustible', value: vehicle.fuel },
  ]

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-white/8 bg-[#111111] transition-colors duration-500 hover:border-white/25',
        className,
      )}
    >
      <Link
        href={href}
        aria-label={`Ver ${vehicle.name} ${vehicle.year}`}
        className={cn('relative block overflow-hidden', lead ? 'aspect-[4/3] lg:aspect-auto lg:flex-1' : 'aspect-[4/3]')}
      >
        <VehiclePhoto
          vehicle={vehicle}
          sizes={sizes}
          priority={priority}
          imageClassName="scale-[1.01] transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,#111111,transparent)]"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.featured && (
            <span className="eyebrow rounded-[2px] bg-primary px-2 py-1 !text-[0.625rem] !tracking-[0.12em] font-semibold text-[#080808]">
              Destacado
            </span>
          )}
          {vehicle.newArrival && (
            <span className="eyebrow rounded-[2px] bg-[#080808]/85 px-2 py-1 !text-[0.625rem] !tracking-[0.12em] text-primary">
              Nuevo ingreso
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className="absolute top-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center bg-white text-[#080808] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className={cn('relative flex flex-col px-5 pb-5', lead && 'lg:px-7 lg:pb-7')}>
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-primary">{vehicle.brand}</p>
          <p className="eyebrow flex items-center gap-1.5 !tracking-[0.12em] text-[#B8B8B8]">
            <span
              aria-hidden="true"
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                status === 'Disponible' ? 'bg-[#3ecf8e]' : status === 'Reservado' ? 'bg-primary' : 'bg-[#6e6e6e]',
              )}
            />
            {status}
          </p>
        </div>

        <h3
          className={cn(
            'mt-2 font-display leading-tight font-bold tracking-[-0.01em] text-white',
            lead ? 'text-2xl lg:text-3xl' : 'text-lg',
          )}
          style={{ fontStretch: '108%' }}
        >
          <Link href={href} className="line-clamp-1 transition-colors duration-300 hover:text-primary">
            {vehicle.version === vehicle.model ? vehicle.model : `${vehicle.model} ${vehicle.version}`}
          </Link>
        </h3>

        <dl className={cn('mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5', lead && 'lg:grid-cols-4')}>
          {specs.map((spec) => (
            <div key={spec.label} className="min-w-0">
              <dt className="text-[0.6875rem] text-[#8d8d8d]">{spec.label}</dt>
              <dd className="tabular truncate text-sm text-white">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <p className={cn('tabular font-medium tracking-tight text-white', lead ? 'text-2xl' : 'text-xl')}>
            {formatPrice(vehicle.price)}
          </p>
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por ${vehicle.name} en WhatsApp`}
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-sm text-[#B8B8B8] transition-colors duration-300 hover:text-primary"
          >
            <MessageCircle className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-12" />
            <span className="hidden sm:inline">Consultar</span>
          </a>
        </div>
      </div>
    </article>
  )
}
