"use client"

import { type ReactNode, useEffect, useState, useRef } from "react"

export const ParallaxProvider = ({ children }: { children: ReactNode }) => {
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize window dimensions
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDelta = currentTime - lastScrollTime.current
      
      // Calculate scroll velocity for dynamic effects
      if (timeDelta > 0) {
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
        const newVelocity = Math.min(scrollDelta / timeDelta * 100, 100)
        setScrollVelocity(newVelocity)
      }
      
      // Determine scroll direction
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up")
      
      setScrollY(currentScrollY)
      lastScrollY.current = currentScrollY
      lastScrollTime.current = currentTime
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
      
      // Move particles slightly with mouse (if they exist)
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i] as HTMLElement;
          const speed = parseFloat(particle.dataset.speed || "0.02");
          const offsetX = (e.clientX - window.innerWidth / 2) * speed;
          const offsetY = (e.clientY - window.innerHeight / 2) * speed;
          particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Create particles (decorative floating elements)
    createParticles();

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Function to create particles dynamically
  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const particlesContainer = particlesRef.current;
    particlesContainer.innerHTML = '';
    
    // Create varied particles with different sizes, positions, and behaviors
    const particleCount = 15;
    const colors = ['#d6c7b6', '#8a7968', '#e8e0d7', '#5c4f3c'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 80 + 20; // 20-100px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const speed = (Math.random() * 0.03 + 0.01).toFixed(3); // 0.01-0.04
      const animDuration = Math.random() * 20 + 10; // 10-30s
      const animDelay = Math.random() * 5; // 0-5s
      const blur = Math.random() * 30 + 10; // 10-40px
      const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
      
      particle.className = 'floating-particle';
      particle.dataset.speed = speed.toString();
      particle.style.cssText = `
        position: absolute;
        left: ${x}vw;
        top: ${y}vh;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        opacity: ${opacity};
        filter: blur(${blur}px);
        will-change: transform;
        animation: float ${animDuration}s ease-in-out ${animDelay}s infinite alternate;
        pointer-events: none;
      `;
      
      particlesContainer.appendChild(particle);
    }
  };

  return (
    <div
      className="parallax-context"
      data-scroll-y={scrollY}
      data-window-width={windowWidth}
      data-window-height={windowHeight}
      data-mouse-x={mousePosition.x}
      data-mouse-y={mousePosition.y}
      data-scroll-direction={scrollDirection}
      data-scroll-velocity={scrollVelocity}
    >
      {/* Dynamic particle system for background */}
      <div 
        ref={particlesRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" 
      />

      {/* Gradient overlay that moves slightly with scroll */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                      rgba(214, 199, 182, 0.1) 0%, 
                      rgba(138, 121, 104, 0.05) 40%, 
                      transparent 70%)`,
          transform: `translateY(${scrollY * 0.02}px)`,
          transition: 'background 0.5s ease-out'
        }}
      />

      {children}
    </div>
  )
}

// Advanced parallax effect with rotation and scale
export const useParallax = (speed = 0.1, options = { rotate: false, scale: false }) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [startPosition, setStartPosition] = useState(0)
  const [transformY, setTransformY] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const requestRef = useRef<number>()
  const previousScrollY = useRef<number>(0)
  const targetTransform = useRef<number>(0)

  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrollY = window.scrollY
      previousScrollY.current = scrollY

      if (!startPosition && rect.top < window.innerHeight) {
        setStartPosition(scrollY + rect.top)
      }

      if (startPosition) {
        targetTransform.current = (scrollY - startPosition) * speed
        
        // Handle rotation if enabled
        if (options.rotate) {
          const rotationAmount = (scrollY - startPosition) * speed * 0.05
          setRotation(rotationAmount)
        }
        
        // Handle scale if enabled
        if (options.scale) {
          // Calculate how far element is in the viewport (0 to 1)
          const viewportPosition = 1 - (rect.top / window.innerHeight)
          const clampedPosition = Math.max(0, Math.min(1, viewportPosition))
          
          // Subtle scale effect - 0.9 to 1.05
          const newScale = 0.9 + (clampedPosition * 0.15)
          setScale(newScale)
        }
      }
    }

    const animateScroll = () => {
      // Apply smooth easing to the transform
      const easeFactor = 0.08
      const diff = targetTransform.current - transformY

      if (Math.abs(diff) > 0.1) {
        setTransformY(prev => prev + diff * easeFactor)
        requestRef.current = requestAnimationFrame(animateScroll)
      } else if (diff !== 0) {
        setTransformY(targetTransform.current)
      }
    }

    handleScroll() // Initial calculation

    // Use requestAnimationFrame for smoother animations
    const scrollListener = () => {
      handleScroll()
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animateScroll)
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })

    return () => {
      window.removeEventListener("scroll", scrollListener)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [element, speed, startPosition, transformY, options.rotate, options.scale])

  return {
    ref: setElement,
    style: {
      transform: `translateY(${transformY}px) rotate(${rotation}deg) scale(${scale})`,
      willChange: 'transform',
    },
  }
}

// 3D hover perspective effect with depth
export const useTiltEffect = (intensity = 15, depth = 30) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const requestRef = useRef<number>()

  useEffect(() => {
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = intensity * (y - centerY) / centerY
      const rotateY = -intensity * (x - centerX) / centerX
      const translateZ = depth;

      // Calculate glare effect position
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      const glareOpacity = 0.15

      requestRef.current = requestAnimationFrame(() => {
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`)
        setGlare({ x: glareX, y: glareY, opacity: glareOpacity })
      })
    }

    const handleMouseLeave = () => {
      requestRef.current = requestAnimationFrame(() => {
        setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`)
        setGlare({ x: 50, y: 50, opacity: 0 })
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [element, intensity, depth])

  return {
    ref: setElement,
    style: { 
      transform, 
      transition: 'transform 0.1s ease-out',
      position: 'relative'
    },
    glareStyle: {
      position: 'absolute',
      inset: '-5%',
      background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 80%)`,
      pointerEvents: 'none',
      zIndex: 2,
      borderRadius: 'inherit'
    },
    glare
  }
}

// Enhanced reveal on scroll with multi-stage animations
export const useRevealEffect = (threshold = 0.1, delay = 0, effect = 'fade-up') => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [exitProgress, setExitProgress] = useState(0)

  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      if (!isVisible || !element) return;
      
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element has exited the viewport (0 when fully in view, 1 when fully out)
      let exitAmount = 0;
      
      if (rect.bottom <= 0) {
        // Element has scrolled above viewport
        exitAmount = 1;
      } else if (rect.top >= viewportHeight) {
        // Element is below viewport
        exitAmount = 1;
      } else if (rect.top <= 0) {
        // Element is partially above viewport
        exitAmount = Math.abs(rect.top) / rect.height;
      } else if (rect.bottom >= viewportHeight) {
        // Element is partially below viewport
        exitAmount = (rect.bottom - viewportHeight) / rect.height;
      }
      
      setExitProgress(Math.min(1, exitAmount));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setHasEntered(true);
          }, delay);
        } else if (hasEntered) {
          // Reset visibility when element leaves view
          // setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully in view
      }
    );

    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [element, threshold, delay, isVisible, hasEntered]);

  const getTransform = () => {
    if (!isVisible) {
      switch (effect) {
        case 'fade-up':
          return 'translateY(40px)';
        case 'fade-down':
          return 'translateY(-40px)';
        case 'fade-left':
          return 'translateX(40px)';
        case 'fade-right':
          return 'translateX(-40px)';
        case 'zoom-in':
          return 'scale(0.8)';
        case 'zoom-out':
          return 'scale(1.2)';
        case 'rotate':
          return 'rotate(10deg) scale(0.9)';
        default:
          return 'translateY(20px)';
      }
    }
    return 'translateY(0) rotate(0deg) scale(1)';
  };

  return {
    ref: setElement,
    style: {
      opacity: isVisible ? 1 - (exitProgress * 0.6) : 0,
      transform: getTransform(),
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'opacity, transform'
    },
    isVisible,
    exitProgress
  }
}

// New hook for floating elements that respond to scroll position
export const useFloatingElement = (amplitude = 20, frequency = 0.001) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [transformY, setTransformY] = useState(0)
  const [rotation, setRotation] = useState(0)
  
  useEffect(() => {
    if (!element) return
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const rect = element.getBoundingClientRect()
      
      // Only animate when element is in or near viewport
      if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
        // Create a smooth wave effect based on scroll position
        const sinValue = Math.sin(scrollY * frequency)
        const newTransformY = sinValue * amplitude
        const newRotation = sinValue * (amplitude / 10)
        
        setTransformY(newTransformY)
        setRotation(newRotation)
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [element, amplitude, frequency])
  
  return {
    ref: setElement,
    style: {
      transform: `translateY(${transformY}px) rotate(${rotation}deg)`,
      transition: 'transform 0.2s ease-out',
      willChange: 'transform'
    }
  }
}

// New hook for scroll-driven animations
export const useScrollAnimation = (startThreshold = 0.1, endThreshold = 0.9) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (!element) return
    
    const updateProgress = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate how far the element has progressed through the viewport
      // 0 when it first enters, 1 when it's about to exit
      let scrollProgress
      
      if (rect.top >= viewportHeight) {
        // Element hasn't entered viewport yet
        scrollProgress = 0
      } else if (rect.bottom <= 0) {
        // Element has exited viewport
        scrollProgress = 1
      } else {
        // Element is partially in viewport
        // Adjust calculations to match threshold values
        const totalDistance = viewportHeight * (1 + endThreshold - startThreshold)
        const traveled = viewportHeight - rect.top + (viewportHeight * startThreshold)
        scrollProgress = Math.max(0, Math.min(1, traveled / totalDistance))
      }
      
      setProgress(scrollProgress)
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [element, startThreshold, endThreshold])
  
  return {
    ref: setElement,
    progress
  }
}
