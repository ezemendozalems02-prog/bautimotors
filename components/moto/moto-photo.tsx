'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Camera } from 'lucide-react'
import type { Moto } from '@/lib/motos'
import { cn } from '@/lib/utils'

interface MotoPhotoProps {
  moto: Moto
  index?: number
  sizes: string
  priority?: boolean
  className?: string
  imageClassName?: string
  /** Miniatura: la placa va sin texto. */
  plain?: boolean
}

/**
 * Foto de una unidad. Si el archivo no existe se muestra una placa de la marca
 * con el modelo, nunca la foto de otra moto. Al subir el archivo a /public/motos
 * la foto real aparece sola, sin tocar código.
 */
export function MotoPhoto({ moto, index = 0, sizes, priority, className, imageClassName, plain }: MotoPhotoProps) {
  const src = moto.images[index]
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>(src ? 'loading' : 'missing')

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-[#0B1220]', className)}>
      {status !== 'ready' && (
        <div className="blueprint absolute inset-0 flex flex-col justify-end overflow-hidden p-[6%] [container-type:inline-size]">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_70%_at_75%_20%,rgb(23_105_232/0.45),transparent)]" />
          {status === 'missing' && !plain && (
            <div className="relative">
              <span aria-hidden="true" className="display block whitespace-nowrap text-white/90" style={{ fontSize: `min(16cqw, ${(120 / moto.model.length).toFixed(1)}cqw)` }}>
                {moto.model}
              </span>
              <span className="eyebrow mt-2 flex items-center gap-2 text-white/70">
                <Camera className="h-3.5 w-3.5 text-[#3985FF]" />
                Pedí fotos por WhatsApp
              </span>
            </div>
          )}
        </div>
      )}
      {src && status !== 'missing' && (
        <Image
          src={src}
          alt={moto.year ? `${moto.name} ${moto.year}` : moto.name}
          fill
          sizes={sizes}
          priority={priority}
          // Con SSR la imagen puede terminar de cargar antes de hidratar: onLoad no llega a dispararse.
          ref={(node) => {
            if (node?.complete && node.naturalWidth > 0) setStatus('ready')
            else if (node?.complete && node.naturalWidth === 0) setStatus('missing')
          }}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('missing')}
          className={cn('object-cover transition-opacity duration-700', status === 'ready' ? 'opacity-100' : 'opacity-0', imageClassName)}
        />
      )}
      {moto.illustrativeImages && status === 'ready' && (
        <span className="absolute bottom-2 left-2 rounded bg-[#080A0E]/70 px-2 py-1 text-[0.65rem] font-semibold text-white">
          Imagen ilustrativa
        </span>
      )}
    </div>
  )
}
