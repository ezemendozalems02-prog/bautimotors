'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { SectionHeading } from '@/components/sections/section-heading'
import { type FaqItem } from '@/lib/faq'
import { cn } from '@/lib/utils'

/** Las respuestas quedan en el HTML aunque estén cerradas, para que se puedan indexar. */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0)

  return (
    <ul className="border-t border-[#E2E6EC]">
      {items.map((item, index) => {
        const isOpen = open === index
        const id = `faq-${index}`
        return (
          <li key={item.question} className="border-b border-[#E2E6EC]">
            <h3>
              <button type="button" id={`${id}-q`} aria-expanded={isOpen} aria-controls={`${id}-a`} onClick={() => setOpen(isOpen ? -1 : index)} className="group flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left">
                <span className={cn('font-display text-base font-semibold tracking-tight transition-colors md:text-lg', isOpen ? 'text-primary' : 'group-hover:text-primary')}>{item.question}</span>
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300', isOpen ? 'rotate-45 bg-primary text-white' : 'bg-[#EAF2FF] text-primary')}>
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!isOpen} className={cn('grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(.22,1,.36,1)]', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 leading-relaxed text-[#5A6270]">{item.answer}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="section bg-white">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHeading label="Financiación" lines={['Preguntas', 'frecuentes']}>
            Las condiciones dependen de cada alternativa. Si no encontrás tu respuesta, escribinos.
          </SectionHeading>
          <Link href="/preguntas-frecuentes" className="link-line mt-5">
            Ver todas
            <ArrowRight />
          </Link>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  )
}
