"use client"

import Image from "next/image"
import Link from "next/link"
import { useParallax, useTiltEffect, useRevealEffect } from "./parallax-provider"

const technologies = [
  {
    name: "Scala",
    logo: "/images/scala-logo.svg",
    color: "#DC322F",
    description: "Functional programming for scalable applications",
    icon: "λ"
  },
  {
    name: "Python",
    logo: "/images/python-logo.svg",
    color: "#3776AB",
    description: "Versatile language for data science and automation",
    icon: "🐍"
  },
  {
    name: "JavaScript",
    logo: "/images/javascript-logo.svg",
    color: "#F7DF1E",
    description: "Building interactive web experiences",
    icon: "{ }"
  },
  {
    name: "HTML/CSS",
    logo: "/images/html-css-logo.svg",
    color: "#E34F26",
    description: "Creating structured, beautiful interfaces",
    icon: "</>"
  },
  {
    name: "SQL",
    logo: "/images/sql-logo.svg",
    color: "#4479A1",
    description: "Database querying and management",
    icon: "⚙️"
  },
]

export default function TechnologiesSection() {
  const titleReveal = useRevealEffect(0.2, 100)
  const cardReveal = useRevealEffect(0.2, 300)

  return (
    <section className="py-6 md:py-10 mb-6 relative" id="technologies">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 blob-shape bg-[hsl(var(--secondary))]/15 blur-xl top-[20%] left-[10%] animate-gentle-float" style={{ animationDuration: '12s' }}></div>
        <div className="absolute w-48 h-48 blob-shape bg-[hsl(var(--accent))]/15 blur-xl bottom-[20%] right-[10%] animate-gentle-float" style={{ animationDelay: '2s', animationDuration: '14s' }}></div>
      </div>

      <div
        className="mb-8 text-center relative z-10"
        ref={titleReveal.ref}
        style={titleReveal.style}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark-brown-text">Technologies</h2>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto px-4">
          Programming languages and tools I work with
        </p>
      </div>

      <div
        className="rounded-[var(--radius)] glass-effect p-6 md:p-8 mx-4 relative z-10 gradient-border-subtle"
        ref={cardReveal.ref}
        style={cardReveal.style}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
          {technologies.map((tech, index) => {
            const tiltEffect = useTiltEffect(10)
            return (
              <div
                key={index}
                className="transition-all duration-500 hover:scale-105 w-full max-w-[160px]"
                ref={tiltEffect.ref}
                style={tiltEffect.style}
              >
                <div
                  className="glass-effect-strong rounded-[var(--radius)] p-4 flex flex-col items-center justify-center h-36 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
                  style={{
                    borderTop: `3px solid ${tech.color}`,
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))`
                  }}
                >
                  <div
                    className="text-4xl mb-2 font-mono flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-1 dark-brown-text">{tech.name}</h3>
                  <p className="text-xs text-center text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{tech.description}</p>
                  <div
                    className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full opacity-10"
                    style={{ background: tech.color }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 blob-shape bg-[hsl(var(--secondary))]/15 z-0 animate-pulse-soft"></div>
      <div className="absolute top-20 right-20 w-10 h-10 blob-shape bg-[hsl(var(--accent))]/15 z-0 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 blob-shape bg-[hsl(var(--primary))]/10 z-0 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-[15%] w-6 h-6 blob-shape bg-[hsl(var(--secondary))]/12 z-0 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
    </section>
  )
}
