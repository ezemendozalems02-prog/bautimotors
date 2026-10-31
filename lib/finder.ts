import type { Moto, MotoCondition, MotoUse } from './motos'

/** Lógica del buscador asistido: solo compara contra el inventario real. */
export type CcRange = '110' | '125-150' | '200-250' | '250+' | 'any'
export type BudgetRange = 'hasta-2m' | '2m-3m' | '3m-6m' | 'mas-6m' | 'usd' | 'any'

export interface FinderAnswers {
  use: MotoUse | null
  cc: CcRange | null
  budget: BudgetRange | null
  condition: MotoCondition | 'any' | null
  financing: boolean | null
}

/** Pesos y dólares no se comparan: no hay una cotización confirmada. */
const budgetBands: Record<Exclude<BudgetRange, 'any'>, { currency: Moto['currency']; min: number; max: number }> = {
  'hasta-2m': { currency: 'ARS', min: 0, max: 2000000 },
  '2m-3m': { currency: 'ARS', min: 2000000, max: 3000000 },
  '3m-6m': { currency: 'ARS', min: 3000000, max: 6500000 },
  'mas-6m': { currency: 'ARS', min: 6500000, max: Infinity },
  usd: { currency: 'USD', min: 0, max: Infinity },
}

const ccBands: Record<Exclude<CcRange, 'any'>, [number, number]> = {
  '110': [0, 124],
  '125-150': [125, 199],
  '200-250': [200, 250],
  '250+': [251, Infinity],
}

export interface FinderMatch {
  moto: Moto
  matched: string[]
  missed: string[]
}

export function evaluateMoto(moto: Moto, answers: FinderAnswers): FinderMatch {
  const matched: string[] = []
  const missed: string[] = []
  const check = (ok: boolean, label: string) => (ok ? matched : missed).push(label)

  if (answers.use) check(moto.uses.includes(answers.use), answers.use)

  if (answers.cc && answers.cc !== 'any') {
    const [min, max] = ccBands[answers.cc]
    check(moto.cc >= min && moto.cc <= max, 'Cilindrada')
  }

  // Sin precio informado no se puede afirmar que entra en el presupuesto.
  if (answers.budget && answers.budget !== 'any') {
    const { currency, min, max } = budgetBands[answers.budget]
    check(moto.price !== null && moto.currency === currency && moto.price >= min && moto.price < max, 'Presupuesto')
  }

  if (answers.condition && answers.condition !== 'any') {
    check(moto.condition === answers.condition, answers.condition)
  }

  return { moto, matched, missed }
}

/** `exact` cumple todo lo pedido; `close` son las más cercanas, y se rotulan como tales. */
export function findMotos(motos: Moto[], answers: FinderAnswers) {
  const evaluated = motos.filter((moto) => moto.status !== 'Vendida').map((moto) => evaluateMoto(moto, answers))
  const exact = evaluated.filter((item) => item.missed.length === 0)
  const close =
    exact.length > 0
      ? []
      : evaluated
          .filter((item) => item.matched.length > 0)
          .sort((a, b) => b.matched.length - a.matched.length)
          .slice(0, 3)
  return { exact, close }
}
