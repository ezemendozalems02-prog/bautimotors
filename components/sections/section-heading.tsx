import { DrawLine, MaskedLines, Reveal } from '@/components/motion/primitives'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  lines: string[]
  children?: React.ReactNode
  className?: string
  as?: 'h1' | 'h2'
  size?: 'lg' | 'xl'
  /** `dark` para fondos negros o azules. */
  tone?: 'dark' | 'light'
}

/** Encabezado común: etiqueta técnica y título enmascarado. */
export function SectionHeading({ label, lines, children, className, as: Tag = 'h2', size = 'lg', tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <DrawLine className={cn('w-10', dark ? 'bg-[#3985FF]' : 'bg-primary')} />
        <span className={cn('eyebrow', dark ? 'text-white/70' : 'text-primary')}>{label}</span>
      </div>
      <Tag className={cn('display mt-5', dark ? 'text-white' : 'text-[#080A0E]', size === 'xl' ? 'display-xl' : 'display-lg')}>
        <MaskedLines inView lines={lines} />
      </Tag>
      {children && (
        <Reveal delay={0.15}>
          <p className={cn('mt-5 max-w-2xl text-base leading-relaxed md:text-lg', dark ? 'text-white/75' : 'text-[#5A6270]')}>{children}</p>
        </Reveal>
      )}
    </div>
  )
}
