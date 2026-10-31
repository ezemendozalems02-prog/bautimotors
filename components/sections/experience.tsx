import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { site } from '@/lib/site'
import { deliveries } from '@/lib/testimonials'
import { cn } from '@/lib/utils'

/** Muestra solo entregas reales. Sin datos cargados, no simula una galería. */
export function Experience() {
  return (
    <section className="section bg-[#080A0E] text-white">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading tone="dark" label="Entregas" lines={['El próximo en', 'estrenar moto', 'podés ser vos.']}>
            {deliveries.length === 0 && `Seguí a ${site.instagram.handle} para ver las novedades de la agencia.`}
          </SectionHeading>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Instagram />
            {site.instagram.handle}
          </a>
        </div>

        {deliveries.length > 0 && (
          <div className="mt-10 grid auto-rows-[14rem] grid-cols-2 gap-3 md:grid-cols-4 lg:mt-14">
            {deliveries.map((delivery, index) => (
              <Reveal key={delivery.id} delay={index * 0.06} className={cn(delivery.orientation === 'vertical' ? 'row-span-2' : 'col-span-2')}>
                <figure className="relative h-full overflow-hidden rounded-xl">
                  <Image src={delivery.image} alt={`Entrega de ${delivery.moto} a ${delivery.customer}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-sm">
                    {delivery.quote && <p className="mb-1">“{delivery.quote}”</p>}
                    <p className="font-semibold">
                      {delivery.customer} · {delivery.moto}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
