'use client'

import { useState } from 'react'
import { CheckCircle, MessageCircle, Send } from 'lucide-react'
import { whatsappUrl } from '@/lib/site'

const fields = [
  { name: 'name', label: 'Nombre', placeholder: 'Tu nombre', half: true },
  { name: 'lastname', label: 'Apellido', placeholder: 'Tu apellido', half: true },
  { name: 'email', label: 'Email', placeholder: 'tu@email.com', type: 'email' },
  { name: 'phone', label: 'Teléfono', placeholder: '+54 9 11 0000-0000', type: 'tel' },
  { name: 'subject', label: 'Asunto', placeholder: 'Motivo de tu consulta' },
]

export function ContactForm() {
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
        <h3 className="display display-md mt-5 text-white">Mensaje enviado</h3>
        <p className="mt-3 text-[#B8B8B8]">
          Recibimos tu mensaje. Te responderemos a la brevedad por el medio de contacto que indicaste.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => setIsSubmitted(false)} className="btn btn-ghost">
            Enviar otro mensaje
          </button>
          <a
            href={whatsappUrl('Hola, acabo de enviar un formulario de contacto.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle />
            WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="display display-md text-white">Envianos un mensaje</h3>
      <p className="mt-2 text-sm text-[#B8B8B8]">Completá el formulario y te contactamos a la brevedad.</p>

      <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.half ? 'field' : 'field sm:col-span-2'}>
            <label htmlFor={field.name}>{field.label}</label>
            <input id={field.name} name={field.name} type={field.type ?? 'text'} placeholder={field.placeholder} required />
          </div>
        ))}
        <div className="field sm:col-span-2">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows={4} placeholder="Contanos en qué podemos ayudarte..." required />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-8 w-full">
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        <Send />
      </button>

      <p className="mt-4 text-center text-xs text-[#8d8d8d]">
        Al enviar este formulario, aceptás que nos contactemos con vos para responder tu consulta.
      </p>
    </form>
  )
}
