'use client'

import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { defaultWhatsappMessage, whatsappUrl } from '@/lib/site'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  /** Oculta el botón hasta salir del hero, que ya tiene su propio acceso a WhatsApp. */
  hideAtTop?: boolean
}

export function WhatsAppButton({ message = defaultWhatsappMessage, className, hideAtTop = false }: WhatsAppButtonProps) {
  const [pastHero, setPastHero] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (current) => setPastHero(current > window.innerHeight * 0.7))

  const hidden = hideAtTop && !pastHero

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        'group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex h-14 items-center overflow-hidden rounded-full border border-primary/50 bg-[#111111] text-primary shadow-[0_8px_30px_rgb(0_0_0/0.5)] transition-[color,background-color,border-color,opacity,translate] duration-300 hover:border-primary hover:bg-primary hover:text-[#090909] md:right-6 md:bottom-6',
        hidden && 'pointer-events-none translate-y-4 opacity-0',
        className,
      )}
    >
      <span className="eyebrow max-w-0 overflow-hidden whitespace-nowrap transition-[max-width,padding] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:max-w-44 group-hover:pl-5">
        Chateá con nosotros
      </span>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <MessageCircle className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12" />
      </span>
    </a>
  )
}
