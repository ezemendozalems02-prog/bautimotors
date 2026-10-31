import { cn } from '@/lib/utils'

interface MarkProps {
  className?: string
  /** `light` para fondos oscuros, `dark` para fondos claros. */
  tone?: 'light' | 'dark'
}

/**
 * Isotipo y logotipo PROVISORIOS: no había un logo oficial en el proyecto.
 * Al recibirlo, este archivo y /public/icon.svg son lo único a reemplazar.
 */
export function LogoMark({ className, tone = 'light' }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={cn('h-8 w-8', className)} aria-hidden="true">
      <polygon points="13,14 53,14 50,25 36,25 29,52 17,52 24,25 10,25" fill={tone === 'light' ? '#FFFFFF' : '#080A0E'} />
      <polygon points="38,29 50,29 46,41 34,41" fill={tone === 'light' ? '#3985FF' : '#1769E8'} />
    </svg>
  )
}

interface LogoProps extends MarkProps {
  /** `compact` muestra solo el isotipo. */
  variant?: 'full' | 'compact'
}

export function Logo({ className, tone = 'light', variant = 'full' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-[0.35em]', className)} role="img" aria-label="Tu Moto Ya">
      <LogoMark tone={tone} className="h-[1.9em] w-[1.9em] shrink-0" />
      {variant === 'full' && (
        <span
          aria-hidden="true"
          className={cn(
            'font-display text-[1.2em] leading-none font-extrabold tracking-[-0.03em] italic [word-spacing:0.12em]',
            tone === 'light' ? 'text-white' : 'text-[#080A0E]',
          )}
        >
          TU MOTO <span className={tone === 'light' ? 'text-[#3985FF]' : 'text-[#1769E8]'}>YA</span>
        </span>
      )}
    </span>
  )
}
