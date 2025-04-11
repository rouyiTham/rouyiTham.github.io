"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    setIsAnimating(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Reset animation state after scroll completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-8 right-[5%] sm:right-[12.5%] z-50">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className={`
            rounded-full p-3
            bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90]
            text-[hsl(var(--primary-foreground))] shadow-lg hover:shadow-xl
            transition-all duration-300
            ${isAnimating ? 'animate-bounce' : ''}
            glass-effect-strong border-0 gradient-border-subtle
          `}
          size="icon"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
