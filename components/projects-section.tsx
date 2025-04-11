"use client"

import { useState, useEffect } from "react"
import { useParallax, useRevealEffect } from "./parallax-provider"
import ProjectCard from "./project-card"
import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Updated projects data from rouyiTham GitHub account
const projects = [
  {
    name: "Fish Survival Game",
    description: "Responsive GUI game called 'Under The Sea' built with Scala and ScalaFX. Features interactive gameplay and underwater animations.",
    image: "/images/fish-game.jpg",
    technologies: ["Scala", "ScalaFX", "Game Development"],
    githubUrl: "https://github.com/rouyiTham/Fish_Survival_Game",
    category: "Game Development"
  },
  {
    name: "EatUp Project",
    description: "Google Solution Challenge 2023 project focused on sustainable food solutions. Addresses food waste and connects surplus food with those in need.",
    image: "/images/eatup.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Sustainability"],
    githubUrl: "https://github.com/rouyiTham/EatUp-Project",
    liveUrl: "https://github.com/rouyiTham/EatUp-Project",
    category: "Web Development"
  },
  {
    name: "Hexagonal Grid A* Pathfinding",
    description: "Implementation of A* pathfinding algorithm on hexagonal grid systems. Optimized for performance and accuracy in complex environments.",
    image: "/images/pathfinding.jpg",
    technologies: ["Python", "Algorithms", "Pathfinding"],
    githubUrl: "https://github.com/rouyiTham/Hexagonal-Grid-A-Pathfinding-Algorithm",
    category: "Algorithms"
  },
  {
    name: "DreamyBites Website",
    description: "Interactive website for a bakery with modern UI/UX design. Features responsive layouts and engaging user interactions.",
    image: "/images/dreamybites.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
    githubUrl: "https://github.com/rouyiTham/DreamyBites_website",
    liveUrl: "https://github.com/rouyiTham/DreamyBites_website",
    category: "Web Development"
  },
  {
    name: "Video Processing Tool",
    description: "Tool for face detection, blurring, brightness adjustment and content overlay. Uses computer vision algorithms for real-time processing.",
    image: "/images/video-tool.jpg",
    technologies: ["Python", "OpenCV", "Computer Vision"],
    githubUrl: "https://github.com/rouyiTham/Video_Processing_Tool",
    category: "Computer Vision"
  },
  {
    name: "Database SQL Project",
    description: "Database system design and implementation for a Pizza Shop Outlet. Includes ERD modeling, query optimization, and transaction management.",
    image: "/images/database.jpg",
    technologies: ["SQL", "Database Design", "ERD"],
    githubUrl: "https://github.com/rouyiTham/DatabaseSQL",
    category: "Database"
  }
]

// Get unique categories for filtering
const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const titleReveal = useRevealEffect(0.2, 100)
  const buttonReveal = useRevealEffect(0.2, 600)

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  // Determine the grid class based on number of items
  const getGridClass = () => {
    if (filteredProjects.length === 0) return "";
    if (filteredProjects.length === 1) return "max-w-[400px] mx-auto";
    if (filteredProjects.length === 2) return "sm:grid-cols-2 max-w-[850px] mx-auto";
    return "sm:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section id="projects" className="py-16 md:py-28 relative overflow-hidden">
      {/* Subtle background decoration with beige tones */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d6c7b6]/20 blur-3xl top-0 right-0"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8a7968]/10 blur-3xl bottom-0 left-0"></div>
      </div>

      <div className="container mx-auto w-full px-0">
        {/* Section heading with beige/brown color scheme */}
        <div
          className="mb-12 md:mb-16 text-center relative z-10"
          ref={titleReveal.ref}
          style={titleReveal.style}
        >
          <h2 className="text-3xl md:text-[40px] font-bold mb-4 md:mb-5 tracking-tight text-[#5c4f3c]">Featured Projects</h2>
          <p className="text-[#8a7968] max-w-[600px] mx-auto text-base md:text-lg">
            A selection of recent work showcasing programming skills and creative problem-solving
          </p>
        </div>

        {/* Clean category filter with improved scrolling */}
        <div className="bg-white shadow-sm border border-[#e8e0d7] rounded-[32px] p-3 flex justify-center gap-4 mb-20 relative z-10 max-w-[90%] mx-auto overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-[20px] text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                ? "bg-[#5c4f3c] text-white shadow-sm"
                : "bg-transparent hover:bg-[#f6f2ee] text-[#5c4f3c]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid with improved responsive layout */}
        {filteredProjects.length > 0 ? (
          <div className={`grid grid-cols-1 gap-8 lg:gap-10 relative z-10 mb-24 ${getGridClass()}`}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 my-10 bg-white rounded-[32px] border border-[#e8e0d7] shadow-sm text-[#8a7968] mx-auto max-w-[90%]">
            <p className="text-lg font-medium">No projects found in this category.</p>
            <p className="mt-2">Please try another category.</p>
          </div>
        )}

        {/* GitHub button matching Latest Work button styling */}
        <div
          className="mt-14 text-center relative z-10"
          ref={buttonReveal.ref}
          style={buttonReveal.style}
        >
          <Link 
            href="https://github.com/rouyiTham" 
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-white border border-[#e8e0d7] text-[#5c4f3c] rounded-full shadow-sm hover:bg-[#f6f2ee] transition-all duration-300"
          >
            <Github className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">View All Projects on GitHub</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
