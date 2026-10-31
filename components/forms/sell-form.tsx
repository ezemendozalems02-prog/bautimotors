'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { isValidPhone } from '@/components/finance/purchase-flow'
import { messages, whatsappUrl } from '@/lib/whatsapp'

/** Arma la consulta y la abre en WhatsApp. No hay envío ni guardado en el sitio. */
export function SellForm() {
  const [values, setValues] = useState({ name: '', phone: '', moto: '', year: '', km: '', comment: '' })
  const [consent, setConsent] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const currentYear = new Date().getFullYear()
  const yearNumber = Number(values.year)
  const errors = {
    name: values.name.trim().length < 2 ? 'Ingresá tu nombre.' : null,
    phone: !isValidPhone(values.phone) ? 'Ingresá un teléfono válido, con característica.' : null,
    moto: values.moto.trim().length < 2 ? 'Indicá marca y modelo.' : null,
    year: !Number.isInteger(yearNumber) || yearNumber < 1950 || yearNumber > currentYear ? 'Ingresá un año válido.' : null,
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
    window.open(whatsappUrl(messages.sellMoto(values)), '_blank', 'noopener,noreferrer')
  }

  const fields = [
    { key: 'name', label: 'Nombre', autoComplete: 'name' },
    { key: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
    { key: 'moto', label: 'Marca y modelo' },
    { key: 'year', label: 'Año', type: 'number' },
    { key: 'km', label: 'Kilometraje (opcional)', type: 'number' },
  ] as const

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => {
        const error = field.key in errors ? errors[field.key as keyof typeof errors] : null
        return (
          <div key={field.key} className="field">
            <label htmlFor={`sell-${field.key}`}>{field.label}</label>
            <input id={`sell-${field.key}`} type={'type' in field ? field.type : 'text'} autoComplete={'autoComplete' in field ? field.autoComplete : undefined} value={values[field.key]} onChange={update(field.key)} aria-invalid={(showErrors && !!error) || undefined} />
            {showErrors && error && <p className="field-error">{error}</p>}
          </div>
        )
      })}
      <div className="field sm:col-span-2">
        <label htmlFor="sell-comment">Comentario (opcional)</label>
        <textarea id="sell-comment" rows={3} maxLength={500} value={values.comment} onChange={update('comment')} />
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
        Consultar por WhatsApp
      </button>
    </form>
  )
}
