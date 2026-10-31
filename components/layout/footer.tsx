import Link from 'next/link'
import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { activeCategories, categories } from '@/lib/motos'
import { financingDisclaimer, primaryNav, secondaryNav, site } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'

export function Footer() {
  return (
    <footer className="bg-[#080A0E] text-white">
      <div className="shell pt-16 pb-10 lg:pt-24">
        <p className="display display-xl max-w-5xl">
          {site.tagline} <span className="text-[#3985FF]">Empezá con tu DNI.</span>
        </p>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo className="text-base" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A8AFBC]">
              Motos 0 km y usadas en Tortuguitas, con orientación a alternativas de financiación.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="eyebrow text-[#A8AFBC]">Explorá</h2>
            <ul className="mt-3 text-sm">
              {[...primaryNav.slice(1), ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center text-white/85 transition-colors hover:text-[#3985FF]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categorías">
            <h2 className="eyebrow text-[#A8AFBC]">Categorías</h2>
            <ul className="mt-3 text-sm">
              {activeCategories().map((key) => (
                <li key={key}>
                  <Link href={`/motos/categoria/${key}`} className="inline-flex min-h-9 items-center text-white/85 transition-colors hover:text-[#3985FF]">
                    {categories[key].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/motos?condicion=usada" className="inline-flex min-h-9 items-center text-white/85 transition-colors hover:text-[#3985FF]">
                  Motos usadas
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-[#A8AFBC]">Contacto</h2>
            <ul className="mt-3 grid gap-1 text-sm">
              <li>
                <a href={whatsappUrl(messages.general())} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 transition-colors hover:text-[#3985FF]">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#3985FF]" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 transition-colors hover:text-[#3985FF]">
                  <Instagram className="h-4 w-4 shrink-0 text-[#3985FF]" />
                  {site.instagram.handle}
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2.5 py-2 transition-colors hover:text-[#3985FF]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3985FF]" />
                  {site.address.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-[#A8AFBC]">
          <p className="max-w-3xl">{financingDisclaimer}</p>
          <p className="mt-3">
            © {new Date().getFullYear()} {site.name}. Las ilustraciones de campaña no representan unidades del stock.
          </p>
        </div>
      </div>
    </footer>
  )
}
