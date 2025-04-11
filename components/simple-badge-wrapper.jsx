"use client"

import { useState, useRef, useEffect } from 'react'
import SimpleDanglingBadge from './simple-dangling-badge'

export default function SimpleBadgeWrapper({ children, badgeImage = '/images/photo_design.png' }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [badgePosition, setBadgePosition] = useState({ left: 0 })
  const navRef = useRef(null)
  const hoverTimeoutRef = useRef(null)

  // Get the base path from environment variable or default to empty string
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  // Ensure we don't duplicate the base path
  const imageUrl = badgeImage.startsWith(basePath) ? badgeImage : `${basePath}${badgeImage}`

  // Find all the nav items and add hover listeners
  useEffect(() => {
    if (!navRef.current) return
    
    // Only get the Contact link
    const contactItem = navRef.current.querySelector('a[href="#contact"]')

    const handleContactHover = () => {
      if (contactItem) {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        
        const rect = contactItem.getBoundingClientRect()
        setBadgePosition({ left: rect.left + rect.width / 2 - 75 }) // Center badge
        setHoveredItem('contact')
      }
    }
    
    const handleMouseLeave = () => {
      // Add a small delay before hiding to make the transition smoother
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredItem(null)
      }, 100)
    }
    
    // Add event listeners to Contact link only
    if (contactItem) {
      contactItem.addEventListener('mouseenter', handleContactHover)
      contactItem.addEventListener('mouseleave', handleMouseLeave)
      
      // Update position on scroll and resize
      window.addEventListener('scroll', handleContactHover)
      window.addEventListener('resize', handleContactHover)
    }
    
    return () => {
      // Clean up event listeners
      if (contactItem) {
        contactItem.removeEventListener('mouseenter', handleContactHover)
        contactItem.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('scroll', handleContactHover)
        window.removeEventListener('resize', handleContactHover)
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [navRef.current])

  return (
    <div ref={navRef} className="relative">
      {children}
      
      <SimpleDanglingBadge 
        isHovered={!!hoveredItem} 
        badgeImage={imageUrl}
        position={badgePosition}
      />
    </div>
  )
} 