import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Maria Kuris - Corporate Lawyer | Especialista en Derecho Corporativo',
  description: 'Maria Kuris - Corporate Lawyer | Especialista en Derecho Corporativo',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
