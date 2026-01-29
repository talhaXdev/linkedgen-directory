import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Best LinkedIn Lead Generation Tools 2026 | LinkedGen Tools',
    template: '%s | LinkedGen Tools',
  },
  description:
    'Compare 80+ LinkedIn lead generation tools with speed tests, safety ratings, and honest reviews. Find the best tools for prospecting, outreach, and content.',
  keywords: [
    'LinkedIn tools',
    'lead generation',
    'LinkedIn automation',
    'prospecting tools',
    'LinkedIn outreach',
    'sales tools',
  ],
  authors: [{ name: 'LinkedGen Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'LinkedGen Tools',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#0A66C2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
