import type { Metadata, Viewport } from 'next'
import { Manrope, Sora, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Preloader } from '@/components/brand/preloader'
import { MotionProvider } from '@/components/motion/motion-provider'
import { dealerSchema, JsonLd } from '@/components/seo/json-ld'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { site } from '@/lib/site'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
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

const defaultTitle = 'Tu Moto Ya | Motos 0 km y usadas con consulta de financiación en Tortuguitas'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: '%s | Tu Moto Ya',
  },
  description: site.description,
  keywords: ['motos financiadas', 'motos con DNI', 'financiar moto Buenos Aires', 'comprar moto Tortuguitas', 'motos 0 km', 'motos usadas', 'agencia de motos', 'motos zona norte', 'financiación de motocicletas'],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: defaultTitle,
    description: site.description,
    type: 'website',
    locale: 'es_AR',
    siteName: site.name,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: site.fullClaim }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#080A0E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Corre antes del primer pintado para que el preloader no parpadee en visitas repetidas.
const introScript = `try{var d=document.documentElement;d.dataset.intro=sessionStorage.getItem('tm-intro')?'done':'playing'}catch(e){document.documentElement.dataset.intro='done'}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.preloader{display:none}`}</style>
        </noscript>
      </head>
      <body className={`${sora.variable} ${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <JsonLd data={dealerSchema()} />
        <MotionProvider>
          <Preloader />
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
