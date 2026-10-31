import { SectionHeading } from '@/components/sections/section-heading'

interface PageHeroProps {
  label: string
  lines: string[]
  children?: React.ReactNode
}

/** Apertura común de las páginas internas: siempre oscura, debajo del navbar. */
export function PageHero({ label, lines, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#080A0E] pt-32 pb-12 lg:pt-44 lg:pb-20">
      <div aria-hidden="true" className="blueprint absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent)]" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-2/3 bg-[radial-gradient(55%_65%_at_80%_15%,rgb(23_105_232/0.38),transparent)]"
      />
      <div className="shell relative">
        <SectionHeading as="h1" size="xl" tone="dark" label={label} lines={lines}>
          {children}
        </SectionHeading>
      </div>
    </section>
  )
}
