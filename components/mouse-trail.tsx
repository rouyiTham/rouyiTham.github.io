"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  createdAt: number
}

export default function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const nextId = useRef(0)
  const lastParticleTime = useRef(0)
  const isEnabled = useRef(true)
  const mouseTrailRef = useRef<HTMLDivElement>(null)

  // Colors in the beige/brown theme
  const colors = ['#d6c7b6', '#8a7968', '#e8e0d7', '#5c4f3c', '#f6f2ee']

  useEffect(() => {
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled.current) return
      
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add new particles occasionally
      const now = Date.now()
      if (now - lastParticleTime.current > 40) { // Control particle emission rate
        const size = Math.random() * 15 + 5 // 5-20px
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        setParticles(prevParticles => [
          ...prevParticles,
          {
            id: nextId.current++,
            x: e.clientX,
            y: e.clientY,
            size,
            color,
            createdAt: now
          }
        ])
        
        lastParticleTime.current = now
      }
    }
    
    // Cleanup old particles
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setParticles(prevParticles => 
        prevParticles.filter(particle => now - particle.createdAt < 1000)
      )
    }, 500)
    
    // Performance optimization - disable on mobile/tablet
    const checkDevice = () => {
      isEnabled.current = window.innerWidth > 768
    }
    
    // Initialize
    checkDevice()
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', checkDevice)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkDevice)
      clearInterval(cleanupInterval)
    }
  }, [colors])

  // Disable when user is inactive
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const handleActivity = () => {
      isEnabled.current = true
      
      // Disable after inactivity
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        isEnabled.current = false
      }, 5000)
    }
    
    // Activity events
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('click', handleActivity)
    window.addEventListener('scroll', handleActivity)
    
    // Initial state
    handleActivity()
    
    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div 
      ref={mouseTrailRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ perspective: "500px" }}
    >
      {particles.map((particle) => {
        const age = Date.now() - particle.createdAt
        const opacityFactor = 1 - age / 1000 // Fade out based on age
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: opacityFactor * 0.5, // Semi-transparent
              filter: `blur(${particle.size / 5}px)`, // Slight blur for glow effect
              transform: "translate(-50%, -50%)",
              zIndex: -1,
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              x: (Math.random() - 0.5) * 100, // Random spread
              y: (Math.random() - 0.5) * 100 + 20, // Slightly favor upward movement
              rotate: Math.random() * 180
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut" 
            }}
          />
        )
      })}
    </div>
  )
}

// Specialized version that activates only in certain areas
export function ElementTrail({ children, className = "", enabled = true }: { 
  children: React.ReactNode
  className?: string
  enabled?: boolean 
}) {
  const [localParticles, setLocalParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const nextLocalId = useRef(0)
  const lastEmitTime = useRef(0)
  
  // Colors in the beige/brown theme
  const colors = ['#d6c7b6', '#8a7968', '#e8e0d7', '#5c4f3c', '#f6f2ee']
  
  useEffect(() => {
    if (!enabled) return
    
    const container = containerRef.current
    if (!container) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Only emit particles at intervals
      const now = Date.now()
      if (now - lastEmitTime.current > 50) {
        const size = Math.random() * 12 + 4 // 4-16px
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        setLocalParticles(prev => [
          ...prev,
          {
            id: nextLocalId.current++,
            x,
            y,
            size,
            color,
            createdAt: now
          }
        ])
        
        lastEmitTime.current = now
      }
    }
    
    // Cleanup old particles
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setLocalParticles(prev => 
        prev.filter(particle => now - particle.createdAt < 1000)
      )
    }, 300)
    
    container.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      clearInterval(cleanupInterval)
    }
  }, [colors, enabled])
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      
      {/* Local particle effects */}
      {localParticles.map(particle => {
        const age = Date.now() - particle.createdAt
        const opacity = 1 - age / 1000 // Fade out over 1 second
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: opacity * 0.4,
              filter: `blur(${particle.size / 4}px)`,
              zIndex: 10
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              x: (Math.random() - 0.5) * 40,
              y: (Math.random() - 0.5) * 40
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )
      })}
    </div>
  )
} 