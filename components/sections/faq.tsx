'use client'

import Link from 'next/link'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ArrowRight, Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { defaultWhatsappMessage, site, whatsappUrl } from '@/lib/site'

/** Las respuestas repiten lo que el sitio ya ofrece: no agregar plazos, tasas ni garantías sin confirmarlos. */
const faqs = [
  {
    question: '¿Puedo entregar mi auto como parte de pago?',
    answer: 'Sí. Evaluamos tu vehículo actual con una tasación sin compromiso. Completá el formulario y te contactamos con una propuesta.',
    link: { label: 'Vendé tu auto', href: '/vende-tu-auto' },
  },
  {
    question: '¿Ofrecen financiación?',
    answer: 'Te conectamos con opciones de financiación y te asesoramos para encontrar el plan que se adapte a tus necesidades, sin compromiso.',
    link: { label: 'Consultar opciones', href: '/contacto' },
  },
  {
    question: '¿Se encargan de la transferencia y los trámites?',
    answer: 'Sí. Gestionamos la documentación de la operación: transferencia de titularidad, verificación policial e informes de dominio.',
  },
  {
    question: '¿Puedo ver el vehículo en persona?',
    answer: `Sí. Escribinos por WhatsApp y coordinamos una visita. Horarios de atención: ${site.hours.join(' / ')}.`,
  },
  {
    question: '¿Qué pasa si no encuentro el auto que busco?',
    answer: 'Contanos qué estás buscando. Con la búsqueda personalizada te ayudamos a conseguirlo, sin costo adicional.',
    link: { label: 'Ver servicios', href: '/servicios' },
  },
  {
    question: '¿Me pueden enviar más fotos o videos de una unidad?',
    answer: 'Sí. Consultanos por WhatsApp desde la ficha del vehículo y te enviamos el material disponible.',
  },
  {
    question: '¿En qué moneda están los precios?',
    answer: 'Los precios del catálogo están expresados en dólares estadounidenses (USD).',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export function Faq() {
  return (
    <section id="preguntas-frecuentes" className="scroll-mt-20 border-t border-white/8 bg-[#0c0c0c] py-20 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading index="06" label="Dudas" lines={['Preguntas', 'frecuentes']} size="column">
            ¿No encontrás lo que buscás? Escribinos y te ayudamos.
          </SectionHeading>
          <Reveal delay={0.3} className="mt-7">
            <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener noreferrer" className="link-line">
              Hablar con un asesor
              <ArrowRight />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <AccordionPrimitive.Root type="single" collapsible defaultValue="item-0" className="border-t border-white/10">
            {faqs.map((faq, index) => (
              <AccordionPrimitive.Item key={faq.question} value={`item-${index}`} className="group/item border-b border-white/10">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex min-h-16 w-full items-center gap-4 py-5 text-left">
                    <span className="tabular w-6 shrink-0 text-xs text-[#8d8d8d] transition-colors duration-300 group-hover:text-primary group-data-[state=open]:text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="flex-1 font-display text-base leading-snug font-bold text-white md:text-lg"
                      style={{ fontStretch: '108%' }}
                    >
                      {faq.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[#8d8d8d] transition-[transform,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:text-white group-data-[state=open]:rotate-45 group-data-[state=open]:text-primary"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pr-9 pb-6 pl-10">
                    <p className="max-w-xl text-[0.95rem] leading-relaxed text-[#B8B8B8]">{faq.answer}</p>
                    {faq.link && (
                      <Link href={faq.link.href} className="link-line mt-4">
                        {faq.link.label}
                        <ArrowRight />
                      </Link>
                    )}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  )
}
