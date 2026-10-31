import type { Metadata } from 'next'
import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import { PageHero } from '@/components/sections/page-hero'
import { site } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contactá a Tu Moto Ya por WhatsApp al ${site.phoneDisplay} o visitanos en ${site.address.display}.`,
  alternates: { canonical: '/contacto' },
}

const channels = [
  { icon: MessageCircle, title: 'WhatsApp', value: site.phoneDisplay, href: whatsappUrl(messages.general()) },
  { icon: Instagram, title: 'Instagram', value: site.instagram.handle, href: site.instagram.url },
  { icon: MapPin, title: 'Dirección', value: site.address.display, href: site.mapsUrl },
]

export default function ContactoPage() {
  return (
    <main>
      <PageHero label="Contacto" lines={['Hablemos', 'de tu moto']}>
        Escribinos por el canal que te quede más cómodo.
      </PageHero>
      <section className="section bg-white">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <ul className="grid content-start gap-3">
            {channels.map((channel) => (
              <li key={channel.title}>
                <a href={channel.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl bg-[#F3F5F8] p-5 transition-colors hover:bg-[#EAF2FF]">
                  <channel.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <span className="eyebrow block text-[#5A6270]">{channel.title}</span>
                    <span className="mt-1 block font-semibold">{channel.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div>
            <h2 className="display display-md">Mandanos tu consulta</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
