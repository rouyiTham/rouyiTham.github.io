import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Tham Rou Yi - Portfolio',
  description: 'Portfolio of Rouyi Tham, Computer Scientist and Developer specializing in algorithms, web development, and software solutions.',
  keywords: ['Computer Science', 'Developer', 'Portfolio', 'Algorithms', 'Web Development', 'Scala', 'Python'],
  icons: {
    icon: [
      {
        url: '/images/sitelogo.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/sitelogo.png',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Tham Rou Yi - Portfolio',
    description: 'Computer Scientist & Developer specializing in algorithms and software solutions',
    images: [
      {
        url: '/images/profile_pic.jpeg',
        width: 800,
        height: 800,
        alt: 'Tham Rou Yi',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth light" style={{ colorScheme: 'light' }}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
