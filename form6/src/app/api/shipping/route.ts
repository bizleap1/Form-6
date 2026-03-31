import { NextRequest, NextResponse } from 'next/server'

const SHIPPING_RATES: Record<string, { standard: number; express: number; freeThreshold: number }> = {
  DE: { standard: 4.90, express: 9.90, freeThreshold: 60 },
  AT: { standard: 5.90, express: 11.90, freeThreshold: 60 },
  CH: { standard: 8.90, express: 14.90, freeThreshold: 80 },
  FR: { standard: 6.90, express: 12.90, freeThreshold: 65 },
  NL: { standard: 5.90, express: 11.90, freeThreshold: 60 },
  GB: { standard: 7.90, express: 13.90, freeThreshold: 75 },
  DEFAULT: { standard: 9.90, express: 18.90, freeThreshold: 80 },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const country = (searchParams.get('country') || 'DEFAULT').toUpperCase()
  const orderTotal = Number(searchParams.get('total') || 0)

  const rates = SHIPPING_RATES[country] ?? SHIPPING_RATES.DEFAULT
  const standardCost = orderTotal >= rates.freeThreshold ? 0 : rates.standard
  const isFreeShipping = orderTotal >= rates.freeThreshold

  return NextResponse.json({
    country,
    orderTotal,
    freeThreshold: rates.freeThreshold,
    isFreeShipping,
    options: [
      {
        id: 'standard',
        label: 'EU Standard',
        description: '3–5 business days',
        cost: standardCost,
        free: isFreeShipping,
      },
      {
        id: 'express',
        label: 'Express',
        description: '1–2 business days',
        cost: rates.express,
        free: false,
      },
    ],
  })
}
