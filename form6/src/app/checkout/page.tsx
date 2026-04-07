'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { formatPrice, calculateVAT, calculateShipping } from '@/lib/utils'
import Button from '@/components/ui/Button'
import * as Icons from 'lucide-react'
import { useRouter } from 'next/navigation'

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'upi'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postcode: string
  country: string
}

const EU_COUNTRIES = ['Germany', 'Austria', 'Switzerland', 'Netherlands', 'Belgium', 'France', 'Italy', 'Spain', 'Poland', 'Sweden', 'Denmark', 'Norway', 'Finland', 'United Kingdom', 'Ireland', 'India', 'Other']

export default function CheckoutPage() {
  const router = useRouter()
  const cartStore = useCartStore() // Fix: useCartStore() call
  const { items, total, removeItem, updateQty, clearCart } = cartStore
  const [payMethod, setPayMethod] = useState<PaymentMethod>('card')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
  })

  // Guest checkout: removed session hooks and automatic form filling

  const subtotal = total()
  const discount = couponApplied ? subtotal * 0.1 : 0
  const discountedSubtotal = subtotal - discount
  const shipping = calculateShipping(discountedSubtotal)
  const vat = calculateVAT(discountedSubtotal)
  const orderTotal = discountedSubtotal + shipping

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FORM6LAUNCH' || couponCode.toUpperCase() === 'WELCOME10') {
      setCouponApplied(true)
    } else {
      alert('Invalid coupon code')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i: any) => ({ id: i.product.id, quantity: i.quantity })),
          shipping: formData,
          total: orderTotal,
          paymentMethod: payMethod
        })
      })

      if (res.ok) {
        setOrderPlaced(true)
        clearCart()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to place order')
      }
    } catch (err) {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="pt-[72px] min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6 py-20">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="font-serif text-4xl text-navy mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Order Confirmed!</h1>
          <p className="text-grey-600 mb-8">Thank you for your order. A confirmation has been sent to your email. Your Form6 products will be dispatched within 1–2 business days.</p>
          <div className="bg-teal/10 border border-teal/20 rounded-xl p-5 mb-8">
            <div className="text-[13px] font-bold text-teal mb-1">Expected Delivery</div>
            <div className="text-navy font-semibold">3–5 business days (EU Standard)</div>
          </div>
          <Link href="/shop"><Button size="lg">Continue Shopping</Button></Link>
        </div>
      </div>
    )
  }



  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-[72px] min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6 py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="font-serif text-3xl text-navy mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Your cart is empty</h1>
          <p className="text-grey-600 mb-8">Discover our precision-formulated nutraceuticals and add them to your cart.</p>
          <Link href="/shop"><Button size="lg">Browse Products</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-[72px] min-h-screen bg-grey-50">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-[13px] font-semibold text-grey-400 hover:text-teal transition-colors no-underline">
            <Icons.ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-2">Secure Checkout</div>
        <h1 className="font-serif text-4xl text-navy mb-10" style={{ fontFamily: 'DM Serif Display, serif' }}>Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Shipping */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-[18px] font-extrabold text-navy mb-6 pb-4 border-b border-grey-100">Contact & Shipping</h2>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-bold text-grey-600 mb-1.5">First Name</label>
                    <input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                      placeholder="Johann"
                      className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Last Name</label>
                    <input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                      placeholder="Schmidt"
                      className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Email Address</label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                </div>
                <div className="mb-4">
                  <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Street Address</label>
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required 
                    placeholder="123 Hauptstraße"
                    className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-bold text-grey-600 mb-1.5">City</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required 
                      placeholder="Berlin"
                      className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Postcode</label>
                    <input 
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      required 
                      placeholder="10115"
                      className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Country</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none bg-white transition-all cursor-pointer"
                  >
                    <option value="">Select Country</option>
                    {EU_COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-[18px] font-extrabold text-navy mb-6 pb-4 border-b border-grey-100">Payment Method</h2>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {([
                  { key: 'card', icon: '💳', label: 'Card' },
                  { key: 'paypal', icon: '🅿️', label: 'PayPal' },
                  { key: 'apple', icon: '', label: 'Apple Pay' },
                  { key: 'upi', icon: '🌐', label: 'UPI' },
                ] as const).map(pm => (
                  <button
                    key={pm.key}
                    type="button"
                    onClick={() => setPayMethod(pm.key)}
                    className={`flex flex-col items-center gap-1 py-3 rounded-[10px] border-[1.5px] transition-all duration-200 text-[12px] font-bold ${
                      payMethod === pm.key
                        ? 'border-teal text-teal bg-teal/5'
                        : 'border-grey-200 text-grey-600 hover:border-teal/50'
                    }`}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    {pm.label}
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Card Number</label>
                    <input placeholder="1234 5678 9012 3456" maxLength={19}
                      className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-grey-600 mb-1.5">Expiry</label>
                      <input placeholder="MM / YY" maxLength={7}
                        className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-grey-600 mb-1.5">CVV</label>
                      <input placeholder="•••" maxLength={4} type="password"
                        className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-grey-200 focus:border-teal focus:ring-2 focus:ring-teal/10 text-[14px] text-navy outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}
              {payMethod !== 'card' && (
                <div className="text-center py-8 bg-grey-50 rounded-xl border-2 border-dashed border-grey-200">
                  <div className="text-3xl mb-2">
                    {payMethod === 'paypal' ? '🅿️' : payMethod === 'apple' ? '' : '🌐'}
                  </div>
                  <p className="text-[14px] text-grey-600 font-semibold">
                    You will be redirected to {payMethod === 'paypal' ? 'PayPal' : payMethod === 'apple' ? 'Apple Pay' : 'UPI'} to complete payment
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 mt-5 px-4 py-3.5 bg-teal/5 border border-teal/15 rounded-[10px] text-[13px] text-teal font-semibold">
                🔒 Secured by 256-bit SSL encryption via Stripe
              </div>

              <Button
                size="lg"
                className="w-full mt-6 justify-center"
                loading={loading}
                type="submit"
              >
                <Icons.ShoppingBag size={16} />
                Place Order · {formatPrice(orderTotal)}
              </Button>

              <p className="text-[12px] text-grey-400 text-center mt-4">
                By placing your order you agree to our{' '}
                <Link href="#" className="text-teal hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="#" className="text-teal hover:underline">Privacy Policy</Link>.
                VAT included where applicable.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-[17px] font-extrabold text-navy mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-0 mb-5">
                {items.map((item: any) => (
                  <div key={item.product.id} className="flex gap-4 items-center py-4 border-b border-grey-100">
                    <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center text-2xl flex-shrink-0 ${
                      item.product.line === 'core' ? 'bg-teal/10' : 'bg-amber-50'
                    }`}>
                      💊
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-navy leading-tight truncate">{item.product.name}</div>
                      <div className="text-[11px] text-grey-400 mt-0.5">{item.product.line.toUpperCase()} · {item.product.servings} srv</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="text-grey-400 hover:text-teal w-5 h-5 flex items-center justify-center rounded transition-colors">−</button>
                        <span className="text-[12px] font-bold text-navy w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="text-grey-400 hover:text-teal w-5 h-5 flex items-center justify-center rounded transition-colors">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-bold text-navy">{formatPrice(item.product.price * item.quantity)}</div>
                      <button onClick={() => removeItem(item.product.id)} className="text-grey-300 hover:text-red-400 transition-colors mt-1">
                        <Icons.Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              {!couponApplied ? (
                <div className="flex gap-2 mb-5">
                  <input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon code (try FORM6LAUNCH)"
                    className="flex-1 px-4 py-2.5 rounded-[10px] border-[1.5px] border-grey-200 text-[13px] text-navy outline-none focus:border-teal transition-all"
                  />
                  <Button variant="outline" size="sm" onClick={handleApplyCoupon}>Apply</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-teal/5 border border-teal/20 rounded-[10px] text-[13px] font-semibold text-teal">
                  🏷️ FORM6LAUNCH — 10% discount applied!
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-[14px]">
                  <span className="text-grey-600">Subtotal</span>
                  <span className="font-bold text-navy">{formatPrice(subtotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[14px]">
                    <span className="text-grey-600">Discount (10%)</span>
                    <span className="font-bold text-teal">−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[14px]">
                  <span className="text-grey-600">Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-teal' : 'text-navy'}`}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-grey-600">VAT (incl.)</span>
                  <span className="font-bold text-navy">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between text-[18px] font-extrabold pt-3 border-t-2 border-grey-100">
                  <span className="text-navy">Total</span>
                  <span className="text-navy">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {/* Shipping info */}
              <div className="mt-5 p-4 bg-grey-50 rounded-[10px]">
                <div className="text-[12px] font-bold text-navy mb-1.5">🚚 Shipping Estimate</div>
                <div className="text-[12px] text-grey-600 leading-relaxed">
                  EU Standard: 3–5 business days<br />
                  Express: 1–2 business days (+€9.90)
                </div>
                {shipping === 0 && (
                  <div className="mt-2 text-[11px] font-bold text-teal">✓ Free shipping applied (over €60)</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
