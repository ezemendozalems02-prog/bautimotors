import { DrawLine, MaskedLines, Reveal } from '@/components/motion/primitives'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index?: string
  label: string
  lines: string[]
  children?: React.ReactNode
  className?: string
  as?: 'h1' | 'h2'
  /** `column` es para títulos dentro de una columna angosta. */
  size?: 'column' | 'lg' | 'xl'
}

/** Encabezado editorial común: índice, etiqueta, título enmascarado. */
export function SectionHeading({ index, label, lines, children, className, as: Tag = 'h2', size = 'lg' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {index && <span className="tabular text-xs text-primary">{index}</span>}
        <DrawLine className="w-10" />
        <span className="eyebrow text-[#B8B8B8]">{label}</span>
      </div>
      <Tag
        className={cn(
          'display mt-5 text-white',
          size === 'xl' && 'display-xl',
          size === 'lg' && 'display-lg',
          size === 'column' && 'text-[clamp(2rem,3.7vw,4rem)]',
        )}
      >
        <MaskedLines inView lines={lines} />
      </Tag>
      {children && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#B8B8B8] md:text-lg">{children}</p>
        </Reveal>
      )}
    </div>
  )
}
