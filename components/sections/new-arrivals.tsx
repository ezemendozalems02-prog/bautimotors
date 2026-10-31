'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { VehicleCard } from '@/components/vehicle-card'
import { getNewArrivals } from '@/lib/vehicles'

export function NewArrivals() {
  const newArrivals = getNewArrivals().slice(0, 3)
  if (newArrivals.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-[#0c0c0c] py-20 lg:py-32">
      <div className="shell mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
        <SectionHeading index="04" label="Recién ingresados" lines={['Nuevas', 'unidades']}>
          Las últimas incorporaciones a nuestro catálogo.
        </SectionHeading>
        <Reveal delay={0.2} className="shrink-0">
          <Link href="/catalogo?filter=nuevos" className="link-line">
            Ver todos los nuevos
            <ArrowRight />
          </Link>
        </Reveal>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 pb-2 md:mx-auto md:grid md:max-w-[1560px] md:grid-cols-3 md:gap-5 md:overflow-visible md:px-[clamp(1.25rem,4vw,4rem)]">
        {newArrivals.map((vehicle, index) => (
          <Reveal key={vehicle.id} delay={index * 0.1} className="w-[84vw] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none">
            <VehicleCard vehicle={vehicle} sizes="(max-width: 768px) 84vw, 33vw" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
