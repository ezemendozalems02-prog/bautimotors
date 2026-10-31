/**
 * Cálculo de la simulación orientativa. Sin dependencias ni datos de negocio:
 * es matemática pura y se prueba en lib/financing.test.ts.
 */
export interface ScenarioInput {
  price: number
  downPayment: number
  installments: number
  /** Tasa nominal anual en porcentaje. */
  annualRatePercent: number
  fees: number
}

export interface ScenarioResult {
  financed: number
  installment: number
  interest: number
  totalPaid: number
  monthlyRatePercent: number
}

export type ScenarioIssue = 'price' | 'downPayment' | 'installments' | 'rate' | 'fees'

export const MAX_ANNUAL_RATE = 500

const isAmount = (value: number) => Number.isFinite(value) && value >= 0

export function validateScenario(input: ScenarioInput): ScenarioIssue[] {
  const issues: ScenarioIssue[] = []
  if (!isAmount(input.price) || input.price <= 0) issues.push('price')
  if (!isAmount(input.downPayment) || input.downPayment >= input.price) issues.push('downPayment')
  if (!Number.isInteger(input.installments) || input.installments < 1) issues.push('installments')
  if (!isAmount(input.annualRatePercent) || input.annualRatePercent > MAX_ANNUAL_RATE) issues.push('rate')
  if (!isAmount(input.fees)) issues.push('fees')
  return issues
}

/**
 * Amortización francesa: Cuota = P × r / (1 − (1 + r)^(−n)).
 * Con tasa cero: Cuota = P / n.
 */
export function frenchInstallment(principal: number, monthlyRate: number, installments: number) {
  if (monthlyRate === 0) return principal / installments
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments))
}

/** Devuelve null si los datos no son válidos: nunca muestra un número sin sentido. */
export function calculateScenario(input: ScenarioInput): ScenarioResult | null {
  if (validateScenario(input).length > 0) return null

  const financed = input.price - input.downPayment
  const monthlyRate = input.annualRatePercent / 100 / 12
  const installment = frenchInstallment(financed, monthlyRate, input.installments)
  const paidInInstallments = installment * input.installments

  return {
    financed,
    installment,
    interest: paidInInstallments - financed,
    totalPaid: input.downPayment + paidInInstallments + input.fees,
    monthlyRatePercent: monthlyRate * 100,
  }
}
