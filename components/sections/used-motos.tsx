import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MotoPhoto } from '@/components/moto/moto-photo'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { motoKmLabel, motoPriceLabel, motoYearLabel } from '@/lib/moto-format'
import { motoPath, usedMotos } from '@/lib/motos'

/** Usadas: fila tipo legajo, distinta de las tarjetas de 0 km. Muestra solo lo informado. */
export function UsedMotos() {
  const used = usedMotos()
  if (used.length === 0) return null

  return (
    <section className="section bg-[#F3F5F8]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Usadas" lines={['Con kilómetros,', 'con historia']}>
            Año, kilometraje y estado tal como los informamos. Consultá para verlas en persona antes de decidir.
          </SectionHeading>
          <Link href="/motos?condicion=usada" className="link-line">
            Ver todas las usadas
            <ArrowRight />
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 lg:mt-14">
          {used.slice(0, 6).map((moto, index) => (
            <li key={moto.id}>
              <Reveal delay={index * 0.07} y={16}>
                <article className="group relative grid items-center gap-4 rounded-xl bg-white p-3 transition-shadow duration-500 hover:shadow-[0_18px_40px_-26px_rgb(11_67_168/0.6)] sm:grid-cols-[13rem_1fr] md:grid-cols-[15rem_1fr_auto] md:gap-8">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <MotoPhoto moto={moto} sizes="(max-width: 640px) 100vw, 15rem" />
                  </div>
                  <div className="px-2 sm:px-0">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      <Link href={motoPath(moto)} className="after:absolute after:inset-0 after:content-['']">
                        {moto.name}
                      </Link>
                    </h3>
                    <dl className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
                      {[
                        ['Año', motoYearLabel(moto)],
                        ['Kilometraje', motoKmLabel(moto)],
                        ...(moto.stateNote ? [['Estado informado', moto.stateNote]] : []),
                        ['Disponibilidad', moto.status],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs text-[#5A6270]">{label}</dt>
                          <dd className="tabular text-sm font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-2 pb-2 sm:col-span-2 sm:pb-0 md:col-span-1 md:block md:pr-5 md:text-right">
                    <p className="tabular text-2xl font-bold tracking-tight">{motoPriceLabel(moto)}</p>
                    <span className="link-line">
                      Ver ficha
                      <ArrowRight />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
