'use client'

import { Award, CheckCircle, Phone, Shield, Sparkles, Users } from 'lucide-react'
import { Reveal } from '@/components/motion/primitives'
import { SectionHeading } from '@/components/sections/section-heading'

const features = [
  { icon: Shield, title: 'Vehículos seleccionados', description: 'Cada unidad pasa por un proceso de selección antes de entrar al catálogo.' },
  { icon: Users, title: 'Atención personalizada', description: 'Te acompañamos en toda la compra con asesoramiento profesional.' },
  { icon: CheckCircle, title: 'Publicaciones claras', description: 'Información detallada y transparente. Sin sorpresas, sin letra chica.' },
  { icon: Sparkles, title: 'Experiencia superior', description: 'Desde el primer contacto hasta la entrega, cada paso está cuidado.' },
  { icon: Award, title: 'Unidades de alta gama', description: 'BMW, Mercedes-Benz, Audi, Jaguar y más marcas en stock.' },
  { icon: Phone, title: 'Asesoramiento completo', description: 'Te guiamos en la evaluación, la financiación y la documentación.' },
]

export function WhyUs() {
  return (
    <section className="bg-[#080808] py-20 lg:py-32">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <SectionHeading
          index="03"
          label="Nuestra diferencia"
          lines={['Por qué', 'elegirnos']}
          className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start"
        />
        <ol className="lg:col-span-7">
          {features.map((feature, index) => (
            <li key={feature.title}>
              <Reveal delay={0.04} y={18}>
                <div className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-t border-white/10 py-6 transition-colors duration-500 hover:border-primary md:gap-6 md:py-7">
                  <span className="tabular pt-1 text-xs text-[#8d8d8d] transition-colors duration-300 group-hover:text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white md:text-xl" style={{ fontStretch: '108%' }}>
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-[0.95rem] leading-relaxed text-[#B8B8B8]">{feature.description}</p>
                  </div>
                  <feature.icon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 text-[#6e6e6e] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
