import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-grey-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-7xl mb-6">🔬</div>
        <h1 className="font-serif text-5xl text-navy mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>404</h1>
        <h2 className="text-2xl font-bold text-navy mb-3">Page not found</h2>
        <p className="text-grey-600 mb-8 leading-relaxed">
          This page doesn&apos;t exist. But our precision-formulated nutraceuticals do — and they&apos;re waiting for you.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/"><Button>Go Home</Button></Link>
          <Link href="/shop"><Button variant="outline">Browse Products</Button></Link>
        </div>
      </div>
    </div>
  )
}
