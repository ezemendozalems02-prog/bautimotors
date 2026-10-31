'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Banknote, CalendarDays, CircleDollarSign, FileQuestion, MessageCircle, Repeat } from 'lucide-react'
import { MotoPhoto } from '@/components/moto/moto-photo'
import { ease } from '@/components/motion/primitives'
import { motoFinancedLabel, motoPriceLabel } from '@/lib/moto-format'
import { availableMotos, getMotoBySlug } from '@/lib/motos'
import { financingDisclaimer } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'

const preferences = [
  { label: 'Quiero consultar financiación', icon: FileQuestion },
  { label: 'Quiero saber cuánto necesito para empezar', icon: CircleDollarSign },
  { label: 'Quiero conocer alternativas de cuotas', icon: CalendarDays },
  { label: 'Quiero pagar de contado', icon: Banknote },
  { label: 'Quiero consultar si puedo entregar mi moto usada', icon: Repeat },
]

const stepTitles = ['Elegí tu moto', 'Contanos cómo querés comprar', 'Tus datos de contacto', 'Revisá tu consulta']
const UNDECIDED = 'Todavía no decidí'

/** Solo admite formatos de teléfono: entre 8 y 15 dígitos. */
export const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return /^[\d\s()+-]+$/.test(phone) && digits.length >= 8 && digits.length <= 15
}

export function PurchaseFlow() {
  const [step, setStep] = useState(0)
  const [motoSlug, setMotoSlug] = useState<string | null>(null)
  const [preference, setPreference] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const top = useRef<HTMLDivElement>(null)
  const interacted = useRef(false)

  const [conditionFilter, setConditionFilter] = useState<'Todas' | '0 km' | 'Usada'>('Todas')
  const motos = availableMotos().filter((item) => conditionFilter === 'Todas' || item.condition === conditionFilter)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('moto')
    if (fromUrl && getMotoBySlug(fromUrl)) {
      setMotoSlug(fromUrl)
      setStep(1)
    }
  }, [])

  const goTo = (next: number) => {
    interacted.current = true
    setStep(next)
    setShowErrors(false)
  }

  // Lleva el foco al paso nuevo sin robarlo al cargar la página.
  useEffect(() => {
    if (interacted.current) top.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [step])

  const moto = motoSlug ? getMotoBySlug(motoSlug) : undefined
  const motoName = moto?.name ?? UNDECIDED
  const nameError = name.trim().length < 2 ? 'Ingresá tu nombre.' : null
  const phoneError = !isValidPhone(phone) ? 'Ingresá un teléfono válido, con característica.' : null
  const consentError = !consent ? 'Necesitamos tu autorización para continuar.' : null

  const submitContact = (event: React.FormEvent) => {
    event.preventDefault()
    if (nameError || phoneError || consentError) {
      setShowErrors(true)
      return
    }
    goTo(3)
  }

  const whatsappHref = whatsappUrl(
    messages.purchaseFlow({ name: name.trim(), phone: phone.trim(), motoName, preference: preference ?? '', comment: comment.trim() }),
  )

  return (
    <div ref={top} className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#E2E6EC] bg-white shadow-[0_30px_70px_-45px_rgb(11_67_168/0.5)]">
      <div className="border-b border-[#E2E6EC] p-4 md:px-7 md:py-5">
        <ol className="grid grid-cols-4 gap-1.5" aria-label="Pasos de la consulta">
          {stepTitles.map((title, index) => (
            <li key={title} aria-current={index === step ? 'step' : undefined}>
              <span className="relative block h-1 overflow-hidden rounded-full bg-[#E2E6EC]">
                <motion.span className="absolute inset-0 origin-left bg-primary" initial={false} animate={{ scaleX: index <= step ? 1 : 0 }} transition={{ duration: 0.5, ease }} />
              </span>
            </li>
          ))}
        </ol>
        <p className="eyebrow mt-3 text-primary">Paso {step + 1} de 4</p>
        <h3 className="font-display mt-1 text-xl font-bold tracking-tight md:text-2xl">{stepTitles[step]}</h3>
      </div>

      <div className="p-4 md:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.3, ease }}>
            {step === 0 && (
              <div>
                <div className="mb-3 flex gap-1.5">
                  {(['Todas', '0 km', 'Usada'] as const).map((option) => (
                    <button key={option} type="button" aria-pressed={conditionFilter === option} onClick={() => setConditionFilter(option)} className="chip">
                      {option === 'Usada' ? 'Usadas' : option}
                    </button>
                  ))}
                </div>
                <div className="grid max-h-[26rem] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
                  {motos.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={motoSlug === item.slug}
                    onClick={() => {
                      setMotoSlug(item.slug)
                      goTo(1)
                    }}
                    className="choice !p-2"
                  >
                    <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-md">
                      <MotoPhoto moto={item} sizes="80px" plain />
                    </span>
                    <span className="block min-w-0">
                      <span className="block leading-tight font-bold">{item.name}</span>
                      <span className="tabular mt-0.5 block text-sm font-medium text-[#5A6270]">
                        {motoPriceLabel(item)} · {item.cc} cc
                      </span>
                    </span>
                  </button>
                  ))}
                <button
                  type="button"
                  aria-pressed={motoSlug === null && step > 0}
                  onClick={() => {
                    setMotoSlug(null)
                    goTo(1)
                  }}
                  className="choice justify-center text-center"
                >
                  Todavía no decidí, quiero que me asesoren
                </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid max-w-2xl gap-2.5">
                {preferences.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={preference === item.label}
                    onClick={() => {
                      setPreference(item.label)
                      goTo(2)
                    }}
                    className="choice"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <form id="flow-contact" onSubmit={submitContact} noValidate className="grid max-w-2xl gap-5 sm:grid-cols-2">
                <div className="field">
                  <label htmlFor="flow-name">Nombre</label>
                  <input id="flow-name" autoComplete="given-name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={(showErrors && !!nameError) || undefined} />
                  {showErrors && nameError && <p className="field-error">{nameError}</p>}
                </div>
                <div className="field">
                  <label htmlFor="flow-phone">Teléfono de contacto</label>
                  <input id="flow-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="11 2345-6789" value={phone} onChange={(event) => setPhone(event.target.value)} aria-invalid={(showErrors && !!phoneError) || undefined} />
                  {showErrors && phoneError && <p className="field-error">{phoneError}</p>}
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="flow-model">Modelo de interés</label>
                  <input id="flow-model" value={motoName} readOnly className="bg-[#F3F5F8]" />
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="flow-comment">Comentario (opcional)</label>
                  <textarea id="flow-comment" rows={3} maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)} />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-[#20242B]">
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#1769E8]" />
                    <span>
                      Autorizo a Tu Moto Ya a usar estos datos para responder mi consulta comercial.{' '}
                      <Link href="/privacidad" className="font-semibold text-primary underline underline-offset-2">
                        Ver privacidad
                      </Link>
                    </span>
                  </label>
                  {showErrors && consentError && <p className="field-error">{consentError}</p>}
                  <p className="notice mt-4">No te pedimos el número de DNI, fotos de documentos ni datos bancarios. Si hace falta documentación, te indicamos el canal seguro y autorizado para presentarla.</p>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
                <dl className="grid content-start border-t border-[#E2E6EC]">
                  {[
                    ['Nombre', name.trim()],
                    ['Teléfono', phone.trim()],
                    ['Moto', motoName],
                    ...(moto ? [[moto.financedPrice === null ? 'Precio informado' : 'Precio de contado', motoPriceLabel(moto)]] : []),
                    ...(moto && motoFinancedLabel(moto) ? [['Precio financiado', motoFinancedLabel(moto) as string]] : []),
                    ['Cómo querés comprar', preference ?? ''],
                    ...(comment.trim() ? [['Comentario', comment.trim()]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 border-b border-[#E2E6EC] py-3">
                      <dt className="text-sm text-[#5A6270]">{label}</dt>
                      <dd className="text-right text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="rounded-xl bg-[#EAF2FF] p-5">
                  <p className="font-display text-lg font-bold text-[#0B43A8]">Tu consulta está lista para enviar</p>
                  <p className="mt-2 text-sm text-[#20242B]">Se abre WhatsApp con este resumen. Lo revisás y lo mandás vos. Todavía no enviamos nada ni guardamos tus datos.</p>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full !px-3">
                    <MessageCircle />
                    Continuar por WhatsApp
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-[#5A6270]">{financingDisclaimer}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="btn btn-outline !min-h-12">
              <ArrowLeft />
              Volver
            </button>
          ) : (
            <span />
          )}
          {step === 2 && (
            <button type="submit" form="flow-contact" className="btn btn-primary !min-h-12">
              Ver resumen
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
