import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/navbar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'TMS - Transportation Management System',
  description: 'A comprehensive transportation management system for students and staff',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <Navbar />
          <main className="lg:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 