"use client"

import { useState, useRef, useEffect } from 'react'
import SimpleDanglingBadge from './simple-dangling-badge'

export default function SimpleBadgeWrapper({ children, badgeImage = '/images/photo_design.png' }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [badgePosition, setBadgePosition] = useState({ left: 0 })
  const navRef = useRef(null)

  // Find all the nav items and add hover listeners
  useEffect(() => {
    if (!navRef.current) return
    
    // Only get the Contact link
    const contactItem = navRef.current.querySelector('a[href="#contact"]')

    const handleContactHover = () => {
      if (contactItem) {
        const rect = contactItem.getBoundingClientRect()
        setBadgePosition({ left: rect.left + rect.width / 2 - 75 }) // Center badge
        setHoveredItem('contact')
      }
    }
    
    const handleMouseLeave = () => {
      setHoveredItem(null)
    }
    
    // Add event listeners to Contact link only
    if (contactItem) {
      contactItem.addEventListener('mouseenter', handleContactHover)
      contactItem.addEventListener('mouseleave', handleMouseLeave)
    }
    
    return () => {
      // Clean up event listeners
      if (contactItem) {
        contactItem.removeEventListener('mouseenter', handleContactHover)
        contactItem.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [navRef.current])

  return (
    <div ref={navRef} className="relative">
      {children}
      
      <SimpleDanglingBadge 
        isHovered={!!hoveredItem} 
        badgeImage={badgeImage}
        position={badgePosition}
      />
    </div>
  )
} 