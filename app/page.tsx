import { WhatsAppButton } from '@/components/whatsapp-button'
import { Hero } from '@/components/sections/hero'
import { FeaturedVehicles } from '@/components/sections/featured-vehicles'
import { About } from '@/components/sections/about'
import { WhyUs } from '@/components/sections/why-us'
import { NewArrivals } from '@/components/sections/new-arrivals'
import { ServicesPreview } from '@/components/sections/services-preview'
import { Faq } from '@/components/sections/faq'
import { ContactClosing } from '@/components/sections/contact-closing'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedVehicles />
      <About />
      <WhyUs />
      <NewArrivals />
      <ServicesPreview />
      <Faq />
      <ContactClosing />
      <WhatsAppButton hideAtTop />
    </main>
  )
}
