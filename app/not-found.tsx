import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="tech-grid flex min-h-[80svh] items-center bg-[#080808] pt-24">
      <div className="shell">
        <p className="tabular text-sm text-primary">404</p>
        <h1 className="display display-lg mt-4 max-w-[14em] text-white">Esta ruta no lleva a ningún lado.</h1>
        <p className="mt-4 text-[#B8B8B8]">La página que buscás no existe o cambió de lugar.</p>
        <Link href="/catalogo" className="btn btn-primary mt-8">
          Explorar vehículos
          <ArrowRight />
        </Link>
      </div>
    </main>
  )
}
