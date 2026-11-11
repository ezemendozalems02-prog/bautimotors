'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ease, MaskedLines, useIntroDone } from '@/components/motion/primitives'
import { defaultWhatsappMessage, site, whatsappUrl } from '@/lib/site'
import { getAllBrands, getCatalogStats } from '@/lib/vehicles'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const ready = useIntroDone()
  const reduced = useReducedMotion()
  const stats = getCatalogStats()
  const brands = getAllBrands()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, delay, ease },
  })

  const readouts = [
    { label: 'Unidades', value: String(stats.units) },
    { label: 'Marcas', value: String(stats.brands).padStart(2, '0') },
    { label: 'Modelos', value: `${stats.oldestYear}–${stats.newestYear}` },
  ]

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#090909]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10" aria-hidden="true">
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero-desktop.webp" />
          <img
            src="/images/hero-mobile.webp"
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-bottom motion-safe:animate-[hero-breathe_16s_ease-in-out_infinite_alternate] md:object-[70%_50%]"
          />
        </picture>
        {/* Haz de luz roja rasante sobre el piso del estudio. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(60%_50%_at_72%_100%,rgb(227_38_46/0.11),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#090909_2%,transparent_34%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#090909_18%,rgb(9_9_9/0.5)_46%,transparent_66%)] md:block" />
      </motion.div>

      {/* Líneas técnicas */}
      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10 opacity-60" />
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-[clamp(1.25rem,4vw,4rem)] h-full w-px origin-top bg-white/8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: ready ? 1 : 0 }}
        transition={{ duration: 1.6, ease }}
      />

      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="shell relative flex flex-1 flex-col pt-28 pb-6 md:justify-center md:pt-32 lg:pb-28"
      >
        <motion.p {...appear(0.1)} className="eyebrow mb-6 flex items-center gap-3 text-[#B8B8B8] md:mb-8">
          <span className="h-px w-8 bg-primary" />
          {site.location}
        </motion.p>

        <h1 className="display display-hero whitespace-nowrap text-white">
          <MaskedLines active={ready} delay={0.15} lines={['Tu próximo auto', <span key="b" className="text-metal">comienza acá.</span>]} />
        </h1>

        <motion.p
          {...appear(0.5)}
          className="mt-5 max-w-[30rem] text-base leading-relaxed text-[#B8B8B8] md:mt-7 md:text-lg"
        >
          Una nueva forma de encontrar el vehículo que estás buscando. Calidad, confianza y una experiencia a otro nivel.
        </motion.p>

        {/* En móvil el auto ocupa este aire; los botones quedan al alcance del pulgar. */}
        <motion.div
          {...appear(0.65)}
          className="mt-auto flex flex-col gap-3 pt-[42svh] sm:flex-row md:mt-9 md:pt-0"
        >
          <Link href="/catalogo" className="btn btn-primary">
            Explorar vehículos
            <ArrowRight />
          </Link>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost bg-[#090909]/40"
          >
            <MessageCircle />
            Contactar asesor
          </a>
        </motion.div>
      </motion.div>

      {/* Instrumental: todos los valores salen del stock real. */}
      <motion.div
        {...appear(0.85)}
        className="shell absolute right-0 bottom-20 left-0 hidden items-end justify-between lg:flex"
      >
        <span className="eyebrow flex items-center gap-3 text-[#B8B8B8]">
          <span className="relative block h-9 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-0 bg-primary motion-safe:animate-[scroll-cue_2.4s_cubic-bezier(.76,0,.24,1)_infinite]" />
          </span>
          Deslizá
        </span>
        <dl className="flex divide-x divide-white/12">
          {readouts.map((item) => (
            <div key={item.label} className="px-8 last:pr-0">
              <dd className="tabular text-2xl font-light text-white">{item.value}</dd>
              <dt className="eyebrow mt-1 text-[#B8B8B8]">{item.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>

      <div className="border-y border-white/8 bg-[#090909]" aria-label={`Marcas en stock: ${brands.join(', ')}`}>
        <div aria-hidden="true" className="flex overflow-hidden py-4">
          <div className="marquee flex shrink-0 gap-14 pr-14">
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <span key={index} className="eyebrow flex items-center gap-14 whitespace-nowrap text-white/45">
                {brand}
                <span className="h-1 w-1 bg-primary" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
