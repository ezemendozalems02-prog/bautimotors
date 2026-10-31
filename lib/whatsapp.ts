import { formatMoney, site, type Currency } from '@/lib/site'

/** Todos los mensajes salen de acá. Nunca se abre WhatsApp sin un clic de la persona. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const messages = {
  general: () => 'Hola, quiero conocer las motos disponibles de Tu Moto Ya.',

  financing: () =>
    'Hola, quiero consultar las alternativas de financiación. Me interesa conocer los requisitos y cómo puedo comenzar con mi DNI.',

  product: (motoName: string, path?: string) =>
    `Hola, estoy interesado en la ${motoName}. Quisiera conocer su disponibilidad y las alternativas de financiación.` +
    (path ? `\n${site.url}${path}` : ''),

  financeProduct: (motoName: string, path: string) =>
    `Hola, quiero consultar las alternativas de financiación para la ${motoName}. Me interesa conocer los requisitos y cómo puedo comenzar con mi DNI.\n${site.url}${path}`,

  simulation: (input: {
    motoName: string
    currency: Currency
    price: number
    downPayment: number
    installments: number
    installment: number
    monthlyRatePercent: number
    annualRatePercent: number
    fees: number
  }) =>
    [
      `Hola, estuve utilizando la calculadora de Tu Moto Ya. Quiero consultar este escenario orientativo para la moto ${input.motoName}.`,
      '',
      `Precio: ${formatMoney(input.price, input.currency)}`,
      `Anticipo: ${formatMoney(input.downPayment, input.currency)}`,
      `Cuotas: ${input.installments}`,
      `Tasa hipotética: ${input.annualRatePercent}% anual`,
      input.fees > 0 ? `Gastos estimados: ${formatMoney(input.fees, input.currency)}` : null,
      `Cuota estimada: ${formatMoney(input.installment, input.currency)}`,
      '',
      'Sé que es una simulación y no una oferta. ¿Qué alternativas reales hay?',
    ]
      .filter((line) => line !== null)
      .join('\n'),

  plan: (planName: string, entity: string, motoName: string, installments: number) =>
    `Hola, quiero consultar el plan ${planName} (${entity}) para la ${motoName}, en ${installments} cuotas.`,

  purchaseFlow: (input: { name: string; phone: string; motoName: string; preference: string; comment: string }) =>
    [
      `Hola, soy ${input.name}. Hice la consulta en la web de Tu Moto Ya.`,
      '',
      `Moto de interés: ${input.motoName}`,
      `Cómo quiero comprar: ${input.preference}`,
      `Teléfono de contacto: ${input.phone}`,
      input.comment ? `Comentario: ${input.comment}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n'),

  finder: (motoNames: string[]) =>
    `Hola, usé el buscador de Tu Moto Ya. Me interesan estas opciones: ${motoNames.join(', ')}. ¿Me contás disponibilidad y alternativas de financiación?`,

  finderEmpty: (summary: string) =>
    `Hola, usé el buscador de Tu Moto Ya y busco una moto con estas características: ${summary}. ¿Tienen alguna opción?`,

  contact: (input: { name: string; phone: string; subject: string; message: string }) =>
    [
      `Hola, soy ${input.name}.`,
      input.subject ? `Asunto: ${input.subject}` : null,
      input.message,
      `Teléfono de contacto: ${input.phone}`,
    ]
      .filter((line) => line !== null)
      .join('\n'),

  sellMoto: (input: { name: string; phone: string; moto: string; year: string; km: string; comment: string }) =>
    [
      `Hola, soy ${input.name}. Quiero consultar por mi moto usada.`,
      `Moto: ${input.moto}`,
      `Año: ${input.year}`,
      input.km ? `Kilometraje: ${input.km}` : null,
      `Teléfono de contacto: ${input.phone}`,
      input.comment ? `Comentario: ${input.comment}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n'),
}
