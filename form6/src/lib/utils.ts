import clsx from 'clsx'
// @ts-ignore
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function calculateVAT(amount: number, rate = 0.19): number {
  return amount * rate
}

export function calculateShipping(subtotal: number, threshold = 60): number {
  return subtotal >= threshold ? 0 : 6.90
}
