import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Car,
  CheckCircle,
  FileCheck,
  HandCoins,
  MessageCircle,
  Search,
  Shield,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Venta de vehículos, toma de usados, búsqueda personalizada, gestión documental y financiación.',
}

const services = [
  {
    icon: Car,
    title: 'Venta de vehículos',
    description: 'Catálogo de vehículos seleccionados: BMW, Mercedes-Benz, Audi, Jaguar y más.',
    features: ['Unidades seleccionadas', 'Información completa y transparente', 'Fichas técnicas detalladas'],
    cta: 'Ver catálogo',
    href: '/catalogo',
  },
  {
    icon: HandCoins,
    title: 'Toma de usados',
    description: 'Evaluamos tu vehículo actual como parte de pago, con una tasación justa y profesional.',
    features: ['Evaluación sin compromiso', 'Tasación profesional', 'Proceso rápido y transparente'],
    cta: 'Vendé tu auto',
    href: '/vende-tu-auto',
  },
  {
    icon: Search,
    title: 'Búsqueda personalizada',
    description: 'Si no encontrás lo que buscás en nuestro catálogo, te ayudamos a conseguirlo.',
    features: ['Búsqueda según tus preferencias', 'Verificación completa', 'Sin costo adicional'],
    cta: 'Consultar',
    href: '/contacto',
  },
  {
    icon: MessageCircle,
    title: 'Asesoramiento por WhatsApp',
    description: 'Consultá rápido y directo. Respuestas profesionales para todas tus dudas.',
    features: ['Asesoramiento profesional', 'Envío de fotos y videos', 'Coordinación de visitas'],
    cta: 'Escribinos',
    href: whatsappUrl(),
    external: true,
  },
  {
    icon: FileCheck,
    title: 'Gestión documental',
    description: 'Nos encargamos de la documentación: transferencias, verificaciones y trámites.',
    features: ['Transferencia de titularidad', 'Verificación policial', 'Informes de dominio'],
    cta: 'Más información',
    href: '/contacto',
  },
  {
    icon: Banknote,
    title: 'Opciones de financiación',
    description: 'Te conectamos con opciones de financiación adaptadas a tus necesidades.',
    features: ['Múltiples opciones', 'Planes personalizados', 'Sin compromiso'],
    cta: 'Consultar opciones',
    href: '/contacto',
  },
]

const benefits = [
  { icon: Shield, title: 'Calidad', description: 'Las unidades pasan por un proceso de selección antes de publicarse.' },
  { icon: Users, title: 'Atención personalizada', description: 'Un trato adaptado a las necesidades de cada cliente.' },
  { icon: CheckCircle, title: 'Proceso transparente', description: 'Sin sorpresas ni costos ocultos. Todo claro desde el primer momento.' },
]

export default function ServiciosPage() {
  return (
    <main className="min-h-screen">
      <PageHero label="Servicios integrales" lines={['Nuestros', 'servicios']}>
        Te acompañamos en cada paso, para una experiencia de compra sin preocupaciones.
      </PageHero>

      <section className="bg-[#080808] pb-20 lg:pb-32">
        <div className="shell">
          {services.map((service, index) => (
            <Reveal key={service.title} y={18}>
              <article className="grid gap-5 border-t border-white/10 py-8 md:grid-cols-12 md:gap-6 lg:py-10">
                <div className="flex items-center gap-4 md:col-span-1 md:block">
                  <span className="tabular text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                  <service.icon aria-hidden="true" className="h-6 w-6 text-primary md:mt-4" />
                </div>
                <div className="md:col-span-5">
                  <h2 className="font-display text-2xl leading-tight font-bold text-white lg:text-3xl" style={{ fontStretch: '108%' }}>
                    {service.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-[#B8B8B8]">{service.description}</p>
                </div>
                <ul className="space-y-1.5 md:col-span-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[0.95rem] text-white">
                      <span aria-hidden="true" className="h-1 w-1 bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={service.href}
                    target={service.external ? '_blank' : undefined}
                    rel={service.external ? 'noopener noreferrer' : undefined}
                    className="link-line"
                  >
                    {service.cta}
                    <ArrowUpRight />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0c0c0c] py-20">
        <div className="shell grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <benefit.icon aria-hidden="true" className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-display text-lg font-bold text-white" style={{ fontStretch: '108%' }}>
                {benefit.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#B8B8B8]">{benefit.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#080808] py-20 lg:py-28">
        <div className="shell">
          <h2 className="display display-lg max-w-[14em] text-white">Consultá sin compromiso</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl('Hola, vengo desde la web de Bauti Motors y quiero consultar por los servicios.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle />
              WhatsApp
            </a>
            <Link href="/contacto" className="btn btn-ghost">
              Formulario de contacto
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}
