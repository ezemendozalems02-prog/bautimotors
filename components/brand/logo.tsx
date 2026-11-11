import { cn } from '@/lib/utils'

interface MarkProps {
  className?: string
  /** `light` para fondos oscuros, `dark` para fondos claros. */
  tone?: 'light' | 'dark'
}

/** Isotipo de Ghanima Motors (logo original, fondo transparente). */
export function LogoMark({ className }: MarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-mark.png" alt="" width={256} height={256} className={cn('h-8 w-8 object-contain', className)} aria-hidden="true" />
  )
}

interface LogoProps extends MarkProps {
  /** `compact` muestra solo el isotipo. */
  variant?: 'full' | 'compact'
}

export function Logo({ className, tone = 'light', variant = 'full' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)} aria-label="Ghanima Motors">
      <LogoMark tone={tone} className="h-[1.9em] w-[1.9em] shrink-0" />
      {variant === 'full' && (
        <span className="flex flex-col" aria-hidden="true">
          <span
            className={cn(
              'font-display text-[1.28em] leading-none font-extrabold tracking-[0.015em]',
              tone === 'light' ? 'text-white' : 'text-[#090909]',
            )}
            style={{ fontStretch: '125%' }}
          >
            GHANIMA
          </span>
          <span
            className={cn(
              'mt-[0.32em] font-tech text-[0.56em] leading-none font-medium tracking-[0.5em]',
              tone === 'light' ? 'text-[#B8B8B8]' : 'text-[#252525]',
            )}
          >
            MOTORS
          </span>
        </span>
      )}
    </span>
  )
}
