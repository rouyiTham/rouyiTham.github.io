"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Lightbulb, Brain, Puzzle, Sparkles, Code, Users, Zap, Heart, Star, Coffee, PenTool, Smile, Award, ZoomIn, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import BaseImage from "@/components/ui/base-image"

export default function ToyShowcase() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  // Animation states
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      const sequence = async () => {
        setIsAnimating(true)

        // Simple sequence for card reveal
        await new Promise(r => setTimeout(r, 300))
        setCardVisible(true)

        await new Promise(r => setTimeout(r, 1000))
        setIsAnimating(false)
      }

      sequence()
    } else {
      // Reset animations when out of view
      setCardVisible(false)
      if (isFlipped) setIsFlipped(false) // Reset to front face when out of view
    }
  }, [inView, isFlipped])

  // Handle card flip
  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent event bubbling
    }
    
    if (!isAnimating) {
      setIsAnimating(true)
      setIsFlipped(!isFlipped)
      setTimeout(() => {
        setIsAnimating(false)
      }, 600) // Match the flip transition duration
    }
  }

  // Handle fullscreen toggle
  const handleFullscreenToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering flip
    setIsFullscreen(!isFullscreen)
  }

  // Personality traits for profile panel
  const personalityTraits = [
    {
      category: "Core Traits",
      traits: [
        { name: "Analytical", level: 90, icon: <Brain className="w-3 h-3" /> },
        { name: "Creative", level: 80, icon: <PenTool className="w-3 h-3" /> },
        { name: "Adaptable", level: 80, icon: <Puzzle className="w-3 h-3" /> },
        { name: "Detail-oriented", level: 90, icon: <Sparkles className="w-3 h-3" /> }
      ]
    },
    {
      category: "Work Ethic",
      traits: [
        { name: "Persistent", level: 90, icon: <Award className="w-3 h-3" /> },
        { name: "Self-motivated", level: 80, icon: <Coffee className="w-3 h-3" /> },
        { name: "Collaborative", level: 90, icon: <Users className="w-3 h-3" /> },
        { name: "Curious", level: 90, icon: <Lightbulb className="w-3 h-3" /> }
      ]
    }
  ];

  return (
    <div className="py-8 md:py-16 lg:py-20 relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 md:w-96 h-64 md:h-96 blob-shape bg-gradient-to-r from-[hsl(var(--secondary))/15] to-[hsl(var(--accent))/10] blur-3xl -top-20 -left-20 animate-gentle-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute w-64 md:w-96 h-64 md:h-96 blob-shape bg-gradient-to-r from-[hsl(var(--accent))/10] to-[hsl(var(--secondary))/15] blur-3xl -bottom-20 -right-20 animate-gentle-float" style={{ animationDelay: '2s', animationDuration: '25s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
        {/* Section Title - Already centered */}
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-[#d6c7b6]/20 to-[#8a7968]/15 blur-xl -z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#f6f2ee] text-xs font-medium mb-4 border border-[#e8e0d7]">DIGITAL PERSONA</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#5c4f3c] relative inline-block">
              Computer Scientist
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#d6c7b6] to-[#8a7968] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>
            <p className="text-[#8a7968] max-w-2xl mx-auto text-base sm:text-lg">
              A premium collectible figure with an interactive personality profile
            </p>
          </motion.div>
        </div>

        {/* Centered Flip Card with Improved Responsiveness */}
        <div className="flex justify-center items-center mx-auto">
          <motion.div
            className="perspective w-full max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 20 }}
            transition={{ duration: 0.7 }}
          >
            {/* Flip card container with improved aspect ratio */}
            <div 
              className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}
              onClick={handleFlip}
              style={{ 
                height: 'auto',
                aspectRatio: '3/4',
                cursor: 'pointer' 
              }}
            >
              {/* Front - Toy Collection Image */}
              <div 
                className="flip-card-front rounded-[var(--radius)] shadow-xl glass-effect overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Main toy image container with improved sizing */}
                <div className="relative w-full h-full">
              <BaseImage
                src="/images/photo_design.png"
                alt="Computer Scientist Toy Design"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain transition-transform duration-500"
                style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
                priority
              />
                  
                  {/* Improved visual indicator that shows the card is interactive */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#5c4f3c]/40 via-[#5c4f3c]/10 to-transparent transition-opacity duration-300 flex flex-col justify-end items-center pb-6"
                    style={{ opacity: isHovered ? 0.9 : 0.3 }}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-[#5c4f3c] text-sm border border-[#e8e0d7] shadow-sm">
                      <span className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Click to flip
                      </span>
                </div>
                  </div>
                  
                  {/* Designer credit */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 z-10 border border-[#e8e0d7] shadow-sm">
                    <span className="text-xs font-medium text-[#5c4f3c]">Designed by Rou Yi</span>
                </div>
                  
                  {/* Control buttons with improved positioning and visibility */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {/* Limited Edition Badge */}
                    <div className="bg-[#5c4f3c]/90 text-white backdrop-blur-sm rounded-full px-3 py-1 border border-[#e8e0d7] shadow-sm">
                      <span className="text-xs font-medium">Limited Edition</span>
                    </div>
                  </div>
                  
                  {/* Action buttons with improved positioning and visibility */}
                  {isHovered && (
                    <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-20 transition-opacity duration-300 opacity-100">
                      {/* Fullscreen button */}
                      <button
                        onClick={handleFullscreenToggle}
                        className="bg-white/80 backdrop-blur-sm rounded-full p-3 border border-[#e8e0d7] shadow-sm transition-transform duration-300 hover:scale-110"
                        aria-label="View fullscreen"
                      >
                        <ZoomIn className="h-5 w-5 text-[#5c4f3c]" />
                      </button>
                      
                      {/* Explicit flip button */}
                      <button
                        onClick={handleFlip}
                        className="bg-white/80 backdrop-blur-sm rounded-full p-3 border border-[#e8e0d7] shadow-sm transition-transform duration-300 hover:scale-110"
                        aria-label="Flip card"
                      >
                        <RotateCcw className="h-5 w-5 text-[#5c4f3c]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Back - Personality Profile */}
              <div className="flip-card-back rounded-[var(--radius)] shadow-xl overflow-hidden">
                <div className="relative h-full bg-white/70 p-4 sm:p-6 border border-white/30 overflow-y-auto no-scrollbar"
              style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.4)'
              }}
            >
                  {/* Profile Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#5c4f3c]">Personality Profile</h3>
                    <p className="text-xs text-[#8a7968] mt-1">Character attributes & working style</p>
                  </div>
                  
                  {/* Personality summary */}
                  <div className="mb-5 p-4 bg-white/70 rounded-xl border border-[#e8e0d7]">
                    <p className="text-[#5c4f3c] text-sm leading-relaxed">
                      I approach problems with a balanced blend of analytical thinking and creative exploration. 
                      My work is characterized by attention to detail, persistence, and a constant curiosity 
                      that drives continuous learning and improvement.
                    </p>
                  </div>
                  
                  {/* Trait categories */}
                  {personalityTraits.map((category, idx) => (
                    <div key={idx} className="mb-5">
                      <h4 className="text-[#5c4f3c] font-semibold text-base mb-3 border-b border-[#e8e0d7] pb-1">{category.category}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {category.traits.map((trait, traitIdx) => (
                          <div key={traitIdx} className="bg-white/50 rounded-lg p-2.5 border border-[#e8e0d7] shadow-sm">
                            <div className="flex justify-between mb-1 items-center">
                              <span className="text-xs text-[#5c4f3c] font-medium flex items-center">
                                <span className="w-5 h-5 rounded-full bg-[#f6f2ee] flex items-center justify-center text-[#5c4f3c] mr-2">
                                  {trait.icon}
                                </span>
                                {trait.name}
                              </span>
                              <div className="text-xs font-medium text-[#8a7968]">
                                {Math.floor(trait.level / 10)}/10
                              </div>
                </div>
                            <div className="w-full h-1.5 bg-[#e8e0d7] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#5c4f3c] to-[#8a7968] rounded-full"
                                style={{ width: `${trait.level}%` }}
                              />
              </div>
                </div>
                        ))}
                </div>
              </div>
                  ))}
                  
                  {/* Learning style */}
                  <div className="mt-5">
                    <h4 className="text-[#5c4f3c] font-semibold text-base mb-2 border-b border-[#e8e0d7] pb-1">Learning Style</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-[#f6f2ee] px-3 py-1 rounded-full text-[#8a7968]">
                        Hands-on
                      </span>
                      <span className="text-xs bg-[#f6f2ee] px-3 py-1 rounded-full text-[#8a7968]">
                        Visual
                      </span>
                      <span className="text-xs bg-[#f6f2ee] px-3 py-1 rounded-full text-[#8a7968]">
                        Project-based
                      </span>
                      <span className="text-xs bg-[#f6f2ee] px-3 py-1 rounded-full text-[#8a7968]">
                        Research-driven
                      </span>
                </div>
              </div>
                  
                  {/* Click to flip button at the bottom */}
                  <div className="mt-5 text-center">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#f6f2ee] text-[#5c4f3c] text-sm border border-[#e8e0d7]"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent double flip
                        handleFlip(e);
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Click to flip
                    </button>
                </div>
                  
                  {/* Background elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#d6c7b6]/10 to-[#8a7968]/5 blur-xl -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#d6c7b6]/10 to-[#8a7968]/5 blur-xl -z-10"></div>
                </div>
                </div>
              </div>
            </motion.div>
                </div>
              </div>

      {/* Instructions for interaction with improved visibility */}
      <div className="text-center mt-10 text-[#8a7968] text-sm max-w-xl mx-auto px-4 bg-white/70 py-4 rounded-xl border border-[#e8e0d7] shadow-sm">
        <p>Click the card to flip between the collectible toy and personality profile.</p>
        <p className="mt-2 italic">This interactive display showcases both the premium collectible figure and the personality traits it represents.</p>
      </div>

      {/* Improved fullscreen modal with better UX */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300" 
          onClick={handleFullscreenToggle}
          style={{ opacity: isFullscreen ? 1 : 0 }}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={e => e.stopPropagation()}>
            <div className="w-full h-full relative rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl">
              <BaseImage
                src="/images/photo_design.png"
                alt="Computer Scientist Toy Design (Full Size)"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            
            {/* Close button with improved positioning and feedback */}
            <button
              onClick={handleFullscreenToggle}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 border border-[#e8e0d7] shadow-md hover:bg-white transition-all duration-300 hover:scale-105"
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6 text-[#5c4f3c]" />
            </button>
            
            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 text-[#5c4f3c] text-sm shadow-md border border-white/50 font-medium">
              Computer Scientist Collectible Figure
            </div>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-[hsl(var(--secondary))]/30 animate-pulse-soft"></div>
      <div className="absolute top-40 right-10 w-2 h-2 rounded-full bg-[hsl(var(--accent))]/30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-[hsl(var(--primary))]/20 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
    </div>
  )
}
