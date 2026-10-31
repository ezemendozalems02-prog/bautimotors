'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Logo } from '@/components/brand/logo'
import { ease, finishIntro } from '@/components/motion/primitives'

/** Duración total: breve a propósito. No hay porcentajes: no simula una carga. */
const HOLD_MS = 1250
const EXIT_MS = 650

export function Preloader() {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'done') {
      finishIntro()
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishIntro()
      return
    }

    let exitTimer: number
    const holdTimer = window.setTimeout(() => {
      setLeaving(true)
      exitTimer = window.setTimeout(finishIntro, EXIT_MS)
    }, HOLD_MS)

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
    }
  }, [])

  return (
    <motion.div
      className="preloader fixed inset-0 z-[100] overflow-hidden bg-[#05070B]"
      role="status"
      aria-label="Cargando Tu Moto Ya"
      initial={false}
      animate={leaving ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* La moto aparece detrás de la línea, a través de una máscara que abre a lo ancho. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ clipPath: 'inset(49% 100% 49% 0)', opacity: 0.9 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0)', opacity: 0.55 }}
        transition={{ duration: 0.95, delay: 0.3, ease }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.webp" />
          <Image src="/images/hero-desktop.webp" alt="" fill sizes="100vw" className="object-cover" priority />
        </picture>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-[2px] w-full origin-left bg-[linear-gradient(90deg,transparent,#1769E8_40%,#3985FF_75%,#fff)] shadow-[0_0_24px_#3985FF]"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.7, ease }, opacity: { duration: 0.45, delay: 0.55 } }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={leaving ? { opacity: 0, y: -14 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: leaving ? 0.3 : 0.7, delay: leaving ? 0 : 0.25, ease }}
        >
          <Logo className="text-[1.5rem] md:text-[2.1rem]" />
        </motion.div>
      </div>

      {/* Indicador discreto: se mueve mientras carga, sin inventar un porcentaje. */}
      <div aria-hidden="true" className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 h-px w-24 -translate-x-1/2 overflow-hidden bg-white/15">
        <motion.span
          className="block h-full w-1/2 bg-[#3985FF]"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
