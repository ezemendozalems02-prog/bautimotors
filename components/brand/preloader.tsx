'use client'

import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { Logo } from '@/components/brand/logo'
import { ease, finishIntro } from '@/components/motion/primitives'

const DURATION = 1.9

export function Preloader() {
  const [progress, setProgress] = useState(0)
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
    const controls = animate(0, 100, {
      duration: DURATION,
      delay: 0.25,
      ease: [0.45, 0.05, 0.25, 1],
      onUpdate: (latest) => setProgress(Math.round(latest)),
      onComplete: () => {
        setLeaving(true)
        exitTimer = window.setTimeout(finishIntro, 950)
      },
    })

    return () => {
      controls.stop()
      window.clearTimeout(exitTimer)
    }
  }, [])

  return (
    <motion.div
      className="preloader fixed inset-0 z-[100] overflow-hidden bg-[#080808]"
      role="status"
      aria-label="Cargando Bauti Motors"
      initial={false}
      animate={leaving ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Luz amarilla muy tenue detrás de la marca. */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-[50vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(255_212_0/0.1),transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={leaving ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: leaving ? 0.45 : 0.9, ease }}
        >
          <Logo className="text-[1.25rem] md:text-[1.75rem]" />
        </motion.div>
      </div>

      {/* Línea de velocidad: cruza la pantalla una vez. */}
      <motion.span
        aria-hidden="true"
        className="absolute top-[calc(50%+4rem)] left-0 h-px w-full origin-left bg-[linear-gradient(90deg,transparent,#FFD400_70%,#fff)]"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 1.1, delay: 0.2, ease }, opacity: { duration: 0.7, delay: 1.1 } }}
      />

      <div className="absolute inset-x-0 bottom-0 pb-8">
        <div className="shell flex items-end justify-between">
          <span className="eyebrow text-[#B8B8B8]">Preparando la experiencia</span>
          <span className="tabular text-4xl font-light text-white md:text-5xl">
            {String(progress).padStart(2, '0')}
            <span className="ml-0.5 text-lg text-primary">%</span>
          </span>
        </div>
        <div className="shell mt-4">
          <div className="h-px w-full bg-[#252525]">
            <div
              className="h-px origin-left bg-primary"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
