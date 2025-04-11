"use client"

import { Code, Database, Smartphone, BrainCircuit, LineChart, Video } from "lucide-react"
import { useParallax, useRevealEffect, useTiltEffect } from "./parallax-provider"

const services = [
  {
    icon: <BrainCircuit className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Algorithm Design",
    description: "Creating efficient algorithms and data structures for complex computational problems.",
    color: "primary",
  },
  {
    icon: <Smartphone className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Web & Mobile Development",
    description: "Building responsive web applications and interactive user interfaces with modern frameworks.",
    color: "secondary",
  },
  {
    icon: <Database className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Database Systems",
    description: "Designing and implementing database solutions with optimized queries and data structures.",
    color: "accent",
  },
  {
    icon: <Code className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Software Development",
    description: "Developing robust software solutions using Scala, Python, and other programming languages.",
    color: "primary",
  },
  {
    icon: <Video className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Computer Vision",
    description: "Implementing video processing tools with face detection and image manipulation capabilities.",
    color: "secondary",
  },
  {
    icon: <LineChart className="h-7 w-7 text-[hsl(var(--primary))]" />,
    title: "Data Analysis",
    description: "Analyzing and visualizing complex datasets to extract meaningful insights and patterns.",
    color: "accent",
  },
]

export default function ServicesSection() {
  const titleReveal = useRevealEffect(0.2, 100)
  const cardsReveal = useRevealEffect(0.2, 300)

  return (
    <section className="py-8 md:py-12 relative" id="services">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 blob-shape bg-[hsl(var(--secondary))]/15 blur-xl top-20 right-[10%] animate-gentle-float" style={{ animationDuration: '14s' }}></div>
        <div className="absolute w-80 h-80 blob-shape bg-[hsl(var(--accent))]/15 blur-xl bottom-20 left-[5%] animate-gentle-float" style={{ animationDelay: '2s', animationDuration: '16s' }}></div>
      </div>

      <div className="container mx-auto w-full px-4 sm:px-6 md:px-8">
        <div
          className="mb-8 text-center relative z-10"
          ref={titleReveal.ref}
          style={titleReveal.style}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark-brown-text">Technical Expertise</h2>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            Specialized skills in computer science, algorithm design, and software development
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
          ref={cardsReveal.ref}
          style={cardsReveal.style}
        >
          {services.map((service, index) => {
            const tiltEffect = useTiltEffect(5)
            return (
              <div
                key={index}
                className="glass-card rounded-[var(--radius)] p-6 transition-all duration-300 gradient-border-subtle"
                ref={tiltEffect.ref}
                style={tiltEffect.style}
              >
                <div className={`bg-[hsl(var(--${service.color}))/8] rounded-2xl p-4 inline-block mb-4 gradient-bg`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--dark-brown))]">{service.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-[hsl(var(--secondary))]/30 animate-pulse-soft"></div>
      <div className="absolute top-40 right-10 w-2 h-2 rounded-full bg-[hsl(var(--accent))]/30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-[hsl(var(--primary))]/20 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 right-1/5 w-2 h-2 rounded-full bg-[hsl(var(--secondary))]/25 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
    </section>
  )
}
