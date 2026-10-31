/**
 * Planes reales de financiación. HOY NO HAY NINGUNO CONFIRMADO.
 *
 * Cargar un plan acá habilita solo el modo "Financiación real" de la calculadora
 * y la comparación de planes. Un plan incompleto o vencido nunca se publica.
 * No cargar valores que la entidad no haya confirmado por escrito.
 */
export type RateType = 'Fija' | 'Variable' | 'UVA' | 'Sin interés'

export interface FinancingPlan {
  id: string
  /** Nombre comercial. */
  name: string
  /** Entidad que otorga la financiación. */
  entity: string
  /** Slugs de motos incluidas; 'todas' aplica a todo el catálogo. */
  appliesTo: string[] | 'todas'
  /** Anticipo mínimo como porcentaje del precio. */
  minDownPaymentPercent: number
  /** Tasa nominal anual en porcentaje. */
  annualRatePercent: number
  rateType: RateType
  /** Costo financiero total, si la entidad lo informa. */
  cftPercent?: number
  installments: number[]
  /** Gastos de otorgamiento y similares, en el texto que informe la entidad. */
  fees: string
  requirements: string[]
  includes: string[]
  excludes: string[]
  conditions: string
  /** Fecha ISO (AAAA-MM-DD) hasta la que está vigente. Es obligatoria. */
  validUntil: string
  /** Canal autorizado para la solicitud y la documentación. */
  applicationChannel: string
}

export const financingPlans: FinancingPlan[] = []

export function isPlanPublishable(plan: FinancingPlan, today = new Date()) {
  const expiry = new Date(`${plan.validUntil}T23:59:59`)
  return (
    plan.name.trim() !== '' &&
    plan.entity.trim() !== '' &&
    plan.annualRatePercent >= 0 &&
    plan.installments.length > 0 &&
    plan.fees.trim() !== '' &&
    plan.requirements.length > 0 &&
    plan.conditions.trim() !== '' &&
    plan.applicationChannel.trim() !== '' &&
    !Number.isNaN(expiry.getTime()) &&
    expiry >= today
  )
}

export function publishablePlans(plans: FinancingPlan[], today = new Date()) {
  return plans.filter((plan) => isPlanPublishable(plan, today))
}

export function plansForMoto(plans: FinancingPlan[], slug: string) {
  return plans.filter((plan) => plan.appliesTo === 'todas' || plan.appliesTo.includes(slug))
}
