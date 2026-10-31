'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Camera } from 'lucide-react'
import type { Vehicle } from '@/lib/vehicles'
import { cn } from '@/lib/utils'

interface VehiclePhotoProps {
  vehicle: Vehicle
  index?: number
  sizes: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

/**
 * Foto de una unidad. Si el archivo todavía no existe se muestra una placa de la
 * marca con el modelo: nunca la foto de otro vehículo. Al subir el archivo a
 * /public/vehicles la foto real aparece sola, sin tocar código.
 */
export function VehiclePhoto({ vehicle, index = 0, sizes, priority, className, imageClassName }: VehiclePhotoProps) {
  const src = vehicle.images[index]
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>(src ? 'loading' : 'missing')

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-[#111111]', className)}>
      {status !== 'ready' && (
        <div className="tech-grid absolute inset-0 flex flex-col justify-center overflow-hidden px-[6%] [container-type:inline-size]">
          {status === 'missing' && (
            <>
              <span
                aria-hidden="true"
                className="display text-outline whitespace-nowrap"
                // El tamaño se ajusta al largo del modelo para que nunca quede cortado.
                style={{ fontSize: `min(24cqw, ${(112 / vehicle.model.length).toFixed(1)}cqw)` }}
              >
                {vehicle.model}
              </span>
              <span className="eyebrow mt-3 flex items-center gap-2 text-[#B8B8B8]">
                <Camera className="h-3.5 w-3.5 text-primary" />
                Fotos a pedido
              </span>
            </>
          )}
        </div>
      )}
      {src && status !== 'missing' && (
        <Image
          src={src}
          alt={`${vehicle.name} ${vehicle.year}`}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('missing')}
          className={cn(
            'object-cover transition-opacity duration-700',
            status === 'ready' ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}
    </div>
  )
}
