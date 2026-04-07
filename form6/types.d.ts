declare module 'zustand' {
  interface StoreApi<T> {
    getState: () => T
    subscribe: <U>(
      selector: (state: T) => U,
      callback: (selectedState: U, previousSelectedState: U) => void,
      fireImmediately?: boolean
    ) => () => void
  }

  export function create<T>(initializer: () => T): StoreApi<T>
  export function persist(...args: any[]): any
}

declare module 'zustand/middleware' {
  export function persist(...args: any[]): any
}

declare module 'react-hook-form' {
  export function useForm<T>(options?: any): any
}

declare module 'lucide-react' {
  const icons: any
  export * as Icons from 'lucide-react'
  const LogIn: any
  export { LogIn }
  const Mail: any
  export { Mail }
  const Lock: any
  export { Lock }
  const ArrowRight: any
  export { ArrowRight }
  const CheckCircle2: any
  export { CheckCircle2 }
  const User: any
  export { User }
  const Trash2: any
  export { Trash2 }
  const ShoppingBag: any
  export { ShoppingBag }
  const Search: any
  export { Search }
  const Heart: any
  export { Heart }
  const Menu: any
  export { Menu }
  const X: any
  export { X }
}

declare module 'tailwind-merge' {
  const twMerge: any
  export default twMerge
}

declare module 'clsx' {
  const clsx: any
  export default clsx
}

