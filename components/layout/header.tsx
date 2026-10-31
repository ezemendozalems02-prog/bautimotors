'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { ease } from '@/components/motion/primitives'
import { defaultWhatsappMessage, primaryNav, secondaryNav, site, whatsappUrl } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 24)
    // Baja la barra al leer y la devuelve apenas se sube.
    setHidden(current > 520 && current > previous + 2 ? true : current < previous - 2 ? false : hidden)
  })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500',
          scrolled && !open ? 'glass-nav border-white/8' : 'border-transparent',
        )}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <nav
          aria-label="Principal"
          className={cn(
            'shell flex items-center justify-between transition-[height] duration-500',
            scrolled ? 'h-16' : 'h-20 lg:h-24',
          )}
        >
          <Link href="/" aria-label="Bauti Motors, inicio" className="relative z-10 text-[0.95rem] transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'eyebrow relative block py-2 transition-colors duration-300',
                      active ? 'text-white' : 'text-[#B8B8B8] hover:text-white',
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden !min-h-11 !px-5 lg:inline-flex"
          >
            Contactar
            <ArrowRight />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative z-10 -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-7">
              <span
                className={cn(
                  'absolute right-0 h-0.5 w-7 bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute right-0 h-0.5 bg-primary transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]',
                  open ? 'top-1.5 w-7 -rotate-45' : 'top-2.5 w-[1.125rem]',
                )}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#080808] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="tech-grid absolute inset-0" aria-hidden="true" />
            <nav aria-label="Menú móvil" className="shell relative flex flex-1 flex-col pt-28 pb-8">
              <ul>
                {primaryNav.map((item, index) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href} className="border-b border-white/10">
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.18 + index * 0.06, ease }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-baseline gap-4 py-5"
                        >
                          <span className="tabular text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                          <span className={cn('display text-[2rem]', !active && 'text-white/75')}>{item.name}</span>
                          {active && <span aria-hidden="true" className="ml-auto h-2 w-2 self-center bg-primary" />}
                        </Link>
                      </motion.div>
                    </li>
                  )
                })}
              </ul>

              <motion.ul
                className="mt-6 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center gap-2 text-[#B8B8B8]"
                    >
                      {item.name}
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </Link>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-auto pt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.56, ease }}
              >
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <MessageCircle />
                  Contactar por WhatsApp
                </a>
                <p className="eyebrow mt-5 text-center text-[#B8B8B8]">{site.location}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
