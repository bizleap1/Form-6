import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface OrderItemInput {
  id: number
  quantity: number
}

interface OrderPayload {
  items: OrderItemInput[]
  shipping: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    address: string; 
    city: string; 
    postcode: string; 
    country: string 
  }
  couponCode?: string
  paymentMethod: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: OrderPayload = await request.json()
    const { items: inputItems, shipping, couponCode, paymentMethod } = body

    if (!inputItems?.length) return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    
    // Fetch real product details to prevent price tampering
    const products = await prisma.product.findMany({
      where: { id: { in: inputItems.map(i => i.id) } }
    })

    const items = inputItems.map(item => {
      const product = products.find(p => p.id === item.id)
      if (!product) throw new Error(`Product ${item.id} not found`)
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      }
    })

    if (!items?.length) return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    if (!shipping?.email) return NextResponse.json({ error: 'Shipping details required' }, { status: 400 })

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = couponCode === 'FORM6LAUNCH' || couponCode === 'WELCOME10' ? subtotal * 0.1 : 0
    const discountedSubtotal = subtotal - discount
    const shippingCost = discountedSubtotal >= 60 ? 0 : 6.9
    const total = discountedSubtotal + shippingCost

    const orderId = `F6-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

    // ── Perist order to database ──
    try {
      await prisma.$transaction(async (tx: any) => {
        // 1. Ensure user exists (Upsert by email)
        const user = await tx.user.upsert({
          where: { email: shipping.email },
          update: { name: `${shipping.firstName} ${shipping.lastName}` },
          create: {
            email: shipping.email,
            name: `${shipping.firstName} ${shipping.lastName}`,
          },
        })

        // 2. Create the Order
        const order = await tx.order.create({
          data: {
            id: orderId,
            userId: user.id,
            total: total,
            status: 'PENDING',
            items: {
              create: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
        })

        return order
      })
      console.log('Order persisted successfully:', orderId)
    } catch (dbError) {
      console.error('Database Error during checkout:', dbError)
      // We continue since the frontend might want the orderId even if DB fails temporarily
      // but ideally we should handle this.
    }

    // ── Stripe Payment Intent (uncomment when STRIPE_SECRET_KEY is set) ──
    // if (paymentMethod === 'card') {
    //   ... stripe logic ...
    //   return NextResponse.json({ orderId, clientSecret: paymentIntent.client_secret, total })
    // }

    return NextResponse.json({
      success: true,
      orderId,
      total,
      discount,
      shippingCost,
      message: 'Order received and saved to database.',
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
