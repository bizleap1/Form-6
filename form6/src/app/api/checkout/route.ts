import { NextRequest, NextResponse } from 'next/server'

/**
 * Checkout API — Stripe integration ready.
 *
 * To enable Stripe:
 * 1. npm install stripe
 * 2. Add STRIPE_SECRET_KEY to .env.local
 * 3. Uncomment the Stripe blocks below
 */

// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })

interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
}

interface OrderPayload {
  items: OrderItem[]
  shipping: { firstName: string; lastName: string; email: string; address: string; city: string; postcode: string; country: string }
  couponCode?: string
  paymentMethod: string
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json()
    const { items, shipping, couponCode, paymentMethod } = body

    if (!items?.length) return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    if (!shipping?.email) return NextResponse.json({ error: 'Shipping details required' }, { status: 400 })

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = couponCode === 'FORM6LAUNCH' || couponCode === 'WELCOME10' ? subtotal * 0.1 : 0
    const discountedSubtotal = subtotal - discount
    const shippingCost = discountedSubtotal >= 60 ? 0 : 6.9
    const total = discountedSubtotal + shippingCost

    const orderId = `F6-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`

    // ── Stripe Payment Intent (uncomment when STRIPE_SECRET_KEY is set) ──
    // if (paymentMethod === 'card') {
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: Math.round(total * 100), // cents
    //     currency: 'eur',
    //     metadata: { orderId, email: shipping.email },
    //     receipt_email: shipping.email,
    //   })
    //   return NextResponse.json({ orderId, clientSecret: paymentIntent.client_secret, total })
    // }

    // TODO: persist order to database (Supabase / Firebase / Prisma)

    return NextResponse.json({
      success: true,
      orderId,
      total,
      discount,
      shippingCost,
      message: 'Order received. Payment processing will be integrated via Stripe.',
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
