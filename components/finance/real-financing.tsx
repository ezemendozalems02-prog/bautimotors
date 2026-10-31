'use client'

import { useState } from 'react'
import { Check, MessageCircle, X } from 'lucide-react'
import { calculateScenario } from '@/lib/financing'
import { plansForMoto, type FinancingPlan } from '@/lib/financing-plans'
import { motos } from '@/lib/motos'
import { formatMoney } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'


const formatDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('es-AR')

/** Modo B: solo recibe planes publicables. Los valores vienen de lib/financing-plans.ts. */
export function RealFinancing({ plans }: { plans: FinancingPlan[] }) {
  const priced = motos.filter((moto) => moto.price !== null)
  const [slug, setSlug] = useState(priced[0]?.slug ?? '')
  const moto = priced.find((item) => item.slug === slug)
  const applicable = plansForMoto(plans, slug)

  return (
    <div className="mt-6">
      <div className="field max-w-md">
        <label htmlFor="real-moto">Moto</label>
        <select id="real-moto" value={slug} onChange={(event) => setSlug(event.target.value)}>
          {priced.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {applicable.length === 0 && <p className="mt-6 rounded-lg bg-[#F3F5F8] p-5 text-[#5A6270]">Esta moto no tiene planes confirmados por ahora. Consultanos por otras alternativas.</p>}

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {moto &&
          applicable.map((plan) => <PlanCard key={plan.id} plan={plan} price={moto.price as number} currency={moto.currency} motoName={moto.name} />)}
      </div>
    </div>
  )
}

function PlanCard({ plan, price, currency, motoName }: { plan: FinancingPlan; price: number; currency: 'USD' | 'ARS'; motoName: string }) {
  const [installments, setInstallments] = useState(plan.installments[0])
  const downPayment = Math.round((price * plan.minDownPaymentPercent) / 100)
  const result = calculateScenario({ price, downPayment, installments, annualRatePercent: plan.annualRatePercent, fees: 0 })

  const rows = [
    ['Entidad', plan.entity],
    ['Tasa', `${plan.annualRatePercent}% TNA`],
    ['Tipo de tasa', plan.rateType],
    ...(plan.cftPercent !== undefined ? [['CFT', `${plan.cftPercent}%`]] : []),
    ['Plazo', `${plan.installments.join(', ')} cuotas`],
    ['Anticipo mínimo', `${plan.minDownPaymentPercent}%`],
    ['Gastos', plan.fees],
    ['Vigencia', `Hasta el ${formatDate(plan.validUntil)}`],
    ['Solicitud', plan.applicationChannel],
  ]

  return (
    <article className="flex flex-col rounded-xl border border-[#DCE1E8] bg-white p-5">
      <h3 className="font-display text-xl font-bold">{plan.name}</h3>
      {result && (
        <p className="tabular mt-3 text-3xl font-bold tracking-tight">
          {formatMoney(result.installment, currency)}
          <span className="ml-1 text-sm font-medium text-[#5A6270]">x {installments}</span>
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {plan.installments.map((option) => (
          <button key={option} type="button" aria-pressed={installments === option} onClick={() => setInstallments(option)} className="chip">
            {option}
          </button>
        ))}
      </div>

      <dl className="mt-4 grid gap-2 border-t border-[#E2E6EC] pt-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-[#5A6270]">{label}</dt>
            <dd className="text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid gap-1.5 text-sm">
        {plan.includes.map((item) => (
          <p key={item} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
          </p>
        ))}
        {plan.excludes.map((item) => (
          <p key={item} className="flex gap-2 text-[#5A6270]">
            <X className="mt-0.5 h-4 w-4 shrink-0" /> No incluye: {item}
          </p>
        ))}
      </div>

      <div className="mt-4 text-sm">
        <p className="font-semibold">Requisitos</p>
        <ul className="mt-1 list-disc pl-4 text-[#5A6270]">
          {plan.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className="notice mt-4">{plan.conditions}</p>

      <a href={whatsappUrl(messages.plan(plan.name, plan.entity, motoName, installments))} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
        <MessageCircle />
        Consultar este plan
      </a>
    </article>
  )
}
