'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #1cb8a8 0%, #0fa898 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 flex-wrap">
          <div>
            <h3 className="font-serif text-3xl text-white mb-2"
              style={{ fontFamily: 'DM Serif Display, serif' }}>
              Stay at the forefront of nutrition science.
            </h3>
            <p className="text-[15px] text-white/75">Weekly research digests, formulation insights, and exclusive subscriber offers.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {sent ? (
              <div className="bg-white/20 text-white font-bold px-6 py-4 rounded-full text-sm">
                ✅ Subscribed! Welcome to Form6.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 min-w-[260px] px-5 py-3.5 rounded-full border-none text-[14px] text-navy font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                <Button variant="navy" onClick={handleSubmit}>Subscribe</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
