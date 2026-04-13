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

const storeCreator = (set: any, get: any): CartStore => ({
  items: [],
  wishlist: [],

  addItem: (product: Product, qty: number = 1) => {
    const items = get().items
    const existing = items.find((i: CartItem) => i.product.id === product.id)
    if (existing) {
      set({
        items: items.map((i: CartItem) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        ),
      })
      return
    }
    set({ items: [...items, { product, quantity: qty }] })
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

  toggleWishlist: (product: Product) => {
    const wishlist = get().wishlist
    const exists = wishlist.find((p: Product) => p.id === product.id)
    if (exists) {
      set({
        wishlist: wishlist.filter((p: Product) => p.id !== product.id),
      })
    } else {
      set({ wishlist: [...wishlist, product] })
    }
  },

  isWishlisted: (productId: number) => get().wishlist.some((p: Product) => p.id === productId),

  total: () => get().items.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0),

  count: () => get().items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
})

// @ts-ignore
export const useCartStore = create(
  persist(storeCreator, {
    name: 'form6-cart-storage',
  })
) as any
