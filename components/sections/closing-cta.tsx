import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { messages, whatsappUrl } from '@/lib/whatsapp'

/** Cierre azul de gran impacto. */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#1769E8] py-16 text-white lg:py-24">
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <Reveal className="shell relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="display display-xl max-w-4xl">Movete hacia lo que querés.</h2>
        <div className="grid shrink-0 gap-2 sm:grid-flow-col">
          <Link href="/financiacion#simulador" className="btn btn-white">
            Quiero mi moto
            <ArrowRight />
          </Link>
          <a href={whatsappUrl(messages.financing())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <MessageCircle />
            Escribinos
          </a>
        </div>
      </Reveal>
    </section>
  )
}
