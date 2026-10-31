'use client'

import { useEffect, useMemo, useState } from 'react'
import { Lock, MessageCircle } from 'lucide-react'
import { RealFinancing } from '@/components/finance/real-financing'
import { AnimatedNumber } from '@/components/motion/primitives'
import { Slider } from '@/components/ui/slider'
import { calculateScenario, MAX_ANNUAL_RATE, validateScenario, type ScenarioIssue } from '@/lib/financing'
import { financingPlans, publishablePlans } from '@/lib/financing-plans'
import { getMotoBySlug, motos } from '@/lib/motos'
import { formatMoney, type Currency } from '@/lib/site'
import { messages, whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

/** Opciones para explorar: son hipotéticas y no representan planes ofrecidos. */
const INSTALLMENT_OPTIONS = [6, 12, 18, 24, 36, 48]
const EXAMPLE_RATE = 50

const issueText: Record<ScenarioIssue, string> = {
  price: 'Ingresá un precio mayor a cero.',
  downPayment: 'El anticipo tiene que ser menor al precio.',
  installments: 'Elegí la cantidad de cuotas.',
  rate: `Ingresá una tasa entre 0 y ${MAX_ANNUAL_RATE}%.`,
  fees: 'Los gastos no pueden ser negativos.',
}

const toNumber = (text: string) => (text.trim() === '' ? Number.NaN : Number(text))

function NumberField({ id, label, value, onChange, suffix, error }: { id: string; label: string; value: string; onChange: (value: string) => void; suffix?: string; error?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className="tabular" />
        {suffix && <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-[#5A6270]">{suffix}</span>}
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function Calculator() {
  const plans = useMemo(() => publishablePlans(financingPlans), [])
  const hasRealPlans = plans.length > 0

  const firstPriced = motos.find((moto) => moto.price !== null)
  const [mode, setMode] = useState<'simulation' | 'real'>('simulation')
  const [slug, setSlug] = useState(firstPriced?.slug ?? '')
  const [price, setPrice] = useState(String(firstPriced?.price ?? ''))
  const [currency, setCurrency] = useState<Currency>(firstPriced?.currency ?? 'USD')
  const [downPayment, setDownPayment] = useState(String(Math.round((firstPriced?.price ?? 0) * 0.3)))
  const [installments, setInstallments] = useState(12)
  const [rate, setRate] = useState(String(EXAMPLE_RATE))
  const [fees, setFees] = useState('0')

  const selectMoto = (nextSlug: string) => {
    setSlug(nextSlug)
    const moto = getMotoBySlug(nextSlug)
    if (!moto) return
    setCurrency(moto.currency)
    setPrice(moto.price === null ? '' : String(moto.price))
    setDownPayment(moto.price === null ? '0' : String(Math.round(moto.price * 0.3)))
  }

  // Se llega con ?moto= desde una ficha. Se lee después de hidratar.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('moto')
    if (fromUrl && getMotoBySlug(fromUrl)) selectMoto(fromUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const input = {
    price: toNumber(price),
    downPayment: toNumber(downPayment),
    installments,
    annualRatePercent: toNumber(rate),
    fees: toNumber(fees),
  }

  const issues = validateScenario(input)
  const result = calculateScenario(input)
  const validPrice = !issues.includes('price')
  const motoName = getMotoBySlug(slug)?.name ?? 'a definir'
  const money = (value: number) => formatMoney(value, currency)

  const segments = result
    ? [
        { label: 'Anticipo', value: input.downPayment, color: '#0B43A8' },
        { label: 'Capital financiado', value: result.financed, color: '#3985FF' },
        { label: 'Intereses', value: result.interest, color: '#79818F' },
        { label: 'Gastos', value: input.fees, color: '#20242B' },
      ]
    : []

  return (
    <div>
      <div role="tablist" aria-label="Modo de la calculadora" className="grid gap-2 sm:grid-cols-2">
        <button type="button" role="tab" aria-selected={mode === 'simulation'} onClick={() => setMode('simulation')} className={cn('rounded-lg border p-4 text-left transition-colors', mode === 'simulation' ? 'border-primary bg-[#EAF2FF]' : 'border-[#DCE1E8] bg-white hover:border-[#3985FF]')}>
          <span className="eyebrow text-primary">Modo A</span>
          <span className="font-display mt-1 block font-bold">Simulación orientativa</span>
          <span className="mt-0.5 block text-sm text-[#5A6270]">Probá escenarios hipotéticos.</span>
        </button>
        <button type="button" role="tab" aria-selected={mode === 'real'} disabled={!hasRealPlans} onClick={() => setMode('real')} className={cn('rounded-lg border p-4 text-left transition-colors', mode === 'real' ? 'border-primary bg-[#EAF2FF]' : 'border-[#DCE1E8] bg-white', hasRealPlans ? 'hover:border-[#3985FF]' : 'cursor-not-allowed bg-[#F3F5F8]')}>
          <span className="eyebrow flex items-center gap-1.5 text-[#5A6270]">
            {!hasRealPlans && <Lock className="h-3 w-3" />}
            Modo B
          </span>
          <span className="font-display mt-1 block font-bold">Financiación real</span>
          <span className="mt-0.5 block text-sm text-[#5A6270]">{hasRealPlans ? 'Planes confirmados y vigentes.' : 'Se habilita con planes confirmados.'}</span>
        </button>
      </div>

      {mode === 'real' && hasRealPlans ? (
        <RealFinancing plans={plans} />
      ) : (
        <>
          <p className="mt-4 rounded-lg bg-[#EAF2FF] px-4 py-3 text-sm font-medium text-[#0B43A8]">
            Simulación matemática con valores ilustrativos. No es una oferta de crédito ni representa un plan disponible: la tasa y las cuotas las elegís vos para comparar.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_27rem] lg:gap-10">
            <div className="grid content-start gap-6">
              <div className="field">
                <label htmlFor="calc-moto">Moto</label>
                <select id="calc-moto" value={slug} onChange={(event) => selectMoto(event.target.value)}>
                  {motos.map((moto) => (
                    <option key={moto.slug} value={moto.slug}>
                      {moto.name}
                    </option>
                  ))}
                  <option value="">Otro valor</option>
                </select>
                {getMotoBySlug(slug)?.financedPrice != null && (
                  <p className="mt-2 text-sm text-[#5A6270]">
                    Precio financiado informado por la agencia:{' '}
                    <strong className="tabular text-[#080A0E]">{money(getMotoBySlug(slug)?.financedPrice as number)}</strong>. Consultá cuotas y condiciones.
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField id="calc-price" label={`Precio de la moto (${currency})`} value={price} onChange={(value) => { setPrice(value); setSlug('') }} error={issues.includes('price') && price !== '' ? issueText.price : undefined} />
                <NumberField
                  id="calc-financed"
                  label={`Monto a financiar (${currency})`}
                  value={validPrice && Number.isFinite(input.downPayment) ? String(input.price - input.downPayment) : ''}
                  onChange={(value) => {
                    const financed = toNumber(value)
                    if (validPrice && Number.isFinite(financed)) setDownPayment(String(Math.max(0, input.price - financed)))
                  }}
                />
              </div>

              <div>
                <div className="flex items-end justify-between gap-3">
                  <label htmlFor="calc-down" className="text-[0.85rem] font-semibold text-[#20242B]">
                    Anticipo ({currency})
                  </label>
                  {validPrice && Number.isFinite(input.downPayment) && <span className="tabular text-sm text-[#5A6270]">{Math.round((input.downPayment / input.price) * 100)}% del precio</span>}
                </div>
                <Slider
                  aria-label="Anticipo"
                  className="mt-4 h-8 [&_[data-slot=slider-thumb]]:size-7 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-track]]:h-2"
                  min={0}
                  max={validPrice ? input.price : 100}
                  step={validPrice ? Math.max(1, Math.round(input.price / 100)) : 1}
                  value={[Number.isFinite(input.downPayment) ? input.downPayment : 0]}
                  disabled={!validPrice}
                  onValueChange={([value]) => setDownPayment(String(value))}
                />
                <div className="field mt-2">
                  <input id="calc-down" type="number" inputMode="decimal" min={0} value={downPayment} onChange={(event) => setDownPayment(event.target.value)} aria-invalid={issues.includes('downPayment') || undefined} className="tabular" />
                  {issues.includes('downPayment') && validPrice && <p className="field-error">{issueText.downPayment}</p>}
                </div>
              </div>

              <fieldset>
                <legend className="text-[0.85rem] font-semibold text-[#20242B]">Cantidad de cuotas</legend>
                <div className="mt-2 grid grid-cols-6 gap-1.5">
                  {INSTALLMENT_OPTIONS.map((option) => (
                    <button key={option} type="button" aria-pressed={installments === option} onClick={() => setInstallments(option)} className="choice tabular !min-h-13 justify-center !p-0 text-lg">
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField id="calc-rate" label="Tasa anual hipotética (TNA)" value={rate} onChange={setRate} suffix="%" error={issues.includes('rate') ? issueText.rate : undefined} />
                <NumberField id="calc-fees" label={`Gastos adicionales (${currency})`} value={fees} onChange={setFees} error={issues.includes('fees') ? issueText.fees : undefined} />
              </div>
              <p className="text-xs text-[#5A6270]">La tasa que aparece es un ejemplo para arrancar, no una tasa ofrecida. Cambiala y compará.</p>
            </div>

            <aside aria-live="polite" className="self-start overflow-hidden rounded-xl bg-[#080A0E] text-white lg:sticky lg:top-24">
              {result ? (
                <>
                  <div className="p-5 md:p-6">
                    <p className="eyebrow text-[#3985FF]">Cuota estimada · ilustrativa</p>
                    <p className="tabular mt-2 text-[2.9rem] leading-none font-bold tracking-tight">
                      <AnimatedNumber value={result.installment} format={money} />
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {installments} cuotas · {result.monthlyRatePercent.toLocaleString('es-AR', { maximumFractionDigits: 2 })}% mensual · Sistema francés
                    </p>

                    <div className="mt-6 flex h-3 gap-0.5 overflow-hidden rounded" role="img" aria-label="Distribución del total estimado">
                      {segments
                        .filter((segment) => segment.value > 0)
                        .map((segment) => (
                          <span key={segment.label} title={`${segment.label}: ${money(segment.value)}`} className="transition-[flex-grow] duration-500" style={{ flexGrow: segment.value, flexBasis: 0, backgroundColor: segment.color === '#20242B' ? '#FFFFFF' : segment.color }} />
                        ))}
                    </div>

                    <dl className="mt-5 grid gap-2.5 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/70">Precio de la moto</dt>
                        <dd className="tabular font-semibold">{money(input.price)}</dd>
                      </div>
                      {segments.map((segment) => (
                        <div key={segment.label} className="flex justify-between gap-4">
                          <dt className="flex items-center gap-2 text-white/70">
                            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: segment.color === '#20242B' ? '#FFFFFF' : segment.color }} />
                            {segment.label}
                          </dt>
                          <dd className="tabular font-semibold">
                            <AnimatedNumber value={segment.value} format={money} />
                          </dd>
                        </div>
                      ))}
                      <div className="flex justify-between gap-4 border-t border-white/15 pt-3 text-base">
                        <dt className="font-semibold">Total estimado</dt>
                        <dd className="tabular font-bold">
                          <AnimatedNumber value={result.totalPaid} format={money} />
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="bg-[#1769E8] p-3">
                    <a
                      href={whatsappUrl(
                        messages.simulation({
                          motoName,
                          currency,
                          price: input.price,
                          downPayment: input.downPayment,
                          installments,
                          installment: result.installment,
                          monthlyRatePercent: result.monthlyRatePercent,
                          annualRatePercent: input.annualRatePercent,
                          fees: input.fees,
                        }),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-white w-full"
                    >
                      <MessageCircle />
                      Consultar este escenario
                    </a>
                  </div>
                </>
              ) : (
                <div className="p-6">
                  <p className="font-display text-lg font-bold">Completá los datos</p>
                  <ul className="mt-3 grid gap-1 text-sm text-white/75">
                    {issues.map((issue) => (
                      <li key={issue}>{issueText[issue]}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </>
      )}
    </div>
  )
}
