'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { VehicleCard } from '@/components/vehicle-card'
import { getFeaturedVehicles } from '@/lib/vehicles'

export function FeaturedVehicles() {
  const featured = getFeaturedVehicles().slice(0, 6)
  // La pieza principal es la unidad destacada de mayor valor.
  const lead = [...featured].sort((a, b) => b.price - a.price)[0]
  const rest = featured.filter((vehicle) => vehicle.id !== lead.id)

  return (
    <section className="relative bg-[#080808] py-20 lg:py-32">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
          <SectionHeading index="01" label="Selección" lines={['Vehículos', 'destacados']} />
          <Reveal delay={0.2} className="shrink-0">
            <Link href="/catalogo" className="link-line">
              Ver todo el catálogo
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Móvil: carrusel con snap, la tarjeta siguiente asoma e invita a deslizar. */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-2 md:hidden">
        {[lead, ...rest].map((vehicle) => (
          <div key={vehicle.id} className="w-[84vw] max-w-sm shrink-0 snap-start">
            <VehicleCard vehicle={vehicle} sizes="84vw" />
          </div>
        ))}
      </div>

      <div className="shell hidden md:block">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <Reveal className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <VehicleCard vehicle={lead} size="lead" sizes="(max-width: 1024px) 100vw, 58vw" priority />
          </Reveal>
          {rest.map((vehicle, index) => (
            <Reveal
              key={vehicle.id}
              delay={index < 2 ? 0.1 * (index + 1) : 0.08 * (index - 2)}
              className={index < 2 ? 'lg:col-span-5' : 'lg:col-span-4'}
            >
              <VehicleCard
                vehicle={vehicle}
                sizes="(max-width: 1024px) 50vw, 34vw"
                className={index < 2 ? 'lg:[&>a]:aspect-[2/1]' : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
