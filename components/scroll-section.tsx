"use client"

import React, { ReactNode, useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useScrollAnimation } from "./parallax-provider"

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  type?: "fade" | "zoom" | "slide" | "depth" | "cards" | "stagger"
  bgColor?: string
  intensity?: number
  offsetStart?: number // How early to start the animation (percentage of viewport, e.g., 0.2 = 20%)
  offsetEnd?: number // How late to end the animation (percentage)
  id?: string // HTML id attribute for linking
}

// Component for creating 3D layers that move at different speeds
const ParallaxLayer = ({
  children,
  depth,
  className = "",
}: {
  children: ReactNode
  depth: number // Positive values = layer moves slower, negative = faster than scroll
  className?: string
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform based on depth
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, depth * 100]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Floating elements that appear and move as you scroll
const FloatingElement = ({
  children,
  x = 0, 
  y = 0,
  delay = 0,
  duration = 1,
  scale = 1,
  rotate = 0,
  className = ""
}: {
  children: ReactNode
  x?: number | string
  y?: number | string
  delay?: number
  duration?: number
  scale?: number
  rotate?: number
  className?: string
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Create transformed values for scroll-based animations
  const opacityValue = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y, scale, rotate }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={{ 
        delay, 
        duration,
        type: "spring",
        stiffness: 50,
        damping: 20
      }}
      className={`absolute pointer-events-none ${className}`}
      style={{ opacity: opacityValue }}
    >
      {children}
    </motion.div>
  )
}

// Animate elements in a staggered sequence as you scroll
const StaggerContainer = ({
  children,
  delayStep = 0.1,
  className = ""
}: {
  children: ReactNode[]
  delayStep?: number
  className?: string
}) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })
  
  // Each child gets animated based on scroll position with staggered delays
  return (
    <motion.div
      ref={containerRef}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: useTransform(scrollYProgress, [0, 0.2 + i * delayStep, 1], [0, 1, 1]),
            y: useTransform(scrollYProgress, [0, 0.2 + i * delayStep, 1], [20, 0, 0])
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// 3D Depth card effect
const DepthCard = ({
  children,
  depth = 30,
  className = ""
}: {
  children: ReactNode
  depth?: number
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePosition({ x, y })
    }
    
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', () => setHover(true))
    card.addEventListener('mouseleave', () => setHover(false))
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', () => setHover(true))
      card.removeEventListener('mouseleave', () => setHover(false))
    }
  }, [])
  
  // Calculate rotation and movement based on mouse position
  const rotateY = hover ? (mousePosition.x - 0.5) * 15 : 0
  const rotateX = hover ? (0.5 - mousePosition.y) * 15 : 0
  const translateZ = hover ? depth : 0
  
  // Calculate highlight position
  const highlightX = mousePosition.x * 100
  const highlightY = mousePosition.y * 100
  
  return (
    <div 
      ref={cardRef}
      className={`relative transition-transform duration-200 ${className}`}
      style={{ 
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare effect */}
      {hover && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
          style={{
            background: `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`,
            opacity: 0.8
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}

export default function ScrollSection({
  children,
  className = "",
  type = "fade",
  bgColor = "transparent",
  intensity = 1,
  offsetStart = 0.2,
  offsetEnd = 0.8,
  id,
}: ScrollSectionProps) {
  const { ref, progress } = useScrollAnimation(offsetStart, offsetEnd)
  
  // Calculate animation properties based on scroll progress
  const opacity = Math.min(1, Math.max(0, progress * 2))
  const scale = type === "zoom" ? 0.9 + (progress * 0.2) : 1
  const translateY = type === "slide" ? (1 - progress) * 100 * intensity : 0
  
  // Generate effects based on section type
  const renderSpecialEffects = () => {
    switch (type) {
      case "depth":
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <FloatingElement x="-5%" y="10%" delay={0.1} rotate={-5} className="left-[10%] top-[20%]">
                <div className="w-48 h-48 rounded-full bg-[#d6c7b6]/20 blur-2xl"></div>
              </FloatingElement>
              <FloatingElement x="10%" y="-10%" delay={0.3} rotate={5} className="right-[15%] bottom-[30%]">
                <div className="w-64 h-64 rounded-full bg-[#8a7968]/15 blur-2xl"></div>
              </FloatingElement>
            </div>
            <ParallaxLayer depth={-30} className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[5%] top-[30%] w-20 h-20 rounded-full bg-[#e8e0d7]/30 blur-xl"></div>
              <div className="absolute right-[15%] bottom-[20%] w-32 h-32 rounded-full bg-[#5c4f3c]/20 blur-xl"></div>
            </ParallaxLayer>
          </>
        )
      case "cards":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ParallaxLayer depth={20} className="absolute -left-[5%] top-[10%]">
              <div className="w-32 h-32 bg-[#d6c7b6]/30 rounded-lg blur-md"></div>
            </ParallaxLayer>
            <ParallaxLayer depth={-15} className="absolute right-[10%] top-[20%]">
              <div className="w-24 h-24 bg-[#8a7968]/20 rounded-lg blur-sm"></div>
            </ParallaxLayer>
            <ParallaxLayer depth={-5} className="absolute left-[20%] bottom-[10%]">
              <div className="w-16 h-16 bg-[#e8e0d7]/30 rounded-lg blur-sm"></div>
            </ParallaxLayer>
          </div>
        )
      case "stagger":
        // staggered animations are handled directly by the StaggerContainer component
        return null
      default:
        return null
    }
  }
  
  return (
    <div
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Background effects */}
      {renderSpecialEffects()}
      
      {/* Content with animations */}
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {type === "stagger" ? (
          <StaggerContainer delayStep={0.1} className="w-full">
            {React.Children.toArray(children)}
          </StaggerContainer>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

// Export components for individual use
export { ParallaxLayer, FloatingElement, StaggerContainer, DepthCard } 