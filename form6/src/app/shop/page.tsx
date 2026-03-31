'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductGrid from '@/components/shop/ProductGrid'
import ShopSidebar from '@/components/shop/ShopSidebar'
import { products } from '@/data/products'

function ShopContent() {
  const searchParams = useSearchParams()
  const lineParam = searchParams.get('line')

  const [filters, setFilters] = useState({
    lines: lineParam ? [lineParam] : ['core', 'prime'],
    goals: [] as string[],
    formats: [] as string[],
    maxPrice: 100,
  })
  const [sort, setSort] = useState('bestseller')

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (!filters.lines.includes(p.line)) return false
      if (filters.goals.length && !filters.goals.includes(p.goal)) return false
      if (filters.formats.length && !filters.formats.includes(p.format)) return false
      if (p.price > filters.maxPrice) return false
      return true
    })
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') result = [...result].reverse()
    return result
  }, [filters, sort])

  return (
    <div className="pt-[72px] min-h-screen">
      {/* Page header */}
      <div className="bg-grey-50 border-b border-grey-100 py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-2">Our Products</div>
          <h1 className="font-serif text-4xl text-navy mb-2"
            style={{ fontFamily: 'DM Serif Display, serif' }}>All Formulations</h1>
          <p className="text-grey-600 text-[15px]">Precision-engineered nutraceuticals for elite performance and daily wellness</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar */}
          <ShopSidebar filters={filters} onChange={setFilters} />

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <span className="text-[14px] text-grey-600 font-semibold">{filtered.length} products</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="px-4 py-2.5 rounded-[10px] border-[1.5px] border-grey-200 text-[13px] font-semibold text-navy bg-white outline-none focus:border-teal cursor-pointer"
              >
                <option value="bestseller">Sort: Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            <ProductGrid products={filtered} cols={3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-[72px] min-h-screen flex items-center justify-center text-grey-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
