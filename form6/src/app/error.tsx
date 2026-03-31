'use client'
import Button from '@/components/ui/Button'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-grey-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl mb-5">⚗️</div>
        <h2 className="font-serif text-3xl text-navy mb-3" style={{ fontFamily: 'DM Serif Display,serif' }}>Something went wrong</h2>
        <p className="text-grey-600 mb-8">An unexpected error occurred. Please try again.</p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  )
}
