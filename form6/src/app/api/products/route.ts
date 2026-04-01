import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const line = searchParams.get('line')
  const goal = searchParams.get('goal')
  const format = searchParams.get('format')
  const maxPrice = searchParams.get('maxPrice')
  const slug = searchParams.get('slug')

  try {
    if (slug) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { ingredients: true, benefits: true }
      })

      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

      return NextResponse.json({
        ...product,
        usage: product.usage ? product.usage.split('\n') : [],
        whoFor: product.whoFor ? product.whoFor.split('\n') : []
      })
    }

    const whereClause: any = {}
    if (line) whereClause.line = line
    if (goal) whereClause.goal = goal
    if (format) whereClause.format = format
    if (maxPrice) whereClause.price = { lte: Number(maxPrice) }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: { ingredients: true, benefits: true }
    })

    const formattedProducts = products.map((p: any) => ({
      ...p,
      usage: p.usage ? p.usage.split('\n') : [],
      whoFor: p.whoFor ? p.whoFor.split('\n') : []
    }))

    return NextResponse.json({ products: formattedProducts, total: formattedProducts.length })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
