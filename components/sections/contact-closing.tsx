'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { DrawLine, MaskedLines, Parallax, Reveal } from '@/components/motion/primitives'
import { defaultWhatsappMessage, site, whatsappUrl } from '@/lib/site'

const contactItems = [
  { icon: Phone, label: 'Teléfono / WhatsApp', lines: [site.phoneDisplay], href: whatsappUrl() },
  { icon: Mail, label: 'Email', lines: [site.email], href: `mailto:${site.email}` },
  { icon: MapPin, label: 'Ubicación', lines: [site.location] },
  { icon: Clock, label: 'Horarios', lines: site.hours },
]

export function ContactClosing() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080808] pt-20 pb-14 lg:pt-32 lg:pb-20">
      <Parallax distance={36} className="absolute inset-x-0 top-0 -z-10 h-[75%]">
        <Image src="/images/contacto-faros.webp" alt="" fill sizes="100vw" className="object-cover object-[80%_85%] md:object-[100%_85%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#080808_4%,transparent_40%),linear-gradient(to_bottom,#080808,transparent_35%),linear-gradient(90deg,rgb(8_8_8/0.8),transparent_70%)]" />
      </Parallax>

      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="tabular text-xs text-primary">07</span>
          <DrawLine className="w-10" />
          <span className="eyebrow text-[#B8B8B8]">Contacto</span>
        </div>

        <h2 className="display display-xl mt-6 max-w-[11em] text-white">
          <MaskedLines inView lines={['Encontremos', 'tu próximo', 'vehículo.']} />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-[#B8B8B8]">Estamos para ayudarte a encontrar el auto indicado.</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary sm:!min-h-16 sm:!px-9"
          >
            <MessageCircle />
            Hablar por WhatsApp
          </a>
          <Link href="/contacto" className="btn btn-ghost bg-[#080808]/40 sm:!min-h-16 sm:!px-9">
            Formulario de consulta
            <ArrowRight />
          </Link>
        </Reveal>

        <dl className="mt-16 grid gap-px border-y border-white/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {contactItems.map((item) => (
            <div key={item.label} className="py-5 lg:px-6 lg:py-6 lg:first:pl-0">
              <dt className="eyebrow flex items-center gap-2 text-[#B8B8B8]">
                <item.icon aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                {item.label}
              </dt>
              {item.lines.map((line) => (
                <dd key={line} className="mt-2 text-[0.95rem] text-white">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="transition-colors duration-300 hover:text-primary"
                    >
                      {line}
                    </a>
                  ) : (
                    line
                  )}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
