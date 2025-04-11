import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.4' },
        },
        "glow": {
          '0%, 100%': { 
            opacity: '0.8',
            filter: 'saturate(100%) blur(8px)'
          },
          '50%': { 
            opacity: '0.5',
            filter: 'saturate(150%) blur(10px)'
          },
        },
        "flip": {
          '0%': { 
            transform: 'rotateY(0deg)'
          },
          '100%': { 
            transform: 'rotateY(180deg)'
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
        "flip": "flip 0.6s ease-out forwards",
      },
      transitionDelay: {
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionProperty: {
        'glow': 'filter, opacity',
      },
      // Custom utilities for 3D card flipping
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'flat': 'flat',
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      transitionDuration: {
        '600': '600ms',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add plugin for custom utilities
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective': {
          perspective: '1000px',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config

export default config
