import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Form6 — Precision Nutraceuticals',
    template: '%s | Form6',
  },
  description: 'Scientifically engineered nutraceuticals for measurable results. FORM6 CORE for athletes. FORM6 PRIME for professionals.',
  keywords: ['nutraceuticals', 'supplements', 'sports nutrition', 'performance', 'nootropics', 'recovery'],
  openGraph: {
    title: 'Form6 — Precision Nutraceuticals',
    description: 'Scientifically engineered nutraceuticals for measurable results.',
    type: 'website',
    locale: 'en_EU',
    siteName: 'Form6',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-navy">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
