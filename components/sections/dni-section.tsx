'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bike, Headset, IdCard, Layers } from 'lucide-react'
import { ease, Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { financingDisclaimer } from '@/lib/site'

const highlights = [
  { icon: IdCard, title: 'Consulta inicial con DNI', text: 'Empezás a averiguar sin vueltas.' },
  { icon: Headset, title: 'Atención personalizada', text: 'Hablás con una persona del equipo.' },
  { icon: Layers, title: 'Alternativas de financiación', text: 'Te contamos las opciones vigentes.' },
  { icon: Bike, title: 'Diferentes modelos', text: 'Buscamos la moto que te sirva a vos.' },
]

/** Documento ilustrativo: líneas y bloques genéricos, sin ningún dato de persona. */
function IdCardArt() {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] [perspective:1100px]" aria-hidden="true">
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-px bg-gradient-to-r from-transparent via-[#3985FF] to-transparent"
          style={{ top: `${22 + index * 28}%`, left: '-16%', width: '132%' }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.14, ease }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 46, rotateX: 22, rotateZ: -7 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 8, rotateZ: -4 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease }}
        className="relative aspect-[1.586] rounded-2xl border border-white/30 bg-gradient-to-br from-[#EAF2FF] via-white to-[#CFE0FF] p-[6%] text-[#0B43A8] shadow-[0_50px_80px_-30px_rgb(0_0_0/0.7)]"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-[clamp(0.7rem,2.6vw,1rem)] font-extrabold tracking-tight">DOCUMENTO</span>
          <span className="eyebrow !text-[clamp(0.5rem,1.7vw,0.62rem)] text-[#0B43A8]/70">Ilustrativo</span>
        </div>
        <div className="mt-[6%] grid grid-cols-[32%_1fr] gap-[6%]">
          <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-[#0B43A8]/10">
            <span className="block h-1/3 w-1/3 rounded-full bg-[#0B43A8]/25 shadow-[0_2.6rem_0_0.9rem_rgb(11_67_168/0.2)]" />
          </div>
          <div className="grid content-start gap-[0.6rem] pt-[4%]">
            {['w-11/12', 'w-2/3', 'w-5/6', 'w-1/2'].map((width) => (
              <span key={width} className={`h-[0.42rem] rounded-full bg-[#0B43A8]/20 ${width}`} />
            ))}
            <span className="mt-[8%] h-[1.1rem] w-3/5 rounded bg-[repeating-linear-gradient(90deg,#0B43A8_0_2px,transparent_2px_5px)] opacity-40" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function DniSection({ href = '/financiacion#simulador' }: { href?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#0B43A8] text-white">
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <div aria-hidden="true" className="absolute -top-1/4 -right-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(57_133_255/0.55),transparent)]" />
      <div className="section shell relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <SectionHeading tone="dark" label="Financiación" lines={['¿Tenés tu DNI?', 'Empezá a consultar', 'por tu moto.']}>
            Te ayudamos a conocer las alternativas disponibles para que puedas encontrar una moto y un plan acorde a tus posibilidades.
          </SectionHeading>

          <ul className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.07} y={16} className="flex gap-3">
                  <item.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#9CC3FF]" />
                  <p>
                    <span className="block font-bold">{item.title}</span>
                    <span className="text-sm text-white/75">{item.text}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-9">
            <Link href={href} className="btn btn-white w-full sm:w-auto">
              Consultar financiación
              <ArrowRight />
            </Link>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/70">{financingDisclaimer} No te pedimos fotos del DNI ni datos sensibles en esta web.</p>
          </Reveal>
        </div>

        <IdCardArt />
      </div>
    </section>
  )
}
