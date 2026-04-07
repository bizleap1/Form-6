import { create } from 'zustand'
import { persist, type PersistOptions } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
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

type CartPersist = (
  config: StateCreator<CartStore>,
  options: PersistOptions<CartStore>
) => StateCreator<CartStore>

export const useCartStore = create<CartStore>()(
  (persist as CartPersist)(
    (set, get) => ({
      items: [],
      wishlist: [],

      addItem: (product: Product, qty = 1) => {
        set((state: CartStore) => {
          const existing = state.items.find((i: CartItem) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i: CartItem) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              )
            }
          }
          return { items: [...state.items, { product, quantity: qty }] }
        })
      },

      removeItem: (productId: number) => {
        set((state: CartStore) => ({ items: state.items.filter((i: CartItem) => i.product.id !== productId) }))
      },

      updateQty: (productId: number, qty: number) => {
        if (qty < 1) { get().removeItem(productId); return }
        set((state: CartStore) => ({
          items: state.items.map((i: CartItem) =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleWishlist: (product: Product) => {
        set((state: CartStore) => {
          const exists = state.wishlist.find((p: Product) => p.id === product.id)
          return {
            wishlist: exists
              ? state.wishlist.filter((p: Product) => p.id !== product.id)
              : [...state.wishlist, product]
          }
        })
      },

      isWishlisted: (productId: number) => {
        return get().wishlist.some((p: Product) => p.id === productId)
      },

      total: () => {
        return get().items.reduce(
          (sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0
        )
      },

      count: () => {
        return get().items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      },
    }),
    { name: 'form6-cart' }
  )
)
