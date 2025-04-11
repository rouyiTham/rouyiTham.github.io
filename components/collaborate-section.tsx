"use client"

import { useParallax, useRevealEffect } from "./parallax-provider"

export default function CollaborateSection() {
  const textParallax = useParallax(0.05)
  const badgeParallax = useParallax(-0.08)
  const textReveal = useRevealEffect(0.2, 100)
  const badgeReveal = useRevealEffect(0.2, 300)

  return (
    <section className="py-16 md:py-24 text-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 blob-shape bg-gradient-to-r from-[hsl(var(--secondary))]/15 to-[hsl(var(--accent))]/15 blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-gentle-float" style={{ animationDuration: '15s' }}></div>
      </div>

      <div
        className="relative z-10 px-4"
        ref={textReveal.ref}
        style={textReveal.style}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight dark-brown-text">
          Collaborate with brands and agencies
          <br className="hidden sm:block" />
          to create impactful results.
        </h2>
      </div>

      <div
        className="inline-block glass-effect-strong rounded-full px-5 py-2.5 text-sm font-medium my-8 relative z-10 gradient-border-subtle animate-gentle-float"
        ref={badgeReveal.ref}
        style={{...badgeReveal.style, animationDuration: '10s'}}
      >
        <span className="relative z-10 text-[hsl(var(--foreground))]">Specialties</span>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-[20%] w-6 h-6 rounded-full bg-[hsl(var(--secondary))]/25 z-0 animate-pulse-soft"></div>
      <div className="absolute bottom-10 right-[30%] w-8 h-8 rounded-full bg-[hsl(var(--accent))]/25 z-0 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/3 left-[30%] w-4 h-4 rounded-full bg-[hsl(var(--primary))]/15 z-0 animate-pulse-soft" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-[hsl(var(--secondary))]/20 z-0 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}
