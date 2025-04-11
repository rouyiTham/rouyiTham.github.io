"use client"

import { useState, useRef, useEffect } from 'react'
import SimpleDanglingBadge from './simple-dangling-badge'

export default function SimpleBadgeWrapper({ children, badgeImage = '/images/photo_design.png' }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [badgePosition, setBadgePosition] = useState({ left: 0 })
  const navRef = useRef(null)
  const hoverTimeoutRef = useRef(null)
  const isClickingRef = useRef(false)

  // Get the base path from environment variable or default to empty string
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  // Ensure we don't duplicate the base path
  const imageUrl = badgeImage.startsWith(basePath) ? badgeImage : `${basePath}${badgeImage}`

  // Find all the nav items and add hover listeners
  useEffect(() => {
    if (!navRef.current) return
    
    // Only get the Contact link
    const contactItem = navRef.current.querySelector('a[href="#contact"]')
    const allNavItems = navRef.current.querySelectorAll('a')

    const updateBadgePosition = () => {
      if (contactItem) {
        const rect = contactItem.getBoundingClientRect()
        setBadgePosition({ left: rect.left + rect.width / 2 - 75 }) // Center badge
      }
    }

    const handleContactHover = () => {
      if (contactItem && !isClickingRef.current) {
        // Clear any existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        
        updateBadgePosition()
        setHoveredItem('contact')
      }
    }
    
    const handleMouseLeave = () => {
      if (!isClickingRef.current) {
        // Add a small delay before hiding to make the transition smoother
        hoverTimeoutRef.current = setTimeout(() => {
          setHoveredItem(null)
        }, 100)
      }
    }

    const handleClick = (e) => {
      // Set clicking state
      isClickingRef.current = true
      
      // If clicking outside contact link, hide the badge
      if (e.target !== contactItem) {
        setHoveredItem(null)
      }
      
      // Reset clicking state after a short delay
      setTimeout(() => {
        isClickingRef.current = false
      }, 100)
    }

    const handleGlobalMouseMove = (e) => {
      // If we're not hovering over the contact item or any nav item, hide the badge
      if (!isClickingRef.current && hoveredItem) {
        const rect = contactItem.getBoundingClientRect()
        if (!isPointNearElement(e.clientX, e.clientY, rect, 20)) { // 20px tolerance
          setHoveredItem(null)
        }
      }
    }

    // Helper function to check if a point is near an element
    const isPointNearElement = (x, y, rect, tolerance) => {
      return (
        x >= rect.left - tolerance &&
        x <= rect.right + tolerance &&
        y >= rect.top - tolerance &&
        y <= rect.bottom + tolerance
      )
    }

    const handleScrollResize = () => {
      // Only update position if badge is visible
      if (hoveredItem === 'contact') {
        updateBadgePosition()
      }
    }
    
    // Add event listeners to Contact link only
    if (contactItem) {
      contactItem.addEventListener('mouseenter', handleContactHover)
      contactItem.addEventListener('mouseleave', handleMouseLeave)
      
      // Add click listeners to all nav items
      allNavItems.forEach(item => {
        item.addEventListener('click', handleClick)
      })
      
      // Update position on scroll and resize only when badge is visible
      window.addEventListener('scroll', handleScrollResize)
      window.addEventListener('resize', handleScrollResize)
      window.addEventListener('mousemove', handleGlobalMouseMove)
    }
    
    return () => {
      // Clean up event listeners
      if (contactItem) {
        contactItem.removeEventListener('mouseenter', handleContactHover)
        contactItem.removeEventListener('mouseleave', handleMouseLeave)
        
        // Remove click listeners from all nav items
        allNavItems.forEach(item => {
          item.removeEventListener('click', handleClick)
        })
        
        window.removeEventListener('scroll', handleScrollResize)
        window.removeEventListener('resize', handleScrollResize)
        window.removeEventListener('mousemove', handleGlobalMouseMove)
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [navRef.current, hoveredItem])

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