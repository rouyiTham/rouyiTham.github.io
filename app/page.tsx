import { ParallaxProvider } from "@/components/parallax-provider"
import Hero from "@/components/hero"
import TechnologiesSection from "@/components/clients-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import Navbar from "@/components/navbar"
import ProjectsSection from "@/components/projects-section"
import BackToTop from "@/components/back-to-top"
import ToyShowcase from "@/components/toy-showcase"
import ScrollSection, { ParallaxLayer, DepthCard } from "@/components/scroll-section"
import MouseTrail from "@/components/mouse-trail"

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white">
        <div className="max-w-[100rem] mx-auto">
          {/* Mouse trail effect for interactive cursor */}
          <MouseTrail />
          
          <Navbar />
          <main className="overflow-hidden">
            {/* Hero section - White Background */}
            <div className="w-full mx-auto relative mb-0 bg-white-section">
              <Hero />
              {/* Fancy diagonal divider with decoration */}
              <div className="section-divider section-divider--white-to-beige section-divider--diagonal section-divider--decorated"></div>
            </div>

            {/* Projects section - Beige Background */}
            <ScrollSection type="depth" className="pt-12 pb-16 bg-beige-section relative w-full mx-auto px-6 sm:px-8" id="projects">
              <ProjectsSection />
            </ScrollSection>

            {/* Waves pattern divider with floating particles */}
            <div className="section-divider section-divider--beige-to-white section-divider--waves"></div>

            {/* Services section (Technical Expertise) - White Background */}
            <ScrollSection type="zoom" className="pt-12 pb-16 bg-white-section relative w-full mx-auto px-6 sm:px-8" id="services">
              <ServicesSection />
            </ScrollSection>

            {/* Split triangle divider with decoration */}
            <div className="section-divider section-divider--white-to-beige section-divider--split section-divider--decorated"></div>

            {/* Toy Showcase section - Beige Background */}
            <ScrollSection type="cards" className="pt-12 pb-16 bg-beige-section relative w-full mx-auto px-6 sm:px-8" id="design">
              <ToyShowcase />
            </ScrollSection>

            {/* Interlaced pattern divider */}
            <div className="section-divider section-divider--beige-to-white section-divider--interlaced"></div>

            {/* Combine Technologies section with Contact section to remove gap - White Background */}
            <ScrollSection type="slide" className="pt-12 pb-16 bg-white-section relative w-full mx-auto px-6 sm:px-8" id="contact">
              <div className="mb-12">
                <TechnologiesSection />
              </div>
              <ContactSection />
            </ScrollSection>
          </main>
          <BackToTop />
        </div>
      </div>
    </ParallaxProvider>
  )
}
