"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Code, Laptop, Database, FileCode, Braces, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useParallax, useTiltEffect, useRevealEffect } from "./parallax-provider"
import { DepthCard } from "./scroll-section"

interface ProjectCardProps {
  project: {
    name: string
    description: string
    image: string
    technologies: string[]
    githubUrl: string
    liveUrl?: string
    category?: string
  }
  index: number
}

// Project icons based on technology category
const getProjectIcon = (technologies: string[], category?: string) => {
  if (!category) return <Code className="h-12 w-12 text-[#5c4f3c]" />
  
  const categoryLower = category.toLowerCase()
  
  if (categoryLower.includes('game')) {
    return <Laptop className="h-12 w-12 text-[#5c4f3c]" />
  } else if (categoryLower.includes('algorithm')) {
    return <Braces className="h-12 w-12 text-[#5c4f3c]" />
  } else if (categoryLower.includes('web')) {
    return <FileCode className="h-12 w-12 text-[#5c4f3c]" />
  } else if (categoryLower.includes('database')) {
    return <Database className="h-12 w-12 text-[#5c4f3c]" />
  } else if (categoryLower.includes('vision')) {
    return <Code className="h-12 w-12 text-[#5c4f3c]" />
  } else {
    return <Code className="h-12 w-12 text-[#5c4f3c]" />
  }
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const revealEffect = useRevealEffect(0.1, index * 100)

  // Check if image is a placeholder text file
  const isPlaceholderImage = project.image.endsWith('.jpg') && !project.image.startsWith('http')
  const projectIcon = getProjectIcon(project.technologies, project.category)

  return (
    <div
      className="group relative h-full flex flex-col w-full mx-auto"
      ref={revealEffect.ref}
      style={revealEffect.style}
    >
      {/* Card matching the screenshot design - simpler and cleaner */}
      <DepthCard depth={25} className="h-full w-full">
        <div className="bg-white shadow-sm border border-[#e8e0d7] rounded-[24px] overflow-hidden transition-all duration-300 group-hover:shadow-md flex flex-col h-full">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
        {!isPlaceholderImage ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f6f2ee] to-[#e8e0d7]">
                <div className="p-6 rounded-full bg-white shadow-sm">
              {projectIcon}
            </div>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-[#5c4f3c]">{project.name}</h3>
            <p className="text-[#8a7968] mb-5 text-sm flex-grow">{project.description}</p>
            
            {/* Technology tags in horizontal row - limited to 3 with inline spacing */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs whitespace-nowrap bg-[#f6f2ee] px-2.5 py-1 rounded-[12px] text-[#8a7968]"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs whitespace-nowrap text-[#8a7968]">+{project.technologies.length - 3} more</span>
              )}
            </div>

            {/* GitHub button matching Latest Work button styling */}
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              className="inline-flex items-center justify-center w-full py-2 px-4 bg-white border border-[#e8e0d7] text-[#5c4f3c] rounded-full shadow-sm hover:bg-[#f6f2ee] transition-all duration-200"
            >
              <Github className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-medium">View on GitHub</span>
            </Link>
          </div>
        </div>
      </DepthCard>
      
      {/* Simplified category indicator as in screenshot - top right corner */}
      {project.category && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm shadow-sm rounded-full px-3 py-1 text-xs font-medium z-20 text-[#5c4f3c] border border-[#e8e0d7]">
          {project.category}
        </div>
      )}
    </div>
  )
}
