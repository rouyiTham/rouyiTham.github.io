import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'portfolio-rouyi',
  description: 'Portfolio of Rouyi Tham, Computer Scientist and Developer specializing in algorithms, web development, and software solutions.',
  keywords: ['Computer Science', 'Developer', 'Portfolio', 'Algorithms', 'Web Development', 'Scala', 'Python'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="icon" href="/favicon.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpeg" />
      </head>
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
