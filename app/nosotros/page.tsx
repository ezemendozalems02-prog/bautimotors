import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, CheckCircle, Eye, Heart, Shield, Target, Users } from 'lucide-react'
import { DrawLine, Reveal } from '@/components/motion/primitives'
import { About } from '@/components/sections/about'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé Ghanima Motors: atención personalizada, calidad y compromiso en cada operación.',
}

const purpose = [
  {
    icon: Target,
    title: 'Nuestra misión',
    text: 'Ofrecer vehículos seleccionados con altos estándares de calidad, brindando una experiencia de compra que supere las expectativas de nuestros clientes.',
  },
  {
    icon: Eye,
    title: 'Nuestra visión',
    text: 'Ser una concesionaria de referencia, destacándonos por la confianza, la transparencia y el trato personalizado que ofrecemos a cada cliente.',
  },
]

const values = [
  { icon: Shield, title: 'Confianza', text: 'Operamos con total transparencia. Cada vehículo tiene información clara.' },
  { icon: Award, title: 'Excelencia', text: 'Solo seleccionamos unidades que cumplen con nuestros estándares.' },
  { icon: Users, title: 'Servicio personalizado', text: 'Cada cliente recibe una atención adaptada a sus necesidades.' },
  { icon: Heart, title: 'Pasión', text: 'Amamos lo que hacemos. Los autos son nuestra pasión y se nota.' },
]

const reasons = [
  'Vehículos cuidadosamente seleccionados',
  'Información transparente',
  'Atención personalizada a cada cliente',
  'Asesoramiento profesional sin presiones',
  'Proceso de compra simple y confiable',
  'Acompañamiento en todo el proceso',
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <PageHero label="Quiénes somos" lines={['Ghanima', 'Motors']} />
      <About showLink={false} />

      <section className="bg-[#090909] py-20 lg:py-32">
        <div className="shell">
          <div className="grid border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-white/10">
            {purpose.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1} className="py-8 md:px-10 md:py-12 md:first:pl-0 md:last:pr-0">
                <item.icon aria-hidden="true" className="h-6 w-6 text-primary" />
                <h2 className="display display-md mt-8 text-white">{item.title}</h2>
                <p className="mt-4 leading-relaxed text-[#B8B8B8]">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0c0c0c] py-20 lg:py-28">
        <div className="shell">
          <h2 className="display display-lg text-white">Lo que nos define</h2>
          <DrawLine className="mt-6 w-24" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <value.icon aria-hidden="true" className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold text-white" style={{ fontStretch: '108%' }}>
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#B8B8B8]">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-20 lg:py-32">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display display-lg text-white">Una experiencia diferente</h2>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Link href="/catalogo" className="btn btn-primary">
                Ver catálogo
                <ArrowRight />
              </Link>
              <Link href="/contacto" className="link-line">
                Contactanos
                <ArrowRight />
              </Link>
            </div>
          </div>
          <ul className="border-t border-white/10">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-center gap-3 border-b border-white/10 py-4 text-white">
                <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}
