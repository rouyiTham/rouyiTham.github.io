"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Mail, Github, Linkedin, Calendar, ExternalLink } from "lucide-react"
import { useParallax, useRevealEffect } from "./parallax-provider"
import Link from "next/link"

export default function ContactSection() {
  const titleReveal = useRevealEffect(0.2, 100)
  const contentReveal = useRevealEffect(0.2, 300)
  const buttonsReveal = useRevealEffect(0.2, 500)
  const socialReveal = useRevealEffect(0.2, 700)

  return (
    <section className="py-8 md:py-12 text-center relative w-full" id="contact">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 blob-shape bg-[hsl(var(--secondary))]/15 blur-xl top-20 right-[10%] animate-gentle-float" style={{ animationDuration: '13s' }}></div>
        <div className="absolute w-80 h-80 blob-shape bg-[hsl(var(--accent))]/15 blur-xl bottom-20 left-[5%] animate-gentle-float" style={{ animationDelay: '1.5s', animationDuration: '15s' }}></div>
      </div>

      <div className="glass-effect-strong rounded-[var(--radius)] p-8 md:p-12 mx-auto gradient-border-subtle relative z-10">
        <div
          className="flex justify-center mb-8"
          ref={titleReveal.ref}
          style={titleReveal.style}
        >
          <div className="bg-[hsl(var(--secondary))]/15 rounded-full p-5 gradient-bg animate-gentle-float" style={{ animationDuration: '10s' }}>
            <Briefcase className="h-10 w-10 text-[hsl(var(--primary))]" />
          </div>
        </div>

        <div
          ref={contentReveal.ref}
          style={contentReveal.style}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark-brown-text">
            Available for
            <br />
            Professional Opportunities
          </h2>

          <p className="text-[hsl(var(--muted-foreground))] max-w-lg mx-auto mb-8">
            I'm currently seeking collaborative projects and employment opportunities where I can apply my expertise in algorithm design and software development to create innovative solutions.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          ref={buttonsReveal.ref}
          style={buttonsReveal.style}
        >
          <Button
            className="rounded-full px-6 py-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-[hsl(var(--primary-foreground))] shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="mailto:rouyi.tham@gmail.com">
              <Mail className="mr-2 h-4 w-4" /> Contact for Opportunities
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6 py-6 gradient-border-subtle text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]/20 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="https://calendly.com" target="_blank">
              <Calendar className="mr-2 h-4 w-4" /> Schedule a Meeting
            </Link>
          </Button>
        </div>

        <div
          className="mt-12"
          ref={socialReveal.ref}
          style={socialReveal.style}
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Connect with me professionally</p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://github.com/rouyiTham"
              target="_blank"
              className="bg-[hsl(var(--secondary))]/15 p-3 rounded-full hover:bg-[hsl(var(--secondary))]/25 transition-all duration-300 shadow-sm hover:shadow-md mobile-touch-target gradient-bg animate-gentle-float"
              style={{ animationDuration: '9s' }}
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 text-[hsl(var(--primary))]" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rouyi-tham/"
              target="_blank"
              className="bg-[hsl(var(--secondary))]/15 p-3 rounded-full hover:bg-[hsl(var(--secondary))]/25 transition-all duration-300 shadow-sm hover:shadow-md mobile-touch-target gradient-bg animate-gentle-float"
              style={{ animationDelay: '0.5s', animationDuration: '8s' }}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-[hsl(var(--primary))]" />
            </Link>
            <Link
              href="/cv.pdf"
              target="_blank"
              className="bg-[hsl(var(--secondary))]/15 p-3 rounded-full hover:bg-[hsl(var(--secondary))]/25 transition-all duration-300 shadow-sm hover:shadow-md mobile-touch-target gradient-bg animate-gentle-float"
              style={{ animationDelay: '1s', animationDuration: '10s' }}
              aria-label="Resume/CV"
            >
              <ExternalLink className="h-5 w-5 text-[hsl(var(--primary))]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-[hsl(var(--secondary))]/30 animate-pulse-soft"></div>
      <div className="absolute top-40 right-10 w-2 h-2 rounded-full bg-[hsl(var(--accent))]/30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-[hsl(var(--primary))]/20 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-[hsl(var(--secondary))]/25 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
    </section>
  )
}
