"use client"

import { useState, useRef, useEffect } from 'react'
import DanglingBadge from './dangling-badge'

export default function NavBadgeWrapper({ children, badgeImage = '/images/photo_design.png' }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [badgePosition, setBadgePosition] = useState({ left: 0 })
  const navRef = useRef(null)

  // Find all the nav items and add hover listeners
  useEffect(() => {
    if (!navRef.current) return
    
    const nameItem = navRef.current.querySelector('a[href="/CV"]')?.parentElement
    const contactItem = navRef.current.querySelector('a[href="/Contact"]')?.parentElement
    
    if (nameItem) {
      nameItem.addEventListener('mouseenter', () => {
        const rect = nameItem.getBoundingClientRect()
        setBadgePosition({ left: rect.left + rect.width / 2 - 100 }) // Center badge under nav item
        setHoveredItem('name')
      })
      
      nameItem.addEventListener('mouseleave', () => {
        setHoveredItem(null)
      })
    }
    
    if (contactItem) {
      contactItem.addEventListener('mouseenter', () => {
        const rect = contactItem.getBoundingClientRect()
        setBadgePosition({ left: rect.left + rect.width / 2 - 100 }) // Center badge under nav item
        setHoveredItem('contact')
      })
      
      contactItem.addEventListener('mouseleave', () => {
        setHoveredItem(null)
      })
    }
    
    return () => {
      // Clean up event listeners
      if (nameItem) {
        nameItem.removeEventListener('mouseenter', () => {})
        nameItem.removeEventListener('mouseleave', () => {})
      }
      
      if (contactItem) {
        contactItem.removeEventListener('mouseenter', () => {})
        contactItem.removeEventListener('mouseleave', () => {})
      }
    }
  }, [navRef.current])

  return (
    <div ref={navRef} className="relative">
      {children}
      
      <div 
        style={{ 
          position: 'fixed', 
          left: `${badgePosition.left}px`, 
          top: '150px', 
          zIndex: 100,
          pointerEvents: hoveredItem ? 'auto' : 'none'
        }}
      >
        <DanglingBadge 
          isHovered={!!hoveredItem} 
          badgeImage={badgeImage}
        />
      </div>
    </div>
  )
} 