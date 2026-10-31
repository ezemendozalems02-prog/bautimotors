'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { getMotoBySlug, motoPath } from '@/lib/motos'
import { messages, whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

/** Elige el mensaje según lo que la persona está mirando. */
function contextMessage(pathname: string) {
  const slug = pathname.match(/^\/motos\/([^/]+)$/)?.[1]
  const moto = slug ? getMotoBySlug(slug) : undefined
  if (moto) return messages.product(moto.name, motoPath(moto))
  if (pathname.startsWith('/financiacion') || pathname.startsWith('/preguntas-frecuentes')) return messages.financing()
  return messages.general()
}

/** Botón flotante global. En la ficha móvil sube para no tapar la barra de compra. */
export function WhatsAppButton() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const onMotoPage = /^\/motos\/[^/]+$/.test(pathname)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl(contextMessage(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'wa-pulse group fixed right-4 z-30 flex h-14 items-center rounded-full bg-[#1769E8] text-white shadow-[0_12px_32px_-8px_rgb(23_105_232/0.8)] transition-[opacity,translate,background-color] duration-500 hover:bg-[#0B43A8] md:right-6 md:bottom-6',
        onMotoPage ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(1rem+env(safe-area-inset-bottom))]',
        !visible && 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span className="eyebrow max-w-0 overflow-hidden whitespace-nowrap transition-[max-width,padding] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:max-w-44 group-hover:pl-5">
        Consultanos
      </span>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <MessageCircle className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12" />
      </span>
    </a>
  )
}
