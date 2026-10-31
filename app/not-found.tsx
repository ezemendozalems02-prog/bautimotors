import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center bg-[#080A0E] py-32 text-white">
      <div className="shell">
        <p className="eyebrow text-[#3985FF]">Error 404</p>
        <h1 className="display display-xl mt-4">Te fuiste de la ruta.</h1>
        <p className="mt-5 max-w-md text-lg text-white/75">Esta página no existe o la moto ya no está publicada.</p>
        <div className="mt-8 grid gap-2 sm:flex">
          <Link href="/motos" className="btn btn-primary">
            Ver las motos
            <ArrowRight />
          </Link>
          <Link href="/" className="btn btn-ghost">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
