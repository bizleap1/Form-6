'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProductGrid from '@/components/shop/ProductGrid'
import Button from '@/components/ui/Button'
import { products } from '@/data/products'
import { ArrowRight } from 'lucide-react'

const goals = ['All', 'Recovery', 'Sleep', 'Focus', 'Energy', 'Immunity', 'Longevity']

export default function FeaturedProducts() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? products.slice(0, 6)
    : products.filter(p => p.goal === active).slice(0, 6)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-teal mb-3">Our Formulations</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}>
            Two Lines. One Purpose.
          </h2>
          <p className="text-[16px] text-grey-600 max-w-[520px] mx-auto leading-relaxed">
            Engineered for distinct performance goals — from elite athletic recovery to sustained professional cognition.
          </p>
        </div>

        {/* Line cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-up">
          {[
            { line: 'core', label: 'FORM6 CORE', sub: 'Maximum performance for serious athletes', letter: 'C', href: '/shop?line=core', bg: 'from-navy to-navy-mid', btn: 'outline-white' },
            { line: 'prime', label: 'FORM6 PRIME', sub: 'Daily performance and longevity for busy professionals', letter: 'P', href: '/shop?line=prime', bg: 'from-[#2a2010] to-[#3d300f]', btn: 'gold' },
          ].map(card => (
            <div
              key={card.line}
              className={`relative rounded-xl p-9 bg-gradient-to-br ${card.bg} overflow-hidden hover:-translate-y-1 transition-transform duration-300 cursor-pointer`}
            >
              <div className="absolute top-6 right-8 text-[64px] font-extrabold opacity-[0.06] text-white leading-none"
                style={{ fontFamily: 'DM Serif Display, serif' }}>
                {card.letter}
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-white/50 mb-2">Product Line</div>
              <div className="font-serif text-3xl text-white mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>{card.label}</div>
              <div className="text-[14px] text-white/65 mb-6">{card.sub}</div>
              <Link href={card.href}>
                <Button variant="outline-white" size="sm">Explore {card.line.toUpperCase()} →</Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Goal filters */}
        <div className="flex flex-wrap gap-2 mb-9 items-center animate-fade-up">
          <span className="text-[13px] font-bold text-grey-600 mr-2">Filter:</span>
          {goals.map(goal => (
            <button
              key={goal}
              onClick={() => setActive(goal)}
              className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] font-semibold transition-all duration-200 ${
                active === goal
                  ? 'border-teal text-teal bg-teal/8'
                  : 'border-grey-200 text-grey-600 hover:border-teal hover:text-teal'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        <div className="animate-fade-up">
          <ProductGrid products={filtered} cols={3} />
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View All Products
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
