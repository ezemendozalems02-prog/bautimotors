import type { Metadata } from 'next'
import { FaqList } from '@/components/sections/faq'
import { ClosingCta } from '@/components/sections/closing-cta'
import { PageHero } from '@/components/sections/page-hero'
import { breadcrumbSchema, faqSchema, JsonLd } from '@/components/seo/json-ld'
import { faqs } from '@/lib/faq'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre financiación de motos',
  description: 'Respuestas sobre cómo consultar la financiación de una moto: DNI, anticipo, cuotas, documentación y gastos.',
  alternates: { canonical: '/preguntas-frecuentes' },
}

export default function PreguntasFrecuentesPage() {
  return (
    <main>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Inicio', path: '/' }, { name: 'Preguntas frecuentes', path: '/preguntas-frecuentes' }])} />
      <PageHero label="Financiación" lines={['Preguntas', 'frecuentes']}>
        Las condiciones dependen de cada alternativa. Si tu caso no aparece, escribinos.
      </PageHero>
      <section className="section bg-white">
        <div className="shell max-w-4xl">
          <FaqList items={faqs} />
        </div>
      </section>
      <ClosingCta />
    </main>
  )
}
