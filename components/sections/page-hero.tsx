'use client'

import { SectionHeading } from '@/components/sections/section-heading'

interface PageHeroProps {
  label: string
  lines: string[]
  children?: React.ReactNode
}

/** Apertura común de las páginas internas. */
export function PageHero({ label, lines, children }: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden bg-[#090909] pt-32 pb-12 lg:pt-44 lg:pb-16">
      <div aria-hidden="true" className="tech-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-2/3 bg-[radial-gradient(50%_60%_at_85%_20%,rgb(227_38_46/0.06),transparent)]"
      />
      <div className="shell relative">
        <SectionHeading as="h1" size="xl" label={label} lines={lines}>
          {children}
        </SectionHeading>
      </div>
    </section>
  )
}
