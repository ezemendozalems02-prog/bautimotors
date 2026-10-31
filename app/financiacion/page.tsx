import type { Metadata } from 'next'
import { Calculator } from '@/components/finance/calculator'
import { PurchaseFlow } from '@/components/finance/purchase-flow'
import { ClosingCta } from '@/components/sections/closing-cta'
import { DniSection } from '@/components/sections/dni-section'
import { Faq } from '@/components/sections/faq'
import { PageHero } from '@/components/sections/page-hero'
import { SectionHeading } from '@/components/sections/section-heading'
import { breadcrumbSchema, faqSchema, JsonLd } from '@/components/seo/json-ld'
import { homeFaqs } from '@/lib/faq'

export const metadata: Metadata = {
  title: 'Financiación de motos: consultá con tu DNI',
  description: 'Conocé las alternativas de financiación de motos en Tu Moto Ya, Tortuguitas. Simulá escenarios orientativos y consultá requisitos y condiciones con el equipo comercial.',
  alternates: { canonical: '/financiacion' },
}

export default function FinanciacionPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Financiación', path: '/financiacion' }])} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <PageHero label="Financiación" lines={['Empezá con', 'tu DNI.']}>
        Elegí tu moto, explorá escenarios y consultá con el equipo qué alternativas hay para vos.
      </PageHero>

      <section id="simulador" className="section scroll-mt-16 bg-[#F3F5F8]">
        <div className="shell">
          <SectionHeading label="Tu consulta" lines={['Armá tu consulta', 'en cuatro pasos']}>
            Elegís, nos contás cómo querés comprar y seguís por WhatsApp. Nada se envía hasta que lo mandes vos.
          </SectionHeading>
          <div className="mt-8 lg:mt-12">
            <PurchaseFlow />
          </div>
        </div>
      </section>

      <DniSection href="#calculadora" />

      <section id="calculadora" className="section scroll-mt-16 bg-white">
        <div className="shell">
          <SectionHeading label="Calculadora" lines={['Probá escenarios', 'antes de consultar']} />
          <div className="mt-8 lg:mt-12">
            <Calculator />
          </div>
        </div>
      </section>

      <Faq items={homeFaqs} />
      <ClosingCta />
    </main>
  )
}
