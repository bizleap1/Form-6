import ProductCard from './ProductCard'
import type { Product } from '@/data/products'

interface ProductGridProps {
  products: Product[]
  cols?: 2 | 3 | 4
}

export default function ProductGrid({ products, cols = 3 }: ProductGridProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[cols]

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-grey-400">
        <div className="text-5xl mb-4">🔬</div>
        <p className="font-semibold text-lg">No products found</p>
        <p className="text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={`grid ${colClass} gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
