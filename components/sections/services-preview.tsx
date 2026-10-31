'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Banknote, Car, FileCheck, HandCoins, MessageCircle, Search } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { whatsappUrl } from '@/lib/site'

const services = [
  { icon: Car, title: 'Venta de vehículos', description: 'Catálogo seleccionado de las mejores marcas.', href: '/catalogo' },
  { icon: HandCoins, title: 'Toma de usados', description: 'Evaluamos tu vehículo actual como parte de pago.', href: '/vende-tu-auto' },
  { icon: Search, title: 'Búsqueda personalizada', description: 'Te ayudamos a encontrar el vehículo específico que buscás.', href: '/servicios' },
  { icon: MessageCircle, title: 'Asesoramiento por WhatsApp', description: 'Consultá rápido y directo con un asesor.', href: whatsappUrl(), external: true },
  { icon: FileCheck, title: 'Gestión documental', description: 'Nos encargamos de la documentación y la transferencia.', href: '/servicios' },
  { icon: Banknote, title: 'Opciones de financiación', description: 'Te conectamos con opciones de financiación del mercado.', href: '/servicios' },
]

export function ServicesPreview() {
  return (
    <section className="bg-[#080808] py-20 lg:py-32">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
          <SectionHeading index="05" label="Servicios" lines={['Todo lo que', 'necesitás']} />
          <Reveal delay={0.2} className="shrink-0">
            <Link href="/servicios" className="link-line">
              Ver todos los servicios
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <div className="grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              target={service.external ? '_blank' : undefined}
              rel={service.external ? 'noopener noreferrer' : undefined}
              className="group relative flex min-h-48 flex-col justify-between overflow-hidden border-r border-b border-white/10 p-6 lg:min-h-60 lg:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <service.icon aria-hidden="true" className="h-6 w-6 text-primary transition-transform duration-500 group-hover:-translate-y-0.5" />
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 text-[#6e6e6e] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
              </div>
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-white" style={{ fontStretch: '108%' }}>
                  {service.title}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[#B8B8B8]">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
