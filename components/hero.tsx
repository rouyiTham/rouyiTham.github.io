"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParallax, useTiltEffect, useRevealEffect } from "./parallax-provider"
import Link from "next/link"
import { Typewriter } from "@/components/ui/typewriter"
import { Sparkles } from "lucide-react"
import { User, Mail, Phone, Award, Linkedin } from "lucide-react"
import BaseImage from "@/components/ui/base-image"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const titleParallax = useParallax(0.05)
  const imageParallax = useParallax(-0.1)
  const imageTilt = useTiltEffect(10)
  const titleReveal = useRevealEffect(0.2, 200)
  const bioReveal = useRevealEffect(0.2, 300)
  const subtitleReveal = useRevealEffect(0.2, 400)
  const buttonsReveal = useRevealEffect(0.2, 600)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="py-12 md:py-16 pb-24 flex flex-col items-center text-center relative overflow-hidden hero-content w-full px-[17px] md:px-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 blob-shape bg-gradient-to-r from-[hsl(var(--secondary))/15] to-[hsl(var(--accent))/10] blur-3xl -top-20 -left-20 animate-gentle-float"></div>
        <div className="absolute w-96 h-96 blob-shape bg-gradient-to-r from-[hsl(var(--accent))/10] to-[hsl(var(--secondary))/15] blur-3xl -bottom-20 -right-20" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
      </div>

      {/* Profile image with tilt effect - redesigned to prevent overlap */}
      <div
        className="relative w-28 h-28 md:w-36 md:h-36 z-10 mb-8"
        {...imageParallax}
        ref={imageTilt.ref}
        style={imageTilt.style as React.CSSProperties}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--secondary))/40] to-[hsl(var(--accent))/25] animate-pulse-soft"></div>
        <BaseImage
          src="/images/profile_pic.jpeg"
          alt="Tham Rou Yi"
          width={144}
          height={144}
          className="rounded-full object-cover border-2 border-white relative z-10 w-full h-full"
          priority
        />
      </div>

      {/* Name label as separate element */}
      <div
        className="glass-effect-strong rounded-full px-4 py-1.5 text-xs font-medium z-20 flex items-center gap-1.5 gradient-border-subtle shadow-sm mb-6"
      >
        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--foreground))]" /> Tham Rou Yi
      </div>

      {/* Bio Panel - Creative Contact Card - with more top margin */}
      <div 
        className="max-w-md mb-8 z-10"
        ref={bioReveal.ref}
        style={bioReveal.style}
      >
        <div className="glass-effect-strong backdrop-blur-sm rounded-2xl border border-white/30 py-3 px-3 sm:px-5 shadow-md overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(var(--secondary))/10] to-[hsl(var(--accent))/5] opacity-50 z-[-1]"></div>
          
          {/* Bio Content */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center sm:items-start text-left">
            {/* Bio Details */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#5c4f3c]">
                <User className="h-4 w-4 text-[hsl(var(--primary))]" />
                <span className="text-sm font-medium">Rou Yi</span>
              </div>
              
              <div className="flex items-center gap-2 text-[#5c4f3c]">
                <Mail className="h-4 w-4 text-[hsl(var(--primary))]" />
                <a href="mailto:rouyi.tham@gmail.com" className="text-xs hover:underline transition-colors">
                  rouyi.tham@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-[#5c4f3c]">
                <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
                <a href="tel:+6010-2041036" className="text-xs hover:underline transition-colors">
                  +6010-2041036
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-[#5c4f3c]">
                <Linkedin className="h-4 w-4 text-[hsl(var(--primary))]" />
                <a href="https://www.linkedin.com/in/rouyi-tham/" target="_blank" className="text-xs hover:underline transition-colors">
                  linkedin.com/in/rouyi-tham
                </a>
              </div>
            </div>
            
            {/* Decorator Divider for Desktop */}
            <div className="hidden sm:block w-px h-16 bg-[#e8e0d7] self-center"></div>
            
            {/* Title/Description */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/20 px-3 py-2 rounded-full text-[#5c4f3c] border border-[#e8e0d7] shadow-sm">
              <div className="rounded-full bg-[#f6f2ee] p-1.5">
                <Award className="h-4 w-4 text-[hsl(var(--primary))]" />
              </div>
              <span className="text-xs font-medium">All rounded computer scientist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with reveal effects and typewriter */}
      <div
        className="max-w-2xl z-10 px-0 sm:px-0 w-full"
        ref={titleReveal.ref}
        style={titleReveal.style}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 hero-title dark-brown-text">
          <div className="h-20 sm:h-16 md:h-16 mb-6 sm:mb-0">
            <Typewriter 
              text={[
                "Building digital solutions.",
                "Crafting elegant algorithms.",
                "Solving complex problems.",
                "Creating impactful software."
              ]} 
              speed={120} 
              deleteSpeed={60}
              delay={2500}
              loop={true} 
              cursor="|"
              className="inline-block"
            />
          </div>
        </h1>
        <div ref={subtitleReveal.ref} style={subtitleReveal.style}>
          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-8">
            Computer Scientist & Developer with expertise in algorithm design, software development,
            and a passion for creative problem-solving
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4"
          ref={buttonsReveal.ref}
          style={buttonsReveal.style}
        >
          <Button
            className="rounded-full px-6 py-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-[hsl(var(--primary-foreground))] shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="#projects">
              Latest Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-6 py-6 gradient-border-subtle text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))]/20 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="https://github.com/rouyiTham" target="_blank">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-[10%] w-4 h-4 rounded-full bg-[hsl(var(--secondary))/25] animate-pulse-soft"></div>
      <div className="absolute top-1/3 right-[10%] w-6 h-6 rounded-full bg-[hsl(var(--accent))/25] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-[hsl(var(--primary))/15] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[hsl(var(--secondary))/20] animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
    </section>
  )
}
