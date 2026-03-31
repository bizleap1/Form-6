import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/data/products'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const line = searchParams.get('line')
  const goal = searchParams.get('goal')
  const format = searchParams.get('format')
  const maxPrice = searchParams.get('maxPrice')
  const slug = searchParams.get('slug')

  let result = [...products]

  if (slug) {
    const product = result.find(p => p.slug === slug)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json(product)
  }

  if (line) result = result.filter(p => p.line === line)
  if (goal) result = result.filter(p => p.goal === goal)
  if (format) result = result.filter(p => p.format === format)
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice))

  return NextResponse.json({ products: result, total: result.length })
}
