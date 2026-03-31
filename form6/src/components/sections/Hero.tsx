'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import ProductBottle from '@/components/ui/ProductBottle'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [coreStyle, setCoreStyle] = useState({ borderColor: undefined })
  const [primeStyle, setPrimeStyle] = useState({ borderColor: undefined })

  const cards = [
    { line: 'core', icon: '⚡', label: 'FORM6 CORE', sub: 'High-performance for athletes', href: '/shop?line=core' },
    { line: 'prime', icon: '✦', label: 'FORM6 PRIME', sub: 'Daily wellness for professionals', href: '/shop?line=prime' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]"
      style={{ background: 'linear-gradient(160deg, #0d1b2a 0%, #1a3a5c 55%, #0f2a3d 100%)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(28,184,168,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(28,184,168,0.08) 0%, transparent 40%)'
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left */}
        <div className="animate-fade-up">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-teal mb-6 px-3.5 py-1.5 rounded-full border border-teal/30 bg-teal/8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-dot" />
            Precision Science · Premium Nutrition
          </div>

          <h1 className="font-serif text-5xl lg:text-6xl xl:text-[64px] text-white leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: 'DM Serif Display, serif' }}>
            Precision<br />Formulated<br />
            <em className="text-teal not-italic">Performance</em><br />Nutrition
          </h1>

          <p className="text-[17px] text-white/65 leading-relaxed mb-10 max-w-[440px]">
            Scientifically engineered nutraceuticals for measurable results. Backed by peer-reviewed research, crafted for excellence.
          </p>

          <div className="flex flex-wrap gap-4 items-center mb-12">
            <Link href="/shop">
              <Button size="lg">
                Explore Products
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/science">
              <Button size="lg" variant="outline-white">The Science</Button>
            </Link>
          </div>

          {/* Path cards */}
          <div className="grid grid-cols-2 gap-4 animate-fade-up animate-delay-3">
            {cards.map(card => {
              const isCore = card.line === 'core'
              const style = isCore ? coreStyle : primeStyle
              const setStyle = isCore ? setCoreStyle : setPrimeStyle

              return (
                <Link
                  key={card.line}
                  href={card.href}
                  className="group block no-underline bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/9 hover:-translate-y-0.5 transition-all duration-300"
                  style={style}
                  onMouseEnter={() => setStyle({ borderColor: isCore ? '#1cb8a8' : '#c9a84c' })}
                  onMouseLeave={() => setStyle({ borderColor: 'rgba(255,255,255,0.10)' })}
                >
                  <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center text-xl mb-3 ${
                    card.line === 'core' ? 'bg-teal/15' : 'bg-amber-400/15'
                  }`}>
                    {card.icon}
                  </div>
                  <div className="font-extrabold text-white text-[15px] mb-1">{card.label}</div>
                  <div className="text-[12px] text-white/50">{card.sub}</div>
                  <div className="text-white/30 text-lg mt-2 group-hover:text-teal group-hover:translate-x-1 transition-all duration-300">→</div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right — product display */}
        <div className="hidden lg:flex justify-center items-center animate-fade-up animate-delay-2">
          <div className="relative w-[440px] h-[440px] flex items-center justify-center">
            {/* Orbit rings */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-teal/20 animate-spin-slow" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-teal/12 animate-spin-slow-rv" />

            {/* Bottle */}
            <div className="relative z-10 animate-float">
              <ProductBottle line="core" name="Advanced Recovery" size="hero" />
            </div>

            {/* Floating badges */}
            {[
              { pos: 'top-6 right-0', icon: '🔬', title: 'Research Backed', sub: 'Clinical Formulation' },
              { pos: 'bottom-16 -left-8', icon: '✓', title: 'GMP Certified', sub: 'EU Compliant' },
              { pos: '-bottom-2 right-2', icon: '⭐', title: '4.9 / 5.0', sub: '2,400+ Reviews' },
            ].map(badge => (
              <div
                key={badge.title}
                className={`absolute ${badge.pos} bg-white rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-2xl z-20 whitespace-nowrap`}
              >
                <span className="text-xl">{badge.icon}</span>
                <div>
                  <div className="text-[11px] font-extrabold text-navy">{badge.title}</div>
                  <div className="text-[10px] text-grey-400 font-medium">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
