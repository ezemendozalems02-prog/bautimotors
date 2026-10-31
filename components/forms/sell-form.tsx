'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/site'

const fields = [
  { name: 'name', label: 'Nombre completo', placeholder: 'Tu nombre', full: true },
  { name: 'phone', label: 'Teléfono', placeholder: '+54 9 11 0000-0000', type: 'tel', full: true },
  { name: 'brand', label: 'Marca', placeholder: 'Ej: BMW' },
  { name: 'model', label: 'Modelo', placeholder: 'Ej: X3' },
  { name: 'year', label: 'Año', placeholder: 'Ej: 2022', type: 'number' },
  { name: 'km', label: 'Kilometraje', placeholder: 'Ej: 50000', type: 'number' },
]

export function SellForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-primary" />
        <h3 className="display display-md mt-5 text-white">Formulario enviado</h3>
        <p className="mt-3 text-[#B8B8B8]">
          Recibimos tu solicitud. Te contactaremos a la brevedad para coordinar la tasación de tu vehículo.
        </p>
        <a
          href={whatsappUrl('Hola, acabo de completar el formulario para vender mi auto.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-7"
        >
          <MessageCircle />
          Contactar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="display display-md text-white">Datos de tu vehículo</h3>
      <p className="mt-2 text-sm text-[#B8B8B8]">Completá el formulario y te contactamos con una propuesta.</p>

      <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6">
        {fields.map((field) => (
          <div key={field.name} className={field.full ? 'field col-span-2' : 'field'}>
            <label htmlFor={field.name}>{field.label}</label>
            <input id={field.name} name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} required />
          </div>
        ))}
        <div className="field col-span-2">
          <label htmlFor="observations">Observaciones (opcional)</label>
          <textarea
            id="observations"
            name="observations"
            rows={3}
            placeholder="Contanos más sobre tu vehículo: versión, color, estado, extras..."
          />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-8 w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        <ArrowRight />
      </button>

      <p className="mt-4 text-center text-xs text-[#8d8d8d]">
        Al enviar este formulario, aceptás que nos contactemos con vos para evaluar tu vehículo.
      </p>
    </form>
  )
}
