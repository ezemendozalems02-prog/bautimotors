'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { VehicleCard } from '@/components/vehicle-card'
import { ease } from '@/components/motion/primitives'
import { getAllBrands, getAllTypes, getVehicleStatus, vehicles, type Vehicle } from '@/lib/vehicles'
import { cn } from '@/lib/utils'

const yearRanges = [
  { label: 'Todos', min: 0, max: 9999 },
  { label: '2023+', min: 2023, max: 9999 },
  { label: '2020-2022', min: 2020, max: 2022 },
  { label: '2017-2019', min: 2017, max: 2019 },
  { label: 'Antes de 2017', min: 0, max: 2016 },
]

const kmRanges = [
  { label: 'Todos', min: 0, max: 999999 },
  { label: 'Hasta 20.000 km', min: 0, max: 20000 },
  { label: '20.000 - 50.000 km', min: 20000, max: 50000 },
  { label: '50.000 - 100.000 km', min: 50000, max: 100000 },
  { label: 'Más de 100.000 km', min: 100000, max: 999999 },
]

const priceRanges = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: 'Hasta USD 25.000', min: 0, max: 25000 },
  { label: 'USD 25.000 - 40.000', min: 25000, max: 40000 },
  { label: 'USD 40.000 - 55.000', min: 40000, max: 55000 },
  { label: 'Más de USD 55.000', min: 55000, max: Infinity },
]

const statusOptions = ['Disponible', 'Reservado', 'Vendido'] as const

const sortOptions: { value: string; label: string; compare: (a: Vehicle, b: Vehicle) => number }[] = [
  { value: 'relevancia', label: 'Destacados primero', compare: (a, b) => Number(b.featured) - Number(a.featured) },
  { value: 'precio-asc', label: 'Menor precio', compare: (a, b) => a.price - b.price },
  { value: 'precio-desc', label: 'Mayor precio', compare: (a, b) => b.price - a.price },
  { value: 'anio-desc', label: 'Más nuevos', compare: (a, b) => b.year - a.year },
  { value: 'km-asc', label: 'Menos kilómetros', compare: (a, b) => a.km - b.km },
]

/** Busca sin distinguir mayúsculas ni tildes. */
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'min-h-10 rounded-[2px] border px-3 text-[0.8125rem] transition-colors duration-300',
        active
          ? 'border-primary bg-primary font-semibold text-[#080808]'
          : 'border-white/12 text-[#B8B8B8] hover:border-white/40 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-white/10 py-5">
      <legend className="eyebrow float-left mb-3 w-full text-white/60">{title}</legend>
      <div className="clear-both flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
  )
}

export function CatalogView() {
  const params = useSearchParams()
  const initialFilter = params.get('filter')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState(yearRanges[0])
  const [selectedKm, setSelectedKm] = useState(kmRanges[0])
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [showFeatured, setShowFeatured] = useState(initialFilter === 'destacados')
  const [showNewArrivals, setShowNewArrivals] = useState(initialFilter === 'nuevos')
  const [sort, setSort] = useState(sortOptions[0].value)

  const brands = getAllBrands()
  const types = getAllTypes()

  const filteredVehicles = useMemo(() => {
    const query = normalize(searchQuery.trim())
    const compare = sortOptions.find((option) => option.value === sort)!.compare

    return vehicles
      .filter((vehicle) => {
        if (query) {
          const haystack = normalize(`${vehicle.name} ${vehicle.brand} ${vehicle.model} ${vehicle.version}`)
          if (!query.split(/\s+/).every((word) => haystack.includes(word))) return false
        }
        if (selectedBrand && vehicle.brand !== selectedBrand) return false
        if (selectedType && vehicle.type !== selectedType) return false
        if (selectedStatus && getVehicleStatus(vehicle) !== selectedStatus) return false
        if (vehicle.year < selectedYear.min || vehicle.year > selectedYear.max) return false
        if (vehicle.km < selectedKm.min || vehicle.km > selectedKm.max) return false
        if (vehicle.price < selectedPrice.min || vehicle.price > selectedPrice.max) return false
        if (showFeatured && !vehicle.featured) return false
        if (showNewArrivals && !vehicle.newArrival) return false
        return true
      })
      .sort(compare)
  }, [searchQuery, selectedBrand, selectedType, selectedStatus, selectedYear, selectedKm, selectedPrice, showFeatured, showNewArrivals, sort])

  const activeCount =
    Number(Boolean(selectedBrand)) +
    Number(Boolean(selectedType)) +
    Number(Boolean(selectedStatus)) +
    Number(selectedYear !== yearRanges[0]) +
    Number(selectedKm !== kmRanges[0]) +
    Number(selectedPrice !== priceRanges[0]) +
    Number(showFeatured) +
    Number(showNewArrivals)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand(null)
    setSelectedType(null)
    setSelectedStatus(null)
    setSelectedYear(yearRanges[0])
    setSelectedKm(kmRanges[0])
    setSelectedPrice(priceRanges[0])
    setShowFeatured(false)
    setShowNewArrivals(false)
  }

  const hasActiveFilters = activeCount > 0 || searchQuery !== ''

  const filters = (
    <>
      <FilterGroup title="Selección">
        <Chip active={showFeatured} onClick={() => setShowFeatured(!showFeatured)}>Destacados</Chip>
        <Chip active={showNewArrivals} onClick={() => setShowNewArrivals(!showNewArrivals)}>Nuevos ingresos</Chip>
      </FilterGroup>
      <FilterGroup title="Marca">
        {brands.map((brand) => (
          <Chip key={brand} active={selectedBrand === brand} onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}>
            {brand}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Precio">
        {priceRanges.map((range) => (
          <Chip key={range.label} active={selectedPrice === range} onClick={() => setSelectedPrice(range)}>{range.label}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Año">
        {yearRanges.map((range) => (
          <Chip key={range.label} active={selectedYear === range} onClick={() => setSelectedYear(range)}>{range.label}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Tipo">
        {types.map((type) => (
          <Chip key={type} active={selectedType === type} onClick={() => setSelectedType(selectedType === type ? null : type)}>
            {type}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Kilometraje">
        {kmRanges.map((range) => (
          <Chip key={range.label} active={selectedKm === range} onClick={() => setSelectedKm(range)}>{range.label}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Disponibilidad">
        {statusOptions.map((status) => (
          <Chip key={status} active={selectedStatus === status} onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}>
            {status}
          </Chip>
        ))}
      </FilterGroup>
    </>
  )

  const clearButton = hasActiveFilters && (
    <button type="button" onClick={clearFilters} className="link-line !bg-none text-[#B8B8B8] hover:text-white">
      <X />
      Limpiar filtros
    </button>
  )

  return (
    <section className="bg-[#080808] pb-24">
      {/* Barra fija: búsqueda y orden siempre a mano. */}
      <div className="glass-nav sticky top-0 z-20 border-y border-white/8">
        <div className="shell flex items-center gap-2 py-2.5 md:gap-3">
          <div className="relative min-w-0 flex-1">
            <Search aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8d8d8d]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar por marca o modelo"
              aria-label="Buscar vehículos"
              className="h-11 w-full rounded-[3px] border border-white/10 bg-[#111111] pr-3 pl-10 text-base text-white outline-none transition-colors placeholder:text-[#8d8d8d] focus:border-primary md:text-sm"
            />
          </div>

          <div className="relative hidden sm:block">
            <select
              aria-label="Ordenar vehículos"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 appearance-none rounded-[3px] border border-white/10 bg-[#111111] pr-9 pl-3 text-sm text-white outline-none focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#8d8d8d]" />
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <button
                type="button"
                className="relative flex h-11 shrink-0 items-center gap-2 rounded-[3px] border border-white/10 bg-[#111111] px-3 text-sm text-white lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filtros
                {activeCount > 0 && (
                  <span className="tabular flex h-5 min-w-5 items-center justify-center bg-primary px-1 text-xs font-semibold text-[#080808]">
                    {activeCount}
                  </span>
                )}
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[88svh] border-white/10 bg-[#111111]">
              <div className="flex items-center justify-between px-5 pt-3 pb-4">
                <DrawerTitle className="display text-xl">Filtros</DrawerTitle>
                {clearButton}
              </div>
              <div className="overflow-y-auto px-5">
                <div className="sm:hidden">
                  <fieldset className="border-t border-white/10 py-5">
                    <legend className="eyebrow float-left mb-3 w-full text-white/60">Ordenar por</legend>
                    <div className="clear-both flex flex-wrap gap-1.5">
                      {sortOptions.map((option) => (
                        <Chip key={option.value} active={sort === option.value} onClick={() => setSort(option.value)}>
                          {option.label}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>
                </div>
                {filters}
              </div>
              <div className="safe-bottom border-t border-white/10 p-4">
                <DrawerClose asChild>
                  <button type="button" className="btn btn-primary w-full">
                    Ver {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehículo' : 'vehículos'}
                  </button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="shell mt-8 grid gap-8 lg:grid-cols-[17.5rem_1fr] lg:gap-12">
        <aside aria-label="Filtros" className="hidden pr-2 [scrollbar-color:#3a3a3a_transparent] [scrollbar-width:thin] lg:sticky lg:top-20 lg:block lg:max-h-[calc(100svh-6rem)] lg:self-start lg:overflow-y-auto">
          {filters}
          <div className="border-t border-white/10 pt-4">{clearButton}</div>
        </aside>

        <div className="min-w-0">
          <p aria-live="polite" className="mb-5 text-sm text-[#B8B8B8]">
            <span className="tabular text-base text-white">{filteredVehicles.length}</span>{' '}
            {filteredVehicles.length === 1 ? 'vehículo encontrado' : 'vehículos encontrados'}
          </p>

          {filteredVehicles.length > 0 ? (
            <motion.div layout="position" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    layout="position"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <VehicleCard vehicle={vehicle} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 26vw" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border border-white/10 px-6 py-20 text-center">
              <h2 className="display display-md text-white">Sin resultados</h2>
              <p className="mt-3 text-[#B8B8B8]">Intentá modificar los filtros o realizar una nueva búsqueda.</p>
              <button type="button" onClick={clearFilters} className="btn btn-ghost mt-6">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
