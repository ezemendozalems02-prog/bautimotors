/**
 * Preguntas frecuentes: único archivo a editar.
 *
 * Hoy las condiciones comerciales no están confirmadas, por eso cada respuesta
 * explica cómo funciona sin prometer nada. Cuando la agencia confirme un dato,
 * se reemplaza el texto acá y se actualiza en todo el sitio.
 * `home: true` la muestra también en la página de inicio.
 */
export interface FaqItem {
  question: string
  answer: string
  home?: boolean
}

export const faqs: FaqItem[] = [
  {
    question: '¿Puedo sacar una moto solamente con mi DNI?',
    answer:
      'Con tu DNI podés empezar a consultar. Si con eso alcanza o hacen falta otros requisitos depende de la alternativa de financiación y de la evaluación de la entidad. Escribinos y te contamos qué opciones hay hoy para tu caso.',
    home: true,
  },
  {
    question: '¿Necesito recibo de sueldo?',
    answer:
      'Depende de cada alternativa. Algunas opciones pueden pedir comprobantes de ingresos y otras no. El equipo comercial te confirma los requisitos vigentes antes de que avances.',
    home: true,
  },
  {
    question: '¿Necesito tener anticipo?',
    answer:
      'Depende del plan y de la moto. Podés probar distintos anticipos en la calculadora para tener una idea, y consultarnos qué se necesita en cada caso.',
    home: true,
  },
  {
    question: '¿Cómo funciona la financiación?',
    answer:
      'Elegís la moto, nos consultás y te informamos las alternativas disponibles con sus condiciones. Si avanzás, la entidad que corresponda hace la evaluación. Recién con su confirmación se puede coordinar la operación.',
    home: true,
  },
  {
    question: '¿Todas las motos se pueden financiar?',
    answer:
      'No necesariamente. Depende del modelo, de la condición de la unidad y de cada plan. Consultanos por la moto que te gusta y te decimos qué opciones tiene.',
  },
  {
    question: '¿Cómo sé si puedo acceder a un crédito?',
    answer:
      'Solo la entidad que otorga la financiación puede decirlo, después de su evaluación. Esta web no aprueba créditos ni hace consultas crediticias: la calculadora y el simulador solo sirven para orientarte.',
  },
  {
    question: '¿Cuánto tarda la evaluación?',
    answer:
      'Depende de la entidad y de la alternativa elegida. Cuando nos consultes te indicamos los plazos vigentes para tu caso.',
  },
  {
    question: '¿Puedo elegir la cantidad de cuotas?',
    answer:
      'Las cuotas disponibles dependen de cada plan. Las opciones de la calculadora son orientativas: te confirmamos cuáles existen hoy para la moto que elijas.',
  },
  {
    question: '¿Qué pasa si no tengo historial crediticio?',
    answer:
      'Cada entidad evalúa de forma distinta. Contanos tu situación y te decimos qué alternativas se pueden explorar, sin prometerte un resultado.',
  },
  {
    question: '¿Puedo financiar una moto usada?',
    answer:
      'Depende de la unidad y de la alternativa disponible. Consultanos por la moto específica y te informamos.',
  },
  {
    question: '¿Qué documentación necesito?',
    answer:
      'Para empezar a consultar no necesitás mandarnos nada por esta web: nunca te vamos a pedir fotos de tu DNI ni datos bancarios en un formulario. Si una entidad requiere documentación, te indicamos el canal seguro y autorizado para presentarla.',
    home: true,
  },
  {
    question: '¿La cuota es fija?',
    answer:
      'Depende del tipo de tasa de cada plan. Antes de avanzar te informamos si es fija o variable, junto con el resto de las condiciones.',
  },
  {
    question: '¿Hay gastos adicionales?',
    answer:
      'Puede haberlos, por ejemplo por otorgamiento, patentamiento o transferencia, según cada operación. Pedí siempre el detalle completo: te lo informamos antes de que decidas.',
  },
  {
    question: '¿Cómo puedo consultar por WhatsApp?',
    answer:
      'Tocá cualquier botón de WhatsApp de la web. Se abre un mensaje ya escrito con la moto o el escenario que estabas mirando, lo revisás y lo mandás vos.',
  },
]

export const homeFaqs = faqs.filter((item) => item.home)
