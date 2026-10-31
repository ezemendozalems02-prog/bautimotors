'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'

export const ease = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Entrada suave al aparecer en pantalla. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Línea que se dibuja de izquierda a derecha al entrar en pantalla. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn('block h-px origin-left bg-primary', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, delay, ease }}
    />
  )
}

/** Título que sube detrás de una máscara, línea por línea. */
export function MaskedLines({
  lines,
  className,
  active = true,
  delay = 0,
  inView = false,
}: {
  lines: React.ReactNode[]
  className?: string
  active?: boolean
  delay?: number
  inView?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  // Se observa el contenedor: el texto arranca fuera de la máscara y nunca entraría en vista por sí solo.
  const seen = useInView(ref, { once: true, margin: '-4% 0px' })
  const show = inView ? seen : active

  return (
    <span ref={ref} className={cn('block', className)}>
      {lines.map((line, index) => (
        <span key={index} className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: '108%' }}
            animate={{ y: show ? '0%' : '108%' }}
            transition={{ duration: 1.05, delay: delay + index * 0.1, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Imagen con profundidad: se desplaza más lento que la página. */
export function Parallax({
  children,
  className,
  distance = 48,
}: {
  children: React.ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-distance, distance])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
        {children}
      </motion.div>
    </div>
  )
}

/** Contador que sube hasta su valor real cuando entra en pantalla. */
export function CountUp({ value, pad = 0, className }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease,
      onUpdate: (latest) => setShown(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref} className={className}>
      {String(shown).padStart(pad, '0')}
    </span>
  )
}

/** Cifra que transiciona entre valores: la usa la calculadora. */
export function AnimatedNumber({ value, format, className }: { value: number; format: (value: number) => string; className?: string }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const previous = useRef(value)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      previous.current = value
      return
    }
    const controls = animate(previous.current, value, { duration: 0.5, ease, onUpdate: setShown })
    previous.current = value
    return () => controls.stop()
  }, [reduced, value])

  return <span className={className}>{format(shown)}</span>
}

/* Estado de la intro: las animaciones del hero esperan a que termine el preloader. */
const INTRO_EVENT = 'tm:intro-done'

function subscribeIntro(callback: () => void) {
  window.addEventListener(INTRO_EVENT, callback)
  return () => window.removeEventListener(INTRO_EVENT, callback)
}

export function useIntroDone() {
  return useSyncExternalStore(
    subscribeIntro,
    () => document.documentElement.dataset.intro === 'done',
    () => false,
  )
}

export function finishIntro() {
  try {
    sessionStorage.setItem('tm-intro', '1')
  } catch {
    // Sin sessionStorage la intro se repite, pero el sitio funciona igual.
  }
  document.documentElement.dataset.intro = 'done'
  window.dispatchEvent(new Event(INTRO_EVENT))
}
