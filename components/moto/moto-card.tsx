import Link from 'next/link'
import { ArrowUpRight, Percent } from 'lucide-react'
import { MotoPhoto } from '@/components/moto/moto-photo'
import { categories, motoPath, type Moto } from '@/lib/motos'
import { motoFinancedLabel, motoKmLabel, motoPriceLabel, motoYearLabel } from '@/lib/moto-format'
import { cn } from '@/lib/utils'

const statusStyle = {
  Disponible: 'bg-[#1769E8]',
  Reservada: 'bg-[#A8AFBC]',
  Vendida: 'bg-[#20242B]',
}

interface MotoCardProps {
  moto: Moto
  sizes?: string
  /** Alterna el fondo de la ficha técnica para que la grilla tenga ritmo. */
  tone?: 'white' | 'gray'
}

/** Ficha del catálogo: la foto manda y la cilindrada funciona como firma técnica. */
export function MotoCard({ moto, sizes = '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw', tone = 'white' }: MotoCardProps) {
  const specs = [
    { label: 'Año', value: motoYearLabel(moto) },
    { label: 'Condición', value: moto.condition },
    { label: moto.condition === 'Usada' ? 'Km' : 'Categoría', value: moto.condition === 'Usada' ? motoKmLabel(moto) : categories[moto.category].name },
  ]

  return (
    <article className={cn('group relative overflow-hidden rounded-xl border border-[#E2E6EC] transition-[border-color,box-shadow] duration-500 hover:border-[#3985FF] hover:shadow-[0_24px_50px_-28px_rgb(11_67_168/0.55)]', tone === 'gray' ? 'bg-[#F3F5F8]' : 'bg-white')}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <MotoPhoto moto={moto} sizes={sizes} imageClassName="transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]" />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="eyebrow rounded bg-white/95 px-2 py-1 !text-[0.62rem] text-[#080A0E]">{categories[moto.category].name}</span>
          {moto.financingInquiry && moto.status !== 'Vendida' && (
            <span className="eyebrow inline-flex items-center gap-1 rounded bg-[#1769E8] px-2 py-1 !text-[0.62rem] !tracking-[0.08em] text-white">
              <Percent className="h-3 w-3" />
              Consultá financiación
            </span>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-primary">{moto.brand}</p>
            <h3 className="font-display mt-1 text-lg leading-tight font-bold tracking-tight text-[#080A0E]">
              <Link href={motoPath(moto)} className="after:absolute after:inset-0 after:content-['']">
                {moto.name}
              </Link>
            </h3>
          </div>
          <span className="tabular shrink-0 text-right text-2xl leading-none font-bold tracking-tight text-[#080A0E]">
            {moto.cc}
            <span className="ml-0.5 text-xs font-semibold text-[#5A6270]">cc</span>
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-[#E2E6EC] py-3">
          {specs.map((spec) => (
            <div key={spec.label} className="min-w-0">
              <dt className="text-[0.7rem] text-[#5A6270]">{spec.label}</dt>
              <dd className="tabular truncate text-sm font-semibold text-[#080A0E]">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="tabular text-2xl leading-none font-bold tracking-tight text-[#080A0E]">{motoPriceLabel(moto)}</p>
            {motoFinancedLabel(moto) && (
              <p className="tabular mt-1.5 text-sm font-semibold text-primary">
                Financiado {motoFinancedLabel(moto)}
              </p>
            )}
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#5A6270]">
              <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', statusStyle[moto.status])} />
              {moto.status}
            </p>
          </div>
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1769E8] text-white transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-105">
            <ArrowUpRight className="h-5 w-5 rotate-45" />
          </span>
        </div>
      </div>
    </article>
  )
}
