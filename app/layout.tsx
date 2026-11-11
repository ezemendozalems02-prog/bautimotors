import type { Metadata, Viewport } from 'next'
import { Archivo, Manrope, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Preloader } from '@/components/brand/preloader'
import { MotionProvider } from '@/components/motion/motion-provider'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const description =
  'Una nueva forma de encontrar el vehículo que estás buscando. Calidad, confianza y una experiencia a otro nivel.'

export const metadata: Metadata = {
  title: {
    default: 'Ghanima Motors | Tu próximo auto comienza acá',
    template: '%s | Ghanima Motors',
  },
  description,
  keywords: ['Ghanima Motors', 'concesionaria', 'autos usados', 'BMW', 'Mercedes-Benz', 'Audi', 'Jeep', 'vehículos seleccionados'],
  authors: [{ name: 'Ghanima Motors' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Ghanima Motors | Tu próximo auto comienza acá',
    description,
    type: 'website',
    locale: 'es_AR',
    siteName: 'Ghanima Motors',
    images: ['/images/og.jpg'],
  },
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Corre antes del primer pintado para que el preloader no parpadee en visitas repetidas.
const introScript = `try{var d=document.documentElement;d.dataset.intro=sessionStorage.getItem('bm-intro')?'done':'playing'}catch(e){document.documentElement.dataset.intro='done'}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.preloader{display:none}`}</style>
        </noscript>
      </head>
      <body className={`${archivo.variable} ${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <MotionProvider>
          <Preloader />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
