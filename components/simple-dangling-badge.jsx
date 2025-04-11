"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function SimpleDanglingBadge({ isHovered, badgeImage = '/images/photo_design.png', position }) {
  const badgeRef = useRef(null)
  const [animationStarted, setAnimationStarted] = useState(false)
  
  // Start animation when badge becomes visible
  useEffect(() => {
    if (isHovered && !animationStarted) {
      setAnimationStarted(true)
    }
    
    if (!isHovered) {
      // Reset animation state when not hovered
      setTimeout(() => {
        setAnimationStarted(false)
      }, 300) // Wait for fade out transition
    }
  }, [isHovered, animationStarted])
  
  return (
    <div 
      ref={badgeRef}
      className={`fixed z-[100] transition-all duration-300 pointer-events-none
        ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        left: `${position?.left || 0}px`,
        top: '100px',
        width: '150px',
        height: '210px',
        transformOrigin: 'top center',
        animation: isHovered ? 'dropIn 0.3s ease-out forwards' : 'none',
        willChange: 'transform, opacity'
      }}
    >
      {/* Lanyard */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-[#513e30] rounded-full transform"
        style={{
          height: '40px',
          animation: animationStarted ? 'swayRope 3s ease-in-out infinite' : 'none',
          transformOrigin: 'top center',
          willChange: 'transform',
          zIndex: 1
        }}
      />
      
      {/* Badge */}
      <div 
        className="absolute top-[40px] left-1/2 -translate-x-1/2 rounded-lg overflow-hidden border-2 border-[#d6c7b6] shadow-md"
        style={{
          width: '120px',
          height: '170px',
          backgroundColor: '#f8f4e3',
          animation: animationStarted ? 'swayBadge 3s ease-in-out infinite' : 'none',
          transformOrigin: 'top center',
          willChange: 'transform',
          zIndex: 2
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={badgeImage}
            alt="Badge"
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  )
} 