import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { MotoPhoto } from '@/components/moto/moto-photo'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { motoPriceLabel } from '@/lib/moto-format'
import { featuredMotos, motoPath } from '@/lib/motos'
import { messages, whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

/** Bloque editorial: una composición grande y las demás más chicas, alternadas. */
export function Featured() {
  const featured = featuredMotos()
  if (featured.length === 0) return null

  return (
    <section className="section bg-[#080A0E] text-white">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading tone="dark" label="Destacadas" lines={['Motos que', 'hacen ruido']} />
          <Link href="/motos" className="btn btn-ghost">
            Ver todas las motos
            <ArrowRight />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {featured.map((moto, index) => {
            const large = index % 3 === 0
            return (
              <Reveal key={moto.id} delay={index * 0.08} className={cn(large ? 'lg:col-span-7' : 'lg:col-span-5')}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#11161F]">
                  <div className={cn('relative overflow-hidden', large ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
                    <MotoPhoto moto={moto} sizes="(max-width: 1024px) 100vw, 55vw" imageClassName="transition-[transform,opacity] duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="eyebrow text-[#3985FF]">
                          {moto.brand} · {moto.cc} cc
                        </p>
                        <h3 className="font-display mt-1.5 text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                          <Link href={motoPath(moto)}>{moto.name}</Link>
                        </h3>
                      </div>
                      <p className="tabular shrink-0 text-xl font-bold">{motoPriceLabel(moto)}</p>
                    </div>
                    <p className="mt-3 max-w-xl flex-1 text-sm leading-relaxed text-white/70">{moto.description}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                      <Link href={motoPath(moto)} className="link-line !text-[#7FB0FF]">
                        Ver moto
                        <ArrowRight />
                      </Link>
                      <a href={whatsappUrl(messages.product(moto.name, motoPath(moto)))} target="_blank" rel="noopener noreferrer" className="link-line !text-white">
                        <MessageCircle />
                        Consultar
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
