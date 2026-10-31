import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/primitives'
import { ClosingCta } from '@/components/sections/closing-cta'
import { PageHero } from '@/components/sections/page-hero'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Tu Moto Ya comercializa motos 0 km y usadas en Tortuguitas, con orientación a alternativas de financiación.',
  alternates: { canonical: '/nosotros' },
}

const values = [
  { title: 'Acceso', text: 'Queremos que consultar por una moto sea simple y que sepas qué opciones tenés.' },
  { title: 'Claridad', text: 'Te contamos requisitos y condiciones antes de que decidas.' },
  { title: 'Atención', text: 'Hablás con una persona, no con un formulario eterno.' },
]

export default function NosotrosPage() {
  return (
    <main>
      <PageHero label="Nosotros" lines={['Tu moto.', 'Tu libertad.']}>
        {site.name} comercializa motos 0 km y usadas en Tortuguitas, con orientación a alternativas de financiación.
      </PageHero>
      <section className="section bg-white">
        <div className="shell grid gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08} className="border-t-2 border-primary pt-5">
              <h2 className="font-display text-2xl font-bold tracking-tight">{value.title}</h2>
              <p className="mt-2 leading-relaxed text-[#5A6270]">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <ClosingCta />
    </main>
  )
}
