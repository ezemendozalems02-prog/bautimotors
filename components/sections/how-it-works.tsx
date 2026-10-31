'use client'

import { motion } from 'framer-motion'
import { Bike, Handshake, IdCard, ListChecks } from 'lucide-react'
import { ease, Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'

const steps = [
  { icon: Bike, title: 'Elegí tu moto', text: 'Explorá el catálogo y encontrá el modelo que buscás.' },
  { icon: IdCard, title: 'Consultá con tu DNI', text: 'Conocé las alternativas de financiación y los requisitos de cada opción.' },
  { icon: ListChecks, title: 'Evaluá tu plan', text: 'El equipo comercial te informa las condiciones y los pasos siguientes.' },
  { icon: Handshake, title: 'Coordiná tu compra', text: 'Una vez confirmadas las condiciones, coordiná la operación con la agencia.' },
]

export function HowItWorks() {
  return (
    <section id="como-comprar" className="section bg-white">
      <div className="shell">
        <SectionHeading label="Cómo comprar" lines={['Cómo conseguir', 'tu moto']} />

        <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6 lg:mt-16">
          {/* Línea de progreso: conecta los cuatro pasos. */}
          <span aria-hidden="true" className="absolute top-6 right-[12%] left-[12%] hidden h-0.5 bg-[#E2E6EC] md:block" />
          <motion.span
            aria-hidden="true"
            className="absolute top-6 right-[12%] left-[12%] hidden h-0.5 origin-left bg-primary md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.8, ease }}
          />
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-0.5 bg-[#E2E6EC] md:hidden" />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-6 w-0.5 origin-top bg-primary md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.8, ease }}
          />

          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.14} y={18} className="flex gap-4 md:block md:text-center">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white ring-6 ring-white md:mx-auto">
                  <step.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="md:mt-5">
                  <span className="tabular text-sm font-bold text-primary">0{index + 1}</span>
                  <h3 className="font-display mt-0.5 text-lg font-bold tracking-tight uppercase">{step.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-xs text-[0.95rem] leading-relaxed text-[#5A6270]">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
