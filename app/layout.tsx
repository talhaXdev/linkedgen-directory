import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LinkedIn Lead Generation Tools | Compare 80+ Solutions",
    template: "%s | LinkedGen Directory"
  },
  description: "Compare 80+ LinkedIn lead gen tools with honest verdicts, speed tests, feature matrices. Find the right tool for profile optimization, content generation, and outreach.",
  keywords: [
    "LinkedIn Lead Generation Tools",
    "LinkedIn Profile Optimization Tools", 
    "LinkedIn Post Generator Tools",
    "LinkedIn Automation Tools",
    "LinkedIn Marketing",
    "LinkedIn B2B Lead Generation",
    "LinkedIn Sales Tools",
    "LinkedIn Prospecting"
  ],
  authors: [{ name: "LinkedGen Directory" }],
  creator: "LinkedGen Directory",
  publisher: "LinkedGen Directory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://linkedgen.directory'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://linkedgen.directory',
    title: 'LinkedIn Lead Generation Tools | Compare 80+ Solutions',
    description: 'Compare 80+ LinkedIn lead gen tools with honest verdicts, speed tests, feature matrices. Find the right tool for profile optimization, content generation, and outreach.',
    siteName: 'LinkedGen Directory',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Lead Generation Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Lead Generation Tools | Compare 80+ Solutions',
    description: 'Compare 80+ LinkedIn lead gen tools with honest verdicts, speed tests, feature matrices.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
