import { cn } from '@/lib/utils'

interface MarkProps {
  className?: string
  /** `light` para fondos oscuros, `dark` para fondos claros. */
  tone?: 'light' | 'dark'
}

/** Isotipo: una B de hojas inclinadas hacia adelante, cortada como una pieza mecanizada. */
export function LogoMark({ className, tone = 'light' }: MarkProps) {
  const fill = tone === 'light' ? '#FFFFFF' : '#080808'
  return (
    <svg viewBox="0 0 64 64" className={cn('h-8 w-8', className)} aria-hidden="true">
      <polygon points="13,6 24,6 13,58 2,58" fill={fill} />
      <polygon points="29,6 50,6 59,18 51,30 24,30" fill={fill} />
      <polygon points="23,34 53,34 62,46 52,58 18,58" fill="#FFD400" />
    </svg>
  )
}

interface LogoProps extends MarkProps {
  /** `compact` muestra solo el isotipo. */
  variant?: 'full' | 'compact'
}

export function Logo({ className, tone = 'light', variant = 'full' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)} aria-label="Bauti Motors">
      <LogoMark tone={tone} className="h-[1.9em] w-[1.9em] shrink-0" />
      {variant === 'full' && (
        <span className="flex flex-col" aria-hidden="true">
          <span
            className={cn(
              'font-display text-[1.28em] leading-none font-extrabold tracking-[0.015em]',
              tone === 'light' ? 'text-white' : 'text-[#080808]',
            )}
            style={{ fontStretch: '125%' }}
          >
            BAUTI
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
