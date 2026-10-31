'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { isValidPhone } from '@/components/finance/purchase-flow'
import { messages, whatsappUrl } from '@/lib/whatsapp'

/**
 * El sitio no tiene backend de mensajes: el formulario arma una consulta y la
 * abre en WhatsApp, donde la persona la envía. No se guarda ningún dato.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', subject: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const errors = {
    name: values.name.trim().length < 2 ? 'Ingresá tu nombre.' : null,
    phone: !isValidPhone(values.phone) ? 'Ingresá un teléfono válido, con característica.' : null,
    message: values.message.trim().length < 5 ? 'Contanos tu consulta.' : null,
    consent: !consent ? 'Necesitamos tu autorización para continuar.' : null,
  }
  const valid = Object.values(errors).every((error) => error === null)

  const update = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues({ ...values, [key]: event.target.value })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!valid) {
      setShowErrors(true)
      return
    }
    window.open(whatsappUrl(messages.contact({ name: values.name.trim(), phone: values.phone.trim(), subject: values.subject.trim(), message: values.message.trim() })), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="contact-name">Nombre</label>
        <input id="contact-name" autoComplete="name" value={values.name} onChange={update('name')} aria-invalid={(showErrors && !!errors.name) || undefined} />
        {showErrors && errors.name && <p className="field-error">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="contact-phone">Teléfono</label>
        <input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="11 2345-6789" value={values.phone} onChange={update('phone')} aria-invalid={(showErrors && !!errors.phone) || undefined} />
        {showErrors && errors.phone && <p className="field-error">{errors.phone}</p>}
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="contact-subject">Asunto (opcional)</label>
        <input id="contact-subject" value={values.subject} onChange={update('subject')} />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="contact-message">Consulta</label>
        <textarea id="contact-message" rows={4} maxLength={800} value={values.message} onChange={update('message')} aria-invalid={(showErrors && !!errors.message) || undefined} />
        {showErrors && errors.message && <p className="field-error">{errors.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-[#20242B]">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#1769E8]" />
          <span>
            Autorizo a Tu Moto Ya a usar estos datos para responder mi consulta.{' '}
            <Link href="/privacidad" className="font-semibold text-primary underline underline-offset-2">
              Ver privacidad
            </Link>
          </span>
        </label>
        {showErrors && errors.consent && <p className="field-error">{errors.consent}</p>}
      </div>
      <button type="submit" className="btn btn-primary sm:col-span-2">
        <MessageCircle />
        Enviar por WhatsApp
      </button>
      <p className="notice sm:col-span-2">Tu consulta se abre en WhatsApp para que la envíes vos. Esta web no guarda tus datos. No incluyas número de DNI, fotos de documentos ni datos bancarios.</p>
    </form>
  )
}
