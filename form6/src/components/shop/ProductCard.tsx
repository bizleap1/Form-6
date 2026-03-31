'use client'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useToast } from '@/components/ui/Toast'
import ProductBottle from '@/components/ui/ProductBottle'
import StarRating from '@/components/ui/StarRating'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleWishlist, isWishlisted } = useCartStore()
  const { showToast, ToastContainer } = useToast()
  const wishlisted = isWishlisted(product.id)
  const isCore = product.line === 'core'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    showToast(`🛒 ${product.name} added to cart`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
    showToast(wishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist')
  }

  return (
    <>
      <ToastContainer />
      <Link href={`/product/${product.slug}`} className="group block no-underline">
        <div className="rounded-xl overflow-hidden bg-white border border-grey-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
          {/* Image area */}
          <div className={`relative h-[220px] flex items-center justify-center overflow-hidden ${
            isCore
              ? 'bg-gradient-to-br from-teal-50 to-[#e0f4f3]'
              : 'bg-gradient-to-br from-amber-50 to-[#f5ead5]'
          }`}>
            <ProductBottle line={product.line} name={product.name} size="sm" animate />

            {product.badge && (
              <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy text-white">
                {product.badge}
              </div>
            )}

            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Heart
                size={14}
                className={wishlisted ? 'fill-red-500 text-red-500' : 'text-grey-400'}
              />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2.5 ${
              isCore ? 'bg-teal/10 text-teal' : 'bg-amber-100 text-amber-700'
            }`}>
              {isCore ? '⚡' : '✦'} {product.goal}
            </div>

            <h3 className="text-[15px] font-extrabold text-navy mb-1.5 leading-snug group-hover:text-teal transition-colors">
              {product.name}
            </h3>
            <p className="text-[12px] text-grey-600 mb-4 leading-relaxed line-clamp-2">
              {product.benefit}
            </p>

            <div className="flex items-center justify-between mb-3.5">
              <div className="text-[19px] font-extrabold text-navy">
                {formatPrice(product.price)}
                <span className="text-[11px] font-medium text-grey-400 ml-1">/ {product.servings} srv</span>
              </div>
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-[10px] bg-navy text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-teal transition-colors duration-300"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </>
  )
}
