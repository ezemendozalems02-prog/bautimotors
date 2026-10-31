'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CountUp, DrawLine, MaskedLines, Parallax, Reveal } from '@/components/motion/primitives'
import { getCatalogStats } from '@/lib/vehicles'

export function About({ showLink = true }: { showLink?: boolean }) {
  const stats = getCatalogStats()

  return (
    <section className="relative overflow-hidden bg-[#111111] py-20 lg:py-36">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="relative lg:col-span-7 lg:row-span-2 lg:-ml-[clamp(1.25rem,4vw,4rem)]">
          <Parallax className="relative aspect-[5/4] lg:aspect-[6/5]">
            <Image src="/hero-car.jpg" alt="Vehículo negro en un salón oscuro" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,#111111,transparent_38%)]" />
          </Parallax>
          <Reveal
            delay={0.25}
            y={44}
            className="relative z-10 -mt-20 ml-auto w-[62%] border-l-2 border-primary md:w-[46%] lg:absolute lg:right-[-2%] lg:bottom-[-7%] lg:mt-0"
          >
            <div className="relative aspect-[3/2]">
              <Image src="/images/detalle-optica.webp" alt="Detalle de óptica y llanta de un auto gris" fill sizes="(max-width: 1024px) 60vw, 26vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pl-10">
          <div className="flex items-center gap-3">
            <span className="tabular text-xs text-primary">02</span>
            <DrawLine className="w-10" />
            <span className="eyebrow text-[#B8B8B8]">Nosotros</span>
          </div>
          <h2 className="display mt-5 text-[clamp(2rem,3.4vw,3.6rem)] text-white">
            <MaskedLines inView lines={['Mucho más', 'que un auto.']} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-[#B8B8B8] md:text-lg">
              En Bauti Motors entendemos que elegir un vehículo es una decisión importante. Por eso buscamos ofrecer una
              experiencia de compra diferente, combinando atención personalizada, calidad y compromiso en cada operación.
            </p>
          </Reveal>
          {showLink && (
            <Reveal delay={0.3} className="mt-7">
              <Link href="/nosotros" className="link-line">
                Conocé quiénes somos
                <ArrowRight />
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end lg:pl-10">
          <dl className="mt-2 grid grid-cols-2 border-t border-white/12 lg:mt-14">
            <div className="py-5 pr-4">
              <dd className="tabular text-5xl font-light text-white">
                <CountUp value={stats.units} />
              </dd>
              <dt className="eyebrow mt-2 text-[#B8B8B8]">Unidades en stock</dt>
            </div>
            <div className="border-l border-white/12 py-5 pl-5">
              <dd className="tabular text-5xl font-light text-white">
                <CountUp value={stats.brands} pad={2} />
              </dd>
              <dt className="eyebrow mt-2 text-[#B8B8B8]">Marcas disponibles</dt>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
