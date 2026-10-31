import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculateScenario, frenchInstallment, validateScenario } from './financing.ts'
import { findMotos } from './finder.ts'
import { isPlanPublishable, plansForMoto, publishablePlans, type FinancingPlan } from './financing-plans.ts'

const close = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.01, `${a} ≠ ${b}`)

test('amortización francesa contra un valor conocido', () => {
  // P=1000, r=1% mensual, n=12 → 88,85 (tabla estándar).
  close(frenchInstallment(1000, 0.01, 12), 88.85)
})

test('tasa cero divide en partes iguales', () => {
  assert.equal(frenchInstallment(1200, 0, 12), 100)
  const result = calculateScenario({ price: 1500, downPayment: 300, installments: 12, annualRatePercent: 0, fees: 0 })
  assert.equal(result?.installment, 100)
  assert.equal(result?.interest, 0)
  assert.equal(result?.totalPaid, 1500)
})

test('el total reconcilia anticipo, capital, intereses y gastos', () => {
  const input = { price: 5200, downPayment: 1200, installments: 24, annualRatePercent: 50, fees: 150 }
  const result = calculateScenario(input)!
  assert.equal(result.financed, 4000)
  close(result.totalPaid, input.downPayment + result.financed + result.interest + input.fees)
  close(result.installment * input.installments, result.financed + result.interest)
})

test('la suma de saldos de la tabla llega a cero', () => {
  const rate = 0.5 / 12
  const installment = frenchInstallment(4000, rate, 24)
  let balance = 4000
  for (let i = 0; i < 24; i++) balance = balance * (1 + rate) - installment
  close(balance, 0)
})

test('rechaza datos inválidos', () => {
  const base = { price: 5000, downPayment: 500, installments: 12, annualRatePercent: 40, fees: 0 }
  assert.deepEqual(validateScenario(base), [])
  assert.deepEqual(validateScenario({ ...base, price: 0, downPayment: 0 }), ['price', 'downPayment'])
  assert.deepEqual(validateScenario({ ...base, downPayment: 5000 }), ['downPayment'])
  assert.deepEqual(validateScenario({ ...base, downPayment: -1 }), ['downPayment'])
  assert.deepEqual(validateScenario({ ...base, installments: 1.5 }), ['installments'])
  assert.deepEqual(validateScenario({ ...base, annualRatePercent: Number.NaN }), ['rate'])
  assert.deepEqual(validateScenario({ ...base, annualRatePercent: 9999 }), ['rate'])
  assert.deepEqual(validateScenario({ ...base, fees: -3 }), ['fees'])
  assert.equal(calculateScenario({ ...base, price: Number.POSITIVE_INFINITY }), null)
})

const plan: FinancingPlan = {
  id: 'x',
  name: 'Plan',
  entity: 'Entidad',
  appliesTo: ['a'],
  minDownPaymentPercent: 10,
  annualRatePercent: 40,
  rateType: 'Fija',
  installments: [12],
  fees: 'Sin gastos',
  requirements: ['DNI'],
  includes: [],
  excludes: [],
  conditions: 'Condiciones',
  validUntil: '2026-12-31',
  applicationChannel: 'WhatsApp',
}

test('un plan vencido o incompleto no se publica', () => {
  const today = new Date('2026-10-31T12:00:00')
  assert.equal(isPlanPublishable(plan, today), true)
  assert.equal(isPlanPublishable({ ...plan, validUntil: '2026-10-30' }, today), false)
  assert.equal(isPlanPublishable({ ...plan, validUntil: '' }, today), false)
  assert.equal(isPlanPublishable({ ...plan, entity: ' ' }, today), false)
  assert.equal(isPlanPublishable({ ...plan, requirements: [] }, today), false)
  assert.equal(publishablePlans([plan, { ...plan, id: 'y', fees: '' }], today).length, 1)
})

test('los planes se filtran por modelo', () => {
  assert.equal(plansForMoto([plan], 'a').length, 1)
  assert.equal(plansForMoto([plan], 'b').length, 0)
  assert.equal(plansForMoto([{ ...plan, appliesTo: 'todas' }], 'b').length, 1)
})

const moto = (over: object) =>
  ({ id: 'a', uses: ['Viajes'], cc: 373, price: 5200, currency: 'USD', condition: 'Usada', status: 'Disponible', ...over }) as never

const answers = { use: null, cc: null, budget: null, condition: null, financing: null }

test('el buscador separa coincidencias exactas y cercanas', () => {
  const list = [moto({}), moto({ id: 'b', cc: 110, price: 2000, uses: ['Trabajo'] })]
  const exact = findMotos(list, { ...answers, use: 'Viajes', cc: '250+', budget: 'usd' })
  assert.equal(exact.exact.length, 1)
  assert.equal(exact.close.length, 0)

  const near = findMotos(list, { ...answers, use: 'Viajes', cc: '110' })
  assert.equal(near.exact.length, 0)
  assert.equal(near.close.length, 2)
})

test('el presupuesto en pesos no compara contra precios en dólares', () => {
  const list = [moto({ price: 1500000, currency: 'ARS' }), moto({ id: 'b', price: 1500 })]
  const result = findMotos(list, { ...answers, budget: 'hasta-2m' })
  assert.deepEqual(result.exact.map((item) => item.moto.id), ['a'])
})

test('el buscador no afirma presupuesto sin precio y excluye vendidas', () => {
  const noPrice = findMotos([moto({ price: null })], { ...answers, budget: 'usd' })
  assert.equal(noPrice.exact.length, 0)
  const sold = findMotos([moto({ status: 'Vendida' })], answers)
  assert.equal(sold.exact.length, 0)
})
