import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/page-hero'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacidad',
  description: 'Cómo usa Tu Moto Ya los datos de contacto que compartís en esta web.',
  alternates: { canonical: '/privacidad' },
}

const sections = [
  {
    title: 'Qué datos pedimos',
    text: 'Solo datos comerciales de contacto: nombre, teléfono, moto de interés, preferencia de compra y los comentarios que quieras agregar.',
  },
  {
    title: 'Qué nunca pedimos en esta web',
    text: 'Número de DNI, fotos de documentos, claves bancarias ni información financiera sensible. Si una entidad requiere documentación, te indicamos el canal seguro y autorizado para presentarla.',
  },
  {
    title: 'Para qué se usan',
    text: `Para responder tu consulta comercial. Esta web no guarda los datos de los formularios: los ordena en un mensaje que se abre en WhatsApp, y solo llegan a ${site.name} si vos lo enviás.`,
  },
  {
    title: 'Consultas crediticias',
    text: 'Esta web no realiza consultas crediticias ni evalúa ni aprueba créditos. Las simulaciones son orientativas y se calculan en tu navegador.',
  },
  {
    title: 'WhatsApp y medición',
    text: 'Al continuar por WhatsApp se aplican las condiciones de ese servicio. El sitio usa una medición de visitas agregada para entender cómo se usa.',
  },
  {
    title: 'Tus derechos',
    text: `Podés pedir acceder, corregir o eliminar tus datos escribiendo al ${site.phoneDisplay}.`,
  },
]

export default function PrivacidadPage() {
  return (
    <main>
      <PageHero label="Tus datos" lines={['Privacidad']} />
      <section className="section bg-white">
        <div className="shell max-w-3xl">
          <div className="grid gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold tracking-tight">{section.title}</h2>
                <p className="mt-2 leading-relaxed text-[#5A6270]">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
