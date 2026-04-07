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

      addItem: (product: Product, qty: number = 1) => {
        const existing = get().items.find((i) => i.product.id === product.id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
          })
          return
        }
        set({ items: [...get().items, { product, quantity: qty }] })
      },

      removeItem: (productId: number) => set({ items: get().items.filter((i: CartItem) => i.product.id !== productId) }),

      updateQty: (productId: number, qty: number) => {
        if (qty < 1) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((i: CartItem) =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (product) => {
        const exists = get().wishlist.find((p) => p.id === product.id)
        if (exists) {
          set({
            wishlist: get().wishlist.filter((p) => p.id !== product.id),
          })
        } else {
          set({ wishlist: [...get().wishlist, product] })
        }
      },

      isWishlisted: (productId) => get().wishlist.some((p) => p.id === productId),

      total: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'form6-cart-storage',
    }
  )
)

