import type { Moto } from '@/lib/motos'
import { formatKm, formatMoney } from '@/lib/site'

export const motoPriceLabel = (moto: Moto) => (moto.price === null ? 'Consultar precio' : formatMoney(moto.price, moto.currency))

export const motoFinancedLabel = (moto: Moto) => (moto.financedPrice === null ? null : formatMoney(moto.financedPrice, moto.currency))

export const motoYearLabel = (moto: Moto) => (moto.year === null ? 'Consultar' : String(moto.year))

export const motoKmLabel = (moto: Moto) => (moto.km === null ? 'Consultar' : formatKm(moto.km))
