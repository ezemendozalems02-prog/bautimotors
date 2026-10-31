import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { primaryNav, secondaryNav, site, whatsappUrl } from '@/lib/site'

const serviceLinks = [
  { name: 'Venta de vehículos', href: '/catalogo' },
  { name: 'Toma de usados', href: '/vende-tu-auto' },
  { name: 'Asesoramiento', href: '/servicios' },
  { name: 'Financiación', href: '/servicios' },
]

const socialLinks = [
  { name: 'Instagram', href: site.social.instagram, icon: Instagram },
  { name: 'Facebook', href: site.social.facebook, icon: Facebook },
].filter((item) => item.href)

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow mb-5 text-white/50">{children}</h2>
}

const linkClass = 'inline-block py-1 text-sm text-[#B8B8B8] transition-colors duration-300 hover:text-primary'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808]">
      <div className="h-px bg-[linear-gradient(90deg,transparent,rgb(255_212_0/0.45),transparent)]" />

      <div className="shell pt-16 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Bauti Motors, inicio" className="inline-block text-lg">
              <Logo />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-[#B8B8B8]">
              Calidad, confianza y una experiencia a otro nivel.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#B8B8B8] transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-2">
            <div>
              <ColumnTitle>Navegación</ColumnTitle>
              <ul>
                {[...primaryNav, ...secondaryNav].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColumnTitle>Servicios</ColumnTitle>
              <ul>
                {serviceLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={linkClass}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ColumnTitle>Contacto</ColumnTitle>
            <ul className="space-y-1">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${linkClass} tabular`}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-sm text-[#B8B8B8]">{site.location}</li>
              {site.hours.map((line) => (
                <li key={line} className="text-sm text-[#B8B8B8]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/8 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#B8B8B8]">
            © {new Date().getFullYear()} Bauti Motors. Todos los derechos reservados.
          </p>
          <p className="eyebrow text-white/40">{site.location}</p>
        </div>
      </div>

      {/* La marca se apoya en el borde inferior, cortada a propósito. */}
      <div aria-hidden="true" className="select-none overflow-hidden">
        <p
          className="display text-outline -mb-[0.2em] whitespace-nowrap text-center text-[21vw] leading-none"
          style={{ fontStretch: '125%' }}
        >
          BAUTI
        </p>
      </div>
    </footer>
  )
}
