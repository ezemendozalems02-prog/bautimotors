import type { Metadata } from 'next'
import { Car, CheckCircle, Clock, DollarSign, Handshake, MessageCircle } from 'lucide-react'
import { SellForm } from '@/components/forms/sell-form'
import { Reveal } from '@/components/motion/primitives'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Vendé tu auto',
  description: 'Te asesoramos para vender o entregar tu vehículo de manera simple. Pedí tu tasación sin compromiso.',
}

const steps = [
  { icon: Car, title: 'Completá el formulario', description: 'Contanos los datos de tu vehículo para poder evaluarlo.' },
  { icon: DollarSign, title: 'Recibí tu tasación', description: 'Te contactamos con una propuesta justa y competitiva.' },
  { icon: Handshake, title: 'Cerramos el trato', description: 'Si estás de acuerdo, coordinamos la entrega y el pago.' },
]

const benefits = [
  'Tasación sin compromiso',
  'Proceso rápido y simple',
  'Mejor precio del mercado',
  'Pago inmediato',
  'Gestión de toda la documentación',
  'Posibilidad de parte de pago',
]

export default function VendeTuAutoPage() {
  return (
    <main className="min-h-screen">
      <PageHero label="Vendé o entregá" lines={['Vendé', 'tu auto']}>
        En Bauti Motors te asesoramos para vender o entregar tu vehículo de manera simple y rápida.
      </PageHero>

      <section className="bg-[#080808] pb-16 lg:pb-24">
        <div className="shell">
          <ol className="grid border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10">
            {steps.map((step, index) => (
              <li key={step.title} className="border-b border-white/10 py-6 md:px-8 md:first:pl-0 md:last:pr-0">
                <Reveal delay={index * 0.1} y={18}>
                  <div className="flex items-center justify-between">
                    <span className="tabular text-sm text-primary">Paso {index + 1}</span>
                    <step.icon aria-hidden="true" className="h-5 w-5 text-[#8d8d8d]" />
                  </div>
                  <h2 className="mt-6 font-display text-xl font-bold text-white" style={{ fontStretch: '108%' }}>
                    {step.title}
                  </h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[#B8B8B8]">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#0c0c0c] py-16 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display display-lg text-white">Beneficios de vender con nosotros</h2>
            <ul className="mt-8 border-t border-white/10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 border-b border-white/10 py-3.5 text-white">
                  <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 text-white">
              <Clock aria-hidden="true" className="h-4 w-4 text-primary" />
              Respuesta en menos de 24hs
            </p>
            <a
              href={whatsappUrl('Hola, vengo desde la web de Bauti Motors y quiero consultar para vender mi auto.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-5 w-full sm:w-auto"
            >
              <MessageCircle />
              Consultar por WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.1} className="border border-white/10 bg-[#111111] p-6 md:p-10 lg:col-span-6 lg:col-start-7">
            <SellForm />
          </Reveal>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}
