'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bike, Briefcase, Check, Gauge, HelpCircle, Luggage, MessageCircle, Mountain, Package, RotateCcw, Sparkles, Wallet, X } from 'lucide-react'
import { MotoCard } from '@/components/moto/moto-card'
import { ease } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'
import { findMotos, type BudgetRange, type CcRange, type FinderAnswers } from '@/lib/finder'
import { motos, type MotoCondition, type MotoUse } from '@/lib/motos'
import { messages, whatsappUrl } from '@/lib/whatsapp'

interface Question {
  key: keyof FinderAnswers
  title: string
  options: { label: string; value: FinderAnswers[keyof FinderAnswers]; icon: typeof Bike }[]
}

const questions: Question[] = [
  {
    key: 'use',
    title: '¿Para qué necesitás la moto?',
    options: [
      { label: 'Trabajo', value: 'Trabajo' as MotoUse, icon: Briefcase },
      { label: 'Uso diario', value: 'Uso diario' as MotoUse, icon: Bike },
      { label: 'Reparto', value: 'Reparto' as MotoUse, icon: Package },
      { label: 'Viajes', value: 'Viajes' as MotoUse, icon: Luggage },
      { label: 'Recreación', value: 'Recreación' as MotoUse, icon: Mountain },
    ],
  },
  {
    key: 'cc',
    title: '¿Qué cilindrada te interesa?',
    options: [
      { label: '110 cc', value: '110' as CcRange, icon: Gauge },
      { label: '125–150 cc', value: '125-150' as CcRange, icon: Gauge },
      { label: '200–250 cc', value: '200-250' as CcRange, icon: Gauge },
      { label: 'Más de 250 cc', value: '250+' as CcRange, icon: Gauge },
      { label: 'No estoy seguro', value: 'any' as CcRange, icon: HelpCircle },
    ],
  },
  {
    key: 'budget',
    title: '¿Qué presupuesto manejás?',
    options: [
      { label: 'Hasta $2.000.000', value: 'hasta-2m' as BudgetRange, icon: Wallet },
      { label: '$2.000.000 a $3.000.000', value: '2m-3m' as BudgetRange, icon: Wallet },
      { label: '$3.000.000 a $6.500.000', value: '3m-6m' as BudgetRange, icon: Wallet },
      { label: 'Más de $6.500.000', value: 'mas-6m' as BudgetRange, icon: Wallet },
      { label: 'En dólares', value: 'usd' as BudgetRange, icon: Wallet },
      { label: 'Prefiero no decirlo', value: 'any' as BudgetRange, icon: HelpCircle },
    ],
  },
  {
    key: 'condition',
    title: '¿Buscás una moto 0 km o usada?',
    options: [
      { label: '0 km', value: '0 km' as MotoCondition, icon: Sparkles },
      { label: 'Usada', value: 'Usada' as MotoCondition, icon: Bike },
      { label: 'Me da igual', value: 'any', icon: HelpCircle },
    ],
  },
  {
    key: 'financing',
    title: '¿Querés consultar financiación?',
    options: [
      { label: 'Sí, quiero consultar', value: true, icon: Check },
      { label: 'No, por ahora no', value: false, icon: X },
    ],
  },
]

const emptyAnswers: FinderAnswers = { use: null, cc: null, budget: null, condition: null, financing: null }

export function Finder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<FinderAnswers>(emptyAnswers)
  const finished = step >= questions.length

  const results = useMemo(() => findMotos(motos, answers), [answers])
  const allMatches = results.exact.length > 0 ? results.exact : results.close
  const matches = allMatches.slice(0, 6)
  const question = questions[step]

  const choose = (value: Question['options'][number]['value']) => {
    setAnswers((current) => ({ ...current, [question.key]: value }))
    setStep(step + 1)
  }

  const restart = () => {
    setAnswers(emptyAnswers)
    setStep(0)
  }

  const summary = questions
    .slice(0, 4)
    .map((item) => item.options.find((option) => option.value === answers[item.key])?.label)
    .filter(Boolean)
    .join(', ')

  const whatsappHref = whatsappUrl(matches.length > 0 ? messages.finder(matches.map((item) => item.moto.name)) : messages.finderEmpty(summary))

  return (
    <section id="encontra-tu-moto" className="section relative overflow-hidden bg-[#EAF2FF]">
      <div className="shell">
        <SectionHeading label="Encontrá tu moto ideal" lines={['No sabés qué', 'moto elegir.', 'Te ayudamos.']} />

        <div className="mt-10 lg:mt-14">
          <div className="flex gap-1.5" role="progressbar" aria-label="Progreso del buscador" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={Math.min(step, questions.length)}>
            {questions.map((item, index) => (
              <span key={item.key} className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#CFE0FF]">
                <motion.span className="absolute inset-0 origin-left bg-primary" initial={false} animate={{ scaleX: index < step ? 1 : 0 }} transition={{ duration: 0.5, ease }} />
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.32, ease }} className="mt-7">
              {!finished ? (
                <>
                  <p className="eyebrow text-primary">
                    Pregunta {step + 1} de {questions.length}
                  </p>
                  <h3 className="font-display mt-1.5 text-2xl font-bold tracking-tight md:text-3xl">{question.title}</h3>
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {question.options.map((option) => (
                      <button key={option.label} type="button" aria-pressed={answers[question.key] === option.value} onClick={() => choose(option.value)} className="choice lg:min-h-28 lg:flex-col lg:items-start lg:justify-between">
                        <option.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="link-line mt-4">
                      <ArrowLeft />
                      Volver
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {results.exact.length > 0 ? 'Estas motos coinciden con lo que buscás' : matches.length > 0 ? 'No hay una coincidencia exacta. Esto es lo más cercano' : 'Hoy no tenemos una moto con esas características'}
                  </h3>
                  {matches.length === 0 && <p className="mt-2 max-w-xl text-[#5A6270]">Contanos qué buscás por WhatsApp y te avisamos qué podemos ofrecerte.</p>}

                  {matches.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {matches.map((item, index) => (
                        <motion.div key={item.moto.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1, ease }}>
                          <MotoCard moto={item.moto} />
                          {item.missed.length > 0 && <p className="mt-2 text-xs text-[#5A6270]">No coincide en: {item.missed.join(', ')}.</p>}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <MessageCircle />
                      Consultar por WhatsApp
                    </a>
                    {answers.financing && (
                      <Link href="/financiacion#simulador" className="btn btn-outline">
                        Ver financiación
                        <ArrowRight />
                      </Link>
                    )}
                    <button type="button" onClick={restart} className="btn btn-outline">
                      <RotateCcw />
                      Empezar de nuevo
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
