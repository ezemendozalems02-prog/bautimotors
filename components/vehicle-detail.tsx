'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Phone,
  Share2,
  Shield,
  Users,
} from 'lucide-react'
import { DrawLine, ease, Reveal } from '@/components/motion/primitives'
import { VehicleCard } from '@/components/vehicle-card'
import { VehiclePhoto } from '@/components/vehicle-photo'
import { formatKm, formatPrice, whatsappUrl } from '@/lib/site'
import { getVehicleStatus, vehicles, type Vehicle } from '@/lib/vehicles'
import { cn } from '@/lib/utils'

interface VehicleDetailProps {
  vehicle: Vehicle
}

const specs: { key: keyof Vehicle; label: string; format?: (value: number) => string }[] = [
  { key: 'brand', label: 'Marca' },
  { key: 'model', label: 'Modelo' },
  { key: 'version', label: 'Versión' },
  { key: 'year', label: 'Año' },
  { key: 'km', label: 'Kilometraje', format: formatKm },
  { key: 'type', label: 'Tipo' },
  { key: 'transmission', label: 'Transmisión' },
  { key: 'fuel', label: 'Combustible' },
  { key: 'engine', label: 'Motor' },
  { key: 'traction', label: 'Tracción' },
  { key: 'color', label: 'Color' },
  { key: 'condition', label: 'Estado' },
]

const assurances = [
  { icon: Shield, title: 'Asesoramiento personalizado', text: 'Te guiamos en todo el proceso' },
  { icon: MessageCircle, title: 'Consulta directa por WhatsApp', text: 'Hablás con un asesor' },
  { icon: Users, title: 'Coordiná una visita', text: 'Vení a conocer la unidad' },
]

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  const imageCount = vehicle.images.length || 1
  const status = getVehicleStatus(vehicle)
  const whatsappHref = whatsappUrl(
    `Hola, vengo desde la web de Ghanima Motors y quiero consultar por el ${vehicle.name} (${vehicle.year}).`,
  )

  const related = vehicles
    .filter((item) => item.id !== vehicle.id)
    .sort((a, b) => Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price))
    .filter((item) => item.type === vehicle.type || item.brand === vehicle.brand)
    .slice(0, 3)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicle.name} | Ghanima Motors`,
          text: vehicle.description,
          url: window.location.href,
        })
      } catch {
        // La persona canceló el diálogo de compartir.
      }
      return
    }

    await navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const iconButton =
    'flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors duration-300 hover:border-white'

  return (
    <>
      <section className="bg-[#090909] pt-24 lg:pt-32">
        <div className="shell">
          <Link
            href="/catalogo"
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-[#B8B8B8] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 text-primary transition-transform duration-500 group-hover:-translate-x-1" />
            Volver al catálogo
          </Link>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-12">
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease }}
                className="relative -mx-5 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-[3px] lg:aspect-[16/10]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <VehiclePhoto vehicle={vehicle} index={currentImage} sizes="(max-width: 1024px) 100vw, 66vw" priority />
                  </motion.div>
                </AnimatePresence>

                {vehicle.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setCurrentImage((currentImage - 1 + imageCount) % imageCount)}
                      className="absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-[#090909]/75 text-white transition-colors hover:bg-primary hover:text-[#090909]"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentImage((currentImage + 1) % imageCount)}
                      className="absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-[#090909]/75 text-white transition-colors hover:bg-primary hover:text-[#090909]"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="tabular absolute right-3 bottom-3 bg-[#090909]/75 px-2.5 py-1 text-xs text-white">
                      {currentImage + 1} / {imageCount}
                    </span>
                  </>
                )}
              </motion.div>

              {vehicle.images.length > 1 && (
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setCurrentImage(index)}
                      aria-label={`Ver imagen ${index + 1}`}
                      aria-current={currentImage === index}
                      className={cn(
                        'relative h-16 w-24 shrink-0 overflow-hidden transition-opacity',
                        currentImage === index ? 'outline-2 outline-primary' : 'opacity-55 hover:opacity-100',
                      )}
                    >
                      <VehiclePhoto vehicle={vehicle} index={index} sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Panel de compra */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-wrap items-center gap-1.5">
                {vehicle.featured && (
                  <span className="eyebrow bg-primary px-2 py-1 !text-[0.625rem] !tracking-[0.12em] font-semibold text-[#090909]">Destacado</span>
                )}
                {vehicle.newArrival && (
                  <span className="eyebrow border border-primary/50 px-2 py-1 !text-[0.625rem] !tracking-[0.12em] text-primary">Nuevo ingreso</span>
                )}
                <span className="eyebrow border border-white/15 px-2 py-1 !text-[0.625rem] !tracking-[0.12em] text-[#B8B8B8]">{vehicle.type}</span>
                <span className="eyebrow border border-white/15 px-2 py-1 !text-[0.625rem] !tracking-[0.12em] text-[#B8B8B8]">{status}</span>
              </div>

              <p className="eyebrow mt-5 text-primary">{vehicle.brand}</p>
              <h1 className="display mt-2 text-[1.75rem] !leading-[1.08] !normal-case text-white lg:text-[2rem]">{vehicle.name}</h1>

              <p className="tabular mt-3 text-sm text-[#B8B8B8]">
                {vehicle.year} <span className="px-1.5 text-primary">/</span> {formatKm(vehicle.km)}{' '}
                <span className="px-1.5 text-primary">/</span> {vehicle.transmission}
              </p>

              <DrawLine className="mt-6" />

              <p className="eyebrow mt-6 text-[#B8B8B8]">Precio</p>
              <p className="tabular mt-1 text-4xl font-light tracking-tight text-white">{formatPrice(vehicle.price)}</p>

              <div className="mt-6 hidden gap-2 lg:grid">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle />
                  Consultar por WhatsApp
                </a>
                <Link href="/contacto" className="btn btn-ghost">
                  <Phone />
                  Llamar ahora
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  aria-pressed={isLiked}
                  aria-label="Guardar vehículo"
                  className={cn(iconButton, isLiked && 'border-primary text-primary')}
                >
                  <Heart className={cn('h-5 w-5 transition-transform duration-300', isLiked && 'scale-110 fill-current')} />
                </button>
                <button type="button" onClick={handleShare} aria-label="Compartir vehículo" className={iconButton}>
                  <Share2 className="h-5 w-5" />
                </button>
                <span aria-live="polite" className="eyebrow pl-2 text-primary">
                  {copied ? 'Enlace copiado' : ''}
                </span>
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {assurances.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <item.icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-white">
                      {item.title}
                      <span className="block text-xs text-[#B8B8B8]">{item.text}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display display-md text-white">Descripción</h2>
            <p className="mt-5 text-base leading-relaxed text-[#B8B8B8] md:text-lg">{vehicle.description}</p>

            {vehicle.features.length > 0 && (
              <>
                <h3 className="eyebrow mt-10 text-white/60">Características destacadas</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[0.95rem] text-white">
                      <CheckCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h2 className="display display-md text-white">Especificaciones</h2>
            <dl className="mt-5 grid border-t border-white/10 sm:grid-cols-2 sm:gap-x-8">
              {specs.map((spec) => {
                const value = vehicle[spec.key]
                if (!value) return null
                return (
                  <div key={spec.key} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5">
                    <dt className="text-sm text-[#B8B8B8]">{spec.label}</dt>
                    <dd className="tabular text-right text-sm text-white">
                      {spec.format ? spec.format(value as number) : String(value)}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/8 bg-[#0c0c0c] py-16 lg:py-24">
          <div className="shell">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="display display-md text-white">También podría interesarte</h2>
              <Link href="/catalogo" className="link-line hidden shrink-0 sm:inline-flex">
                Ver más vehículos
                <ArrowRight />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {related.map((item) => (
                <VehicleCard key={item.id} vehicle={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Barra de acción fija en móvil */}
      <div className="glass-nav safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-white/10 lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-2.5">
          <p className="tabular min-w-0 truncate text-lg text-white">{formatPrice(vehicle.price)}</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-12 !px-5">
            <MessageCircle />
            Consultar
          </a>
        </div>
      </div>
    </>
  )
}
