import type { Metadata } from 'next'
import { SellForm } from '@/components/forms/sell-form'
import { PageHero } from '@/components/sections/page-hero'

export const metadata: Metadata = {
  title: 'Consultá por tu moto usada',
  description: 'Contanos qué moto tenés y consultá con Tu Moto Ya si es posible venderla o entregarla.',
  alternates: { canonical: '/vende-tu-moto' },
}

export default function VendeTuMotoPage() {
  return (
    <main>
      <PageHero label="Tu moto usada" lines={['¿Tenés una moto', 'usada?']}>
        Contanos cuál es y te respondemos si es posible venderla o entregarla, y en qué condiciones.
      </PageHero>
      <section className="section bg-white">
        <div className="shell max-w-3xl">
          <SellForm />
        </div>
      </section>
    </main>
  )
}
