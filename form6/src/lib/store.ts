import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  wishlist: Product[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  clearCart: () => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: number) => boolean
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],

      addItem: (product, qty = 1) => {
        set(state => {
          const existing = state.items.find(i => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              )
            }
          }
          return { items: [...state.items, { product, quantity: qty }] }
        })
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }))
      },

      updateQty: (productId, qty) => {
        if (qty < 1) { get().removeItem(productId); return }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (product) => {
        set(state => {
          const exists = state.wishlist.find(p => p.id === product.id)
          return {
            wishlist: exists
              ? state.wishlist.filter(p => p.id !== product.id)
              : [...state.wishlist, product]
          }
        })
      },

      isWishlisted: (productId) => {
        return get().wishlist.some(p => p.id === productId)
      },

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity, 0
        )
      },

      count: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    { name: 'form6-cart' }
  )
)
