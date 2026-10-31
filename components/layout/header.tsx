'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, MessageCircle, X } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { ease } from '@/components/motion/primitives'
import { primaryNav, quoteCta, site } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const HOME_SECTION = 'como-comprar'

/** Calcula el enlace activo: por ruta y, en el inicio, por la sección visible. */
function useActiveHref() {
  const pathname = usePathname()
  const [onSteps, setOnSteps] = useState(false)

  useEffect(() => {
    setOnSteps(false)
    if (pathname !== '/') return
    const target = document.getElementById(HOME_SECTION)
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setOnSteps(entry.isIntersecting), {
      rootMargin: '-45% 0px -45% 0px',
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [pathname])

  if (pathname === '/') return onSteps ? `/#${HOME_SECTION}` : '/'
  return primaryNav.find((item) => item.href !== '/' && pathname.startsWith(item.href))?.href ?? null
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const activeHref = useActiveHref()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const light = scrolled && !menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          light ? 'glass-light border-[#E2E6EC]' : 'border-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" aria-label="Tu Moto Ya, ir al inicio" className="flex min-h-11 items-center">
            <Logo tone={light ? 'dark' : 'light'} className="text-[0.95rem] lg:text-[1.05rem]" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
            {primaryNav.map((item) => {
              const active = activeHref === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3 py-2.5 text-[0.9rem] font-semibold transition-colors duration-300',
                    light ? 'text-[#20242B] hover:text-primary' : 'text-white/80 hover:text-white',
                    active && (light ? 'text-primary' : 'text-white'),
                  )}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#3985FF]"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href={quoteCta.href} className="btn btn-primary !min-h-11 !px-3.5 !text-[0.7rem] sm:!px-5 sm:!text-[0.75rem]">
              {quoteCta.label}
              <ArrowRight className="hidden sm:block" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className={cn('flex h-11 w-11 items-center justify-center xl:hidden', light ? 'text-[#080A0E]' : 'text-white')}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#080A0E] xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Móvil" className="shell flex flex-1 flex-col justify-center pt-20 pb-6">
              {primaryNav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.05, ease }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'font-display flex min-h-14 items-center justify-between text-[1.45rem] font-bold tracking-tight',
                      activeHref === item.href ? 'text-[#3985FF]' : 'text-white',
                    )}
                  >
                    {item.name}
                    <ArrowRight className="h-5 w-5 text-white/40" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="shell safe-bottom grid gap-2 pb-6">
              <Link href="/financiacion" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full">
                Consultar financiación
              </Link>
              <a href={whatsappUrl(messages.general())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                <MessageCircle />
                {site.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
