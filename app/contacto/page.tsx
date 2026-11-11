import type { Metadata } from 'next'
import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { Reveal } from '@/components/motion/primitives'
import { PageHero } from '@/components/sections/page-hero'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { site, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Estamos para ayudarte a encontrar el auto indicado. Escribinos por WhatsApp o completá el formulario.',
}

const contactInfo = [
  { icon: Phone, title: 'Teléfono / WhatsApp', lines: [site.phoneDisplay], href: whatsappUrl() },
  { icon: Mail, title: 'Email', lines: [site.email], href: `mailto:${site.email}` },
  { icon: MapPin, title: 'Ubicación', lines: [site.location] },
  { icon: Clock, title: 'Horarios de atención', lines: site.hours },
]

const socialLinks = [
  { name: 'Instagram', href: site.social.instagram, icon: Instagram },
  { name: 'Facebook', href: site.social.facebook, icon: Facebook },
].filter((item) => item.href)

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <PageHero label="Contacto" lines={['Encontremos', 'tu próximo', 'vehículo.']}>
        Estamos para ayudarte a encontrar el auto indicado.
      </PageHero>

      <section className="bg-[#090909] pb-20 lg:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <a
              href={whatsappUrl('Hola, vengo desde la web de Ghanima Motors y quiero consultar.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:!min-h-16"
            >
              <MessageCircle />
              Abrir WhatsApp
            </a>

            <ul className="mt-8 border-t border-white/10">
              {contactInfo.map((info) => (
                <li key={info.title} className="flex items-start gap-4 border-b border-white/10 py-5">
                  <info.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h2 className="eyebrow text-[#B8B8B8]">{info.title}</h2>
                    {info.lines.map((line) =>
                      info.href ? (
                        <a
                          key={line}
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="mt-1 block text-white transition-colors hover:text-primary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="mt-1 text-white">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#B8B8B8] transition-colors hover:border-primary hover:text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}

            <a
              href={whatsappUrl('Hola, quiero coordinar una visita al showroom.')}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-8"
            >
              Coordinar visita al showroom
              <ArrowRight />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="border border-white/10 bg-[#111111] p-6 md:p-10 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}
