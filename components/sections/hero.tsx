'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, IdCard } from 'lucide-react'
import { ease, MaskedLines, Parallax, useIntroDone } from '@/components/motion/primitives'
import { quoteCta, site } from '@/lib/site'

const headline = ['Tu próxima', 'moto está', 'más cerca de', 'lo que pensás.']

export function Hero() {
  const ready = useIntroDone()
  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#05070B] text-white">
      <Parallax distance={36} className="absolute inset-0 -z-10">
        <motion.div className="relative h-full w-full" initial={{ scale: 1.07, opacity: 0.4 }} animate={ready ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 1.8, ease }}>
          {/* Ilustración de campaña generada para la marca: no es una unidad del stock. */}
          <Image src="/images/hero-desktop.webp" alt="" fill priority sizes="100vw" className="hidden object-cover object-[70%_60%] md:block" />
          <Image src="/images/hero-mobile.webp" alt="" fill priority sizes="100vw" className="object-cover object-bottom md:hidden" />
        </motion.div>
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(5_7_11/0.7),transparent_55%)] max-md:bg-[linear-gradient(180deg,rgb(5_7_11/0.45),transparent_55%)]" />

      <div className="shell pt-24 md:pt-32 lg:pt-36">
        <motion.p {...appear(0.05)} className="eyebrow text-[#3985FF]">
          Motos 0 km y usadas · Tortuguitas
        </motion.p>

        <h1 className="display display-hero mt-4 max-w-[15ch]">
          <MaskedLines active={ready} delay={0.1} lines={headline} />
        </h1>

        <motion.p {...appear(0.45)} className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
          Elegí el modelo que te gusta y consultá las alternativas de financiación. Empezá tu camino con {site.name}.
        </motion.p>

        <motion.div {...appear(0.55)} className="mt-6 grid grid-cols-2 gap-2 sm:flex">
          <Link href={quoteCta.href} className="btn btn-primary max-sm:!px-2 max-sm:!text-[0.7rem]">
            {quoteCta.label}
            <ArrowRight className="max-sm:hidden" />
          </Link>
          <Link href="/motos" className="btn btn-ghost max-sm:!px-2 max-sm:!text-[0.7rem]">
            Explorar modelos
          </Link>
        </motion.div>
      </div>

      <div className="shell pt-8 pb-5">
        <motion.div {...appear(0.7)} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display flex items-center gap-2.5 text-lg font-extrabold tracking-tight uppercase md:text-2xl">
              <IdCard aria-hidden="true" className="h-6 w-6 shrink-0 text-[#3985FF]" />
              Consultá con tu DNI.
            </p>
            <p className="mt-1 max-w-sm text-xs text-white/65">Sujeto a las condiciones reales de cada alternativa. La consulta no implica aprobación crediticia.</p>
          </div>
          <div aria-hidden="true" className="hidden items-center gap-3 md:flex">
            <span className="eyebrow text-white/60">Scroll</span>
            <span className="block h-10 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue block h-full w-full bg-[#3985FF]" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
