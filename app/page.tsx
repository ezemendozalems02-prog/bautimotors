import { ClosingCta } from '@/components/sections/closing-cta'
import { DniSection } from '@/components/sections/dni-section'
import { Experience } from '@/components/sections/experience'
import { Faq } from '@/components/sections/faq'
import { Featured } from '@/components/sections/featured'
import { Finder } from '@/components/sections/finder'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { UsedMotos } from '@/components/sections/used-motos'
import { faqSchema, JsonLd } from '@/components/seo/json-ld'
import { homeFaqs } from '@/lib/faq'
import { site } from '@/lib/site'

const strip = [site.fullClaim, 'Tu próxima moto está más cerca.', 'Elegí tu moto. Consultá cómo financiarla.', 'Encontrá una opción para vos.']

export default function HomePage() {
  return (
    <main>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <div aria-hidden="true" className="overflow-hidden bg-[#1769E8] py-3 text-white">
        <div className="marquee flex w-max">
          {[...strip, ...strip, ...strip, ...strip].map((text, index) => (
            <span key={index} className="eyebrow px-6 whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>
      <DniSection />
      <Featured />
      <HowItWorks />
      <Finder />
      <UsedMotos />
      <Faq items={homeFaqs} />
      <Experience />
      <ClosingCta />
    </main>
  )
}
