"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText, Github, Lightbulb, Puzzle, Code, Users } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      
      // Track active section
      const sections = ["projects", "design", "services", "contact"]
      let current = ""
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section
            break
          }
        }
      }
      
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Personality traits mapping to sections
  const personalityLinks = [
    { id: "projects", label: "Projects", icon: <Code className="h-3.5 w-3.5 mr-1.5" /> },
    { id: "design", label: "Personality", icon: <Lightbulb className="h-3.5 w-3.5 mr-1.5" /> },
    { id: "services", label: "Skills", icon: <Puzzle className="h-3.5 w-3.5 mr-1.5" /> },
    { id: "contact", label: "Contact", icon: <Users className="h-3.5 w-3.5 mr-1.5" /> }
  ]

  return (
    <nav className={`py-6 sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'} px-[17px] md:px-0`}>
      {/* Navbar with enhanced glowing effect - narrower width with max-width */}
      <div className="relative mx-auto max-w-[900px] glow-effect-strong animation-delay-300">
        {/* Main navbar container */}
        <div 
          className={`relative rounded-[28px] p-4 flex items-center justify-between transition-all duration-500 border border-[#e8e0d7] ${
            scrolled 
              ? 'shadow-lg bg-white/95 backdrop-blur-xl' 
              : 'shadow-md bg-white/90 backdrop-blur-lg'
          }`}
        >
          <div className="flex items-center space-x-3 overflow-x-auto mobile-touch-target">
            <span className="text-sm text-[#5c4f3c] whitespace-nowrap font-medium">Tham Rou Yi</span>
            <div className="h-4 w-[1px] bg-[#e8e0d7] hidden sm:block"></div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs h-8 border-[#e8e0d7] text-[#5c4f3c] hover:bg-[#f6f2ee] whitespace-nowrap hover:shadow-sm transition-all"
              asChild
            >
              <Link href="/cv.pdf" target="_blank">
                <FileText className="h-3 w-3 mr-1" /> CV
              </Link>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {personalityLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm text-[#5c4f3c] hover:text-[#8a7968] transition-all duration-300 relative pb-1 hover:-translate-y-0.5 flex items-center ${
                  activeSection === link.id ? "font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#d6c7b6]/70 after:rounded-full" : ""
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="https://github.com/rouyiTham"
              target="_blank"
              className="text-sm text-[#5c4f3c] hover:text-white transition-all duration-300 px-3 py-1.5 rounded-full bg-[#f6f2ee] hover:bg-[#8a7968] border border-[#e8e0d7] hover:shadow-sm flex items-center hover:-translate-y-0.5"
            >
              <Github className="h-3.5 w-3.5 mr-1.5" /> GitHub
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden mobile-touch-target">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-[#5c4f3c] hover:bg-[#f6f2ee] w-8 h-8 p-0 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu with matching glow effect - also narrower */}
      {mobileMenuOpen && (
        <div className="relative md:hidden mx-auto max-w-[900px] mt-2 glow-effect-strong animation-delay-500">
          {/* Mobile menu content */}
          <div className="relative rounded-[24px] shadow-md p-4 z-20 border border-[#e8e0d7] bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-2">
              {personalityLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-sm text-[#5c4f3c] hover:text-[#8a7968] p-3 rounded-lg hover:bg-[#f6f2ee] transition-all duration-300 mobile-touch-target flex items-center ${
                    activeSection === link.id ? "bg-[#f6f2ee] font-medium" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-[#e8e0d7]">
                <Link
                  href="https://github.com/rouyiTham"
                  target="_blank"
                  className="text-sm flex items-center space-x-2 p-3 rounded-lg bg-[#5c4f3c] text-white hover:bg-[#8a7968] transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
