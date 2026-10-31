'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, MessageCircle, Share2 } from 'lucide-react'
import { MotoCard } from '@/components/moto/moto-card'
import { MotoPhoto } from '@/components/moto/moto-photo'
import { DrawLine, ease, Reveal } from '@/components/motion/primitives'
import { motoFinancedLabel, motoKmLabel, motoPriceLabel, motoYearLabel } from '@/lib/moto-format'
import { categories, motoPath, relatedMotos, type Moto } from '@/lib/motos'
import { financingDisclaimer } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export function MotoDetail({ moto }: { moto: Moto }) {
  const [current, setCurrent] = useState(0)
  const [copied, setCopied] = useState(false)

  const path = motoPath(moto)
  const imageCount = moto.images.length || 1
  const productHref = whatsappUrl(messages.product(moto.name, path))
  const financeHref = `/financiacion?moto=${moto.slug}#simulador`
  const related = relatedMotos(moto)

  const specs = [
    { label: 'Marca', value: moto.brand },
    { label: 'Modelo', value: moto.model },
    ...(moto.version ? [{ label: 'Versión', value: moto.version }] : []),
    { label: 'Cilindrada', value: `${moto.cc} cc` },
    { label: 'Motor', value: moto.engine },
    ...(moto.transmission ? [{ label: 'Transmisión', value: moto.transmission }] : []),
    { label: 'Año', value: motoYearLabel(moto) },
    { label: 'Condición', value: moto.condition },
    ...(moto.condition === 'Usada' ? [{ label: 'Kilometraje', value: motoKmLabel(moto) }] : []),
    ...(moto.stateNote ? [{ label: 'Estado informado', value: moto.stateNote }] : []),
    { label: 'Categoría', value: categories[moto.category].name },
    { label: 'Disponibilidad', value: moto.status },
    { label: 'Colores', value: moto.colors.length > 0 ? moto.colors.join(', ') : 'Consultar' },
  ]

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: `${moto.name} | Tu Moto Ya`, url })
      } catch {
        // La persona canceló el diálogo de compartir.
      }
      return
    }
    await navigator.clipboard?.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section className="bg-[#080A0E] pt-20 pb-10 text-white lg:pt-28 lg:pb-16">
        <div className="shell">
          <Link href="/motos" className="group inline-flex min-h-11 items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4 text-[#3985FF] transition-transform duration-500 group-hover:-translate-x-1" />
            Volver a las motos
          </Link>

          <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_25rem] lg:gap-12">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease }}
                className="relative -mx-4 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-xl lg:aspect-[16/11]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={current} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <MotoPhoto moto={moto} index={current} sizes="(max-width: 1024px) 100vw, 66vw" priority />
                  </motion.div>
                </AnimatePresence>

                {moto.images.length > 1 && (
                  <>
                    <button type="button" onClick={() => setCurrent((current - 1 + imageCount) % imageCount)} aria-label="Imagen anterior" className="absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#080A0E]/70 text-white transition-colors hover:bg-primary">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => setCurrent((current + 1) % imageCount)} aria-label="Siguiente imagen" className="absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#080A0E]/70 text-white transition-colors hover:bg-primary">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="tabular absolute right-3 bottom-3 rounded bg-[#080A0E]/70 px-2.5 py-1 text-xs text-white">
                      {current + 1} / {imageCount}
                    </span>
                  </>
                )}
              </motion.div>

              {moto.images.length > 1 && (
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                  {moto.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setCurrent(index)}
                      aria-label={`Ver imagen ${index + 1}`}
                      aria-current={current === index}
                      className={cn('relative h-16 w-24 shrink-0 overflow-hidden rounded-md transition-opacity', current === index ? 'outline-2 outline-[#3985FF]' : 'opacity-55 hover:opacity-100')}
                    >
                      <MotoPhoto moto={moto} index={index} sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-wrap gap-1.5">
                <span className="eyebrow rounded bg-[#1769E8] px-2 py-1 !text-[0.62rem]">{moto.condition}</span>
                <span className="eyebrow rounded border border-white/20 px-2 py-1 !text-[0.62rem] text-white/80">{categories[moto.category].name}</span>
                <span className="eyebrow rounded border border-white/20 px-2 py-1 !text-[0.62rem] text-white/80">{moto.status}</span>
              </div>

              <p className="eyebrow mt-5 text-[#3985FF]">{moto.brand}</p>
              <h1 className="font-display mt-2 text-[2rem] leading-[1.08] font-extrabold tracking-tight">{moto.name}</h1>

              <p className="tabular mt-3 text-sm text-white/70">
                {moto.cc} cc
                {moto.year !== null && (
                  <>
                    <span className="px-1.5 text-[#3985FF]">/</span> {moto.year}
                  </>
                )}
                {moto.condition === 'Usada' && moto.km !== null && (
                  <>
                    <span className="px-1.5 text-[#3985FF]">/</span> {motoKmLabel(moto)}
                  </>
                )}
              </p>

              <DrawLine className="mt-6 bg-[#3985FF]" />

              <p className="eyebrow mt-6 text-white/60">{moto.financedPrice === null ? 'Precio' : 'Precio de contado'}</p>
              <p className="tabular mt-1 text-[2.6rem] leading-none font-bold tracking-tight">{motoPriceLabel(moto)}</p>
              {motoFinancedLabel(moto) && (
                <>
                  <p className="eyebrow mt-5 text-white/60">Precio financiado</p>
                  <p className="tabular mt-1 text-2xl font-bold tracking-tight text-[#7FB0FF]">{motoFinancedLabel(moto)}</p>
                  <p className="mt-1 text-xs text-white/60">Consultá cuotas, requisitos y condiciones.</p>
                </>
              )}

              <div className="mt-6 hidden gap-2 lg:grid">
                <Link href={financeHref} className="btn btn-primary">
                  Consultar financiación
                  <ArrowRight />
                </Link>
                <a href={productHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <MessageCircle />
                  Consultar por WhatsApp
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button type="button" onClick={handleShare} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
                  <Share2 className="h-4 w-4 text-[#3985FF]" />
                  Compartir
                </button>
                <span aria-live="polite" className="text-xs text-[#3985FF]">
                  {copied ? 'Enlace copiado' : ''}
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display display-md">Sobre esta moto</h2>
            <p className="mt-5 text-base leading-relaxed text-[#5A6270] md:text-lg">{moto.description}</p>

            {moto.features.length > 0 && (
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {moto.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-[0.95rem] font-medium">
                    <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h2 className="display display-md">Especificaciones</h2>
            <dl className="mt-5 grid border-t border-[#E2E6EC] sm:grid-cols-2 sm:gap-x-8">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between gap-4 border-b border-[#E2E6EC] py-3">
                  <dt className="text-sm text-[#5A6270]">{spec.label}</dt>
                  <dd className="tabular text-right text-sm font-semibold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B43A8] py-14 text-white lg:py-20">
        <div aria-hidden="true" className="blueprint absolute inset-0" />
        <div className="shell relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display display-lg">¿Te gusta esta moto?</h2>
            <p className="mt-4 max-w-xl text-lg text-white/85">Consultá las alternativas de financiación disponibles para este modelo.</p>
            <p className="mt-3 max-w-xl text-xs text-white/70">{financingDisclaimer}</p>
          </div>
          <div className="grid shrink-0 gap-2 sm:grid-flow-col">
            <Link href={financeHref} className="btn btn-white">
              Consultar financiación
              <ArrowRight />
            </Link>
            <a href={productHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <MessageCircle />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-[#F3F5F8] pb-28 lg:pb-32">
          <div className="shell">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="display display-md">También te puede interesar</h2>
              <Link href="/motos" className="link-line hidden shrink-0 sm:inline-flex">
                Ver todas
                <ArrowRight />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((item) => (
                <MotoCard key={item.id} moto={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Barra de acción fija en móvil */}
      <div className="glass-light safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-[#E2E6EC] lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5">
          <p className="tabular min-w-0 truncate text-lg font-bold">{motoPriceLabel(moto)}</p>
          <Link href={financeHref} className="btn btn-primary !min-h-12 !px-4 !text-[0.72rem]">
            Consultar financiación
          </Link>
        </div>
      </div>
    </>
  )
}
