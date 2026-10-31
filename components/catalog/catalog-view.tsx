'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { MotoCard } from '@/components/moto/moto-card'
import { ease } from '@/components/motion/primitives'
import { activeCategories, categories, motos, type Moto, type MotoCategory } from '@/lib/motos'
import { cn } from '@/lib/utils'

const ccBands = [
  { label: 'Hasta 124 cc', min: 0, max: 124 },
  { label: '125 a 199 cc', min: 125, max: 199 },
  { label: '200 a 250 cc', min: 200, max: 250 },
  { label: 'Más de 250 cc', min: 251, max: Infinity },
]

/** Hay precios en pesos y en dólares: sin cotización, nunca se comparan entre sí. */
const priceBands = [
  { label: 'Hasta $2.000.000', currency: 'ARS', min: 0, max: 2000000 },
  { label: '$2.000.000 a $3.000.000', currency: 'ARS', min: 2000000, max: 3000000 },
  { label: '$3.000.000 a $6.500.000', currency: 'ARS', min: 3000000, max: 6500000 },
  { label: 'Más de $6.500.000', currency: 'ARS', min: 6500000, max: Infinity },
  { label: 'En dólares', currency: 'USD', min: 0, max: Infinity },
]

const inBand = (moto: Moto, band: (typeof priceBands)[number]) => moto.price !== null && moto.currency === band.currency && moto.price >= band.min && moto.price <= band.max

/** Agrupa por moneda para ordenar: los precios en dólares quedan juntos, en un extremo. */
const priceRank = (moto: Moto) => (moto.currency === 'USD' ? 1e12 : 0) + (moto.price ?? 0)

const sortOptions: { value: string; label: string; compare: (a: Moto, b: Moto) => number }[] = [
  { value: 'relevancia', label: 'Destacadas primero', compare: (a, b) => Number(b.featured) - Number(a.featured) },
  { value: 'precio-asc', label: 'Menor precio', compare: (a, b) => (a.price === null ? Infinity : priceRank(a)) - (b.price === null ? Infinity : priceRank(b)) },
  { value: 'precio-desc', label: 'Mayor precio', compare: (a, b) => priceRank(b) - priceRank(a) },
  { value: 'anio-desc', label: 'Más nuevas', compare: (a, b) => (b.year ?? 0) - (a.year ?? 0) },
  { value: 'cc-asc', label: 'Menor cilindrada', compare: (a, b) => a.cc - b.cc },
]

/** Busca sin distinguir mayúsculas ni tildes. */
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const unique = <T,>(values: T[]) => [...new Set(values)]

interface Filters {
  brand: string | null
  model: string | null
  cc: string | null
  price: string | null
  year: number | null
  condition: string | null
  category: string | null
  status: string | null
}

const emptyFilters: Filters = { brand: null, model: null, cc: null, price: null, year: null, condition: null, category: null, status: null }


function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-[#E2E6EC] py-4">
      <legend className="eyebrow float-left mb-2.5 w-full text-[#20242B]">{title}</legend>
      <div className="clear-both flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
  )
}

interface CatalogViewProps {
  /** Fija la categoría en las páginas de categoría. */
  lockedCategory?: MotoCategory
}

export function CatalogView({ lockedCategory }: CatalogViewProps) {
  const params = useSearchParams()
  const conditionParam = params.get('condicion')
  const categoryParam = params.get('categoria')

  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    ...emptyFilters,
    category: lockedCategory ?? (categoryParam && categoryParam in categories ? categoryParam : null),
    condition: conditionParam === 'usada' ? 'Usada' : conditionParam === '0km' ? '0 km' : null,
  })
  const [sort, setSort] = useState(sortOptions[0].value)

  // Filtros vinculados al link del footer cuando ya se está en esta página.
  const [lastParam, setLastParam] = useState(conditionParam)
  if (conditionParam !== lastParam) {
    setLastParam(conditionParam)
    setFilters((current) => ({ ...current, condition: conditionParam === 'usada' ? 'Usada' : conditionParam === '0km' ? '0 km' : null }))
  }

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((current) => ({ ...current, [key]: current[key] === value ? null : value }))

  const options = useMemo(
    () => ({
      brands: unique(motos.map((moto) => moto.brand)).sort(),
      models: unique(motos.map((moto) => moto.model)).sort(),
      years: unique(motos.flatMap((moto) => (moto.year === null ? [] : [moto.year]))).sort((a, b) => b - a),
      conditions: unique(motos.map((moto) => moto.condition)),
      statuses: unique(motos.map((moto) => moto.status)),
      cc: ccBands.filter((band) => motos.some((moto) => moto.cc >= band.min && moto.cc <= band.max)),
      prices: priceBands.filter((band) => motos.some((moto) => inBand(moto, band))),
    }),
    [],
  )

  const results = useMemo(() => {
    const words = normalize(query.trim()).split(/\s+/).filter(Boolean)
    const compare = sortOptions.find((option) => option.value === sort)!.compare

    return motos
      .filter((moto) => {
        const haystack = normalize(`${moto.name} ${moto.brand} ${moto.model} ${moto.version}`)
        if (!words.every((word) => haystack.includes(word))) return false
        if (filters.brand && moto.brand !== filters.brand) return false
        if (filters.model && moto.model !== filters.model) return false
        if (filters.year && moto.year !== filters.year) return false
        if (filters.condition && moto.condition !== filters.condition) return false
        if (filters.category && moto.category !== filters.category) return false
        if (filters.status && moto.status !== filters.status) return false
        const cc = ccBands.find((band) => band.label === filters.cc)
        if (cc && (moto.cc < cc.min || moto.cc > cc.max)) return false
        const price = priceBands.find((band) => band.label === filters.price)
        return !price || inBand(moto, price)
      })
      .sort(compare)
  }, [query, filters, sort])

  const activeCount = (Object.keys(filters) as (keyof Filters)[]).filter((key) => filters[key] !== null && !(key === 'category' && lockedCategory)).length
  const hasActive = activeCount > 0 || query !== ''

  const clearAll = () => {
    setQuery('')
    setFilters({ ...emptyFilters, category: lockedCategory ?? null })
  }

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} type="button" aria-pressed={active} onClick={onClick} className="chip">
      {label}
    </button>
  )

  const filterPanel = (
    <>
      {!lockedCategory && (
        <FilterGroup title="Categoría">
          {activeCategories().map((key) => chip(categories[key].name, filters.category === key, () => toggle('category', key)))}
        </FilterGroup>
      )}
      <FilterGroup title="Condición">{options.conditions.map((item) => chip(item, filters.condition === item, () => toggle('condition', item)))}</FilterGroup>
      <FilterGroup title="Marca">{options.brands.map((item) => chip(item, filters.brand === item, () => toggle('brand', item)))}</FilterGroup>
      <FilterGroup title="Modelo">{options.models.map((item) => chip(item, filters.model === item, () => toggle('model', item)))}</FilterGroup>
      <FilterGroup title="Cilindrada">{options.cc.map((band) => chip(band.label, filters.cc === band.label, () => toggle('cc', band.label)))}</FilterGroup>
      <FilterGroup title="Precio">{options.prices.map((band) => chip(band.label, filters.price === band.label, () => toggle('price', band.label)))}</FilterGroup>
      <FilterGroup title="Año">{options.years.map((year) => chip(String(year), filters.year === year, () => toggle('year', year)))}</FilterGroup>
      <FilterGroup title="Disponibilidad">{options.statuses.map((item) => chip(item, filters.status === item, () => toggle('status', item)))}</FilterGroup>
    </>
  )

  const clearButton = hasActive && (
    <button type="button" onClick={clearAll} className="link-line !min-h-9">
      <X />
      Limpiar
    </button>
  )

  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="glass-light sticky top-16 z-20 border-b border-[#E2E6EC] lg:top-20">
        <div className="shell flex items-center gap-2 py-2.5 md:gap-3">
          <div className="relative min-w-0 flex-1">
            <Search aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#5A6270]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscá por marca o modelo"
              aria-label="Buscar motos"
              className="h-11 w-full rounded-lg border border-[#DCE1E8] bg-white pr-3 pl-10 text-base outline-none transition-colors placeholder:text-[#79818F] focus:border-primary md:text-sm"
            />
          </div>

          <div className="relative hidden sm:block">
            <select
              aria-label="Ordenar motos"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 appearance-none rounded-lg border border-[#DCE1E8] bg-white pr-9 pl-3 text-sm outline-none focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#5A6270]" />
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <button type="button" className="relative flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#DCE1E8] bg-white px-3 text-sm font-semibold lg:hidden">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filtros
                {activeCount > 0 && <span className="tabular flex h-5 min-w-5 items-center justify-center rounded bg-primary px-1 text-xs font-semibold text-white">{activeCount}</span>}
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[88svh] bg-white">
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <DrawerTitle className="font-display text-xl font-bold">Filtros</DrawerTitle>
                {clearButton}
              </div>
              <div className="overflow-y-auto px-4">
                <div className="sm:hidden">
                  <FilterGroup title="Ordenar por">{sortOptions.map((option) => chip(option.label, sort === option.value, () => setSort(option.value)))}</FilterGroup>
                </div>
                {filterPanel}
              </div>
              <div className="safe-bottom border-t border-[#E2E6EC] p-4">
                <DrawerClose asChild>
                  <button type="button" className="btn btn-primary w-full">
                    Ver {results.length} {results.length === 1 ? 'moto' : 'motos'}
                  </button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="shell mt-8 grid gap-8 lg:grid-cols-[16.5rem_1fr] lg:gap-12">
        <aside aria-label="Filtros" className="hidden lg:sticky lg:top-40 lg:block lg:max-h-[calc(100svh-11rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          {filterPanel}
          <div className="border-t border-[#E2E6EC] pt-2">{clearButton}</div>
        </aside>

        <div className="min-w-0">
          <p aria-live="polite" className="mb-5 text-sm text-[#5A6270]">
            <span className="tabular text-base font-bold text-[#080A0E]">{results.length}</span> {results.length === 1 ? 'moto encontrada' : 'motos encontradas'}
          </p>

          {results.length > 0 ? (
            <motion.div layout="position" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((moto, index) => (
                  <motion.div key={moto.id} layout="position" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                    <MotoCard moto={moto} tone={index % 2 === 0 ? 'white' : 'gray'} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 40vw, 26vw" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className={cn('rounded-xl bg-[#F3F5F8] px-6 py-16 text-center')}>
              <h2 className="font-display text-2xl font-bold">No hay motos con esos filtros</h2>
              <p className="mx-auto mt-2 max-w-md text-[#5A6270]">Probá con menos filtros, o contanos qué buscás y lo vemos juntos.</p>
              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <button type="button" onClick={clearAll} className="btn btn-outline">
                  Limpiar filtros
                </button>
                <Link href="/#encontra-tu-moto" className="btn btn-primary">
                  Ayudame a elegir
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
