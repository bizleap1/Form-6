'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingBag, Minus, Plus, Check } from 'lucide-react'
import { products } from '@/data/products'
import { useCartStore } from '@/lib/store'
import { useToast } from '@/components/ui/Toast'
import ProductBottle from '@/components/ui/ProductBottle'
import StarRating from '@/components/ui/StarRating'
import ProductGrid from '@/components/shop/ProductGrid'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

const TABS = ['Ingredients', 'The Science', 'Usage', 'Reviews', 'FAQ'] as const
type Tab = typeof TABS[number]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('Ingredients')
  const [activeThumb, setActiveThumb] = useState(0)
  const { addItem, toggleWishlist, isWishlisted } = useCartStore()
  const { showToast, ToastContainer } = useToast()
  const wishlisted = isWishlisted(product.id)
  const isCore = product.line === 'core'

  const related = products.filter(p => p.id !== product.id && (p.line === product.line || p.goal === product.goal)).slice(0, 3)

  const handleAddToCart = () => {
    addItem(product, qty)
    showToast(`🛒 ${product.name} added to cart`)
  }

  return (
    <div className="pt-[72px]">
      <ToastContainer />
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-grey-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-teal transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?line=${product.line}`} className="hover:text-teal transition-colors capitalize">{product.line.toUpperCase()}</Link>
          <span>/</span>
          <span className="text-navy font-semibold">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className={`rounded-xl h-[480px] flex items-center justify-center mb-4 relative ${
              isCore ? 'bg-gradient-to-br from-teal-50 to-[#ddf0ee]' : 'bg-gradient-to-br from-amber-50 to-[#f5ead5]'
            }`}>
              <ProductBottle line={product.line} name={product.name} size="hero" />
            </div>
            <div className="flex gap-3">
              {['💊', '📋', '🏷️', '🔬'].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-[72px] h-[72px] rounded-[10px] flex items-center justify-center text-2xl border-2 transition-all duration-200 ${
                    activeThumb === i
                      ? 'border-teal bg-teal/5'
                      : 'border-grey-200 bg-grey-50 hover:border-teal/50'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${
              isCore ? 'bg-teal/10 text-teal' : 'bg-amber-100 text-amber-700'
            }`}>
              {isCore ? '⚡ FORM6 CORE' : '✦ FORM6 PRIME'}
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl text-navy leading-tight mb-2 tracking-tight"
              style={{ fontFamily: 'DM Serif Display, serif' }}>
              {product.name}
            </h1>
            <p className="text-[16px] text-grey-600 mb-5">{product.tagline}</p>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
              {product.badge && (
                <span className="text-[12px] font-bold text-teal border-l border-grey-200 pl-3">{product.badge}</span>
              )}
            </div>

            <div className="text-[34px] font-extrabold text-navy mb-1">{formatPrice(product.price)}</div>
            <p className="text-[13px] text-grey-400 mb-7">Free shipping on orders over €60 · Subscribe &amp; save 15%</p>

            {/* Benefits */}
            <div className="mb-7">
              {product.benefits.map(b => (
                <div key={b.title} className="flex items-start gap-3 py-3 border-b border-grey-100 last:border-0">
                  <div className="w-[22px] h-[22px] rounded-full bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-navy mb-0.5">{b.title}</div>
                    <div className="text-[12px] text-grey-600 leading-relaxed">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[14px] font-bold text-grey-600">Qty:</span>
              <div className="flex items-center border-[1.5px] border-grey-200 rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-grey-50 hover:bg-teal/10 hover:text-teal flex items-center justify-center text-navy transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-[15px] font-bold text-navy">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 bg-grey-50 hover:bg-teal/10 hover:text-teal flex items-center justify-center text-navy transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-[12px] text-grey-400">{product.servings} servings / tub</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-7">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag size={16} />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-4"
                onClick={() => { toggleWishlist(product); showToast(wishlisted ? '💔 Removed from wishlist' : '❤️ Added to wishlist') }}
              >
                <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
              </Button>
            </div>

            {/* Trust mini */}
            <div className="grid grid-cols-2 gap-3 p-5 bg-grey-50 rounded-xl">
              {['🔬 Research Backed', '🏭 GMP Certified', '🚚 Free Shipping €60+', '↩️ 30-Day Returns'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[12px] font-semibold text-grey-600">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex gap-0 border-b-2 border-grey-100 mb-9 overflow-x-auto">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 text-[14px] font-bold whitespace-nowrap border-b-2 -mb-0.5 transition-all duration-200 ${
                  tab === t
                    ? 'text-teal border-teal'
                    : 'text-grey-400 border-transparent hover:text-navy'
                }`}
              >
                {t}{t === 'Reviews' ? ` (${product.reviews})` : ''}
              </button>
            ))}
          </div>

          {/* Ingredients */}
          {tab === 'Ingredients' && (
            <div>
              <div className="overflow-x-auto rounded-xl border border-grey-100">
                <table className="w-full">
                  <thead>
                    <tr className="bg-grey-50 border-b border-grey-100">
                      {['Ingredient', 'Dose per serving', '% NRV', 'Form'].map(h => (
                        <th key={h} className="text-left text-[11px] font-bold uppercase tracking-widest text-grey-400 px-5 py-3.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.ingredients.map((ing, i) => (
                      <tr key={i} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                        <td className="px-5 py-4 text-[14px] font-semibold text-navy">{ing.name}</td>
                        <td className="px-5 py-4 text-[14px] text-navy">{ing.dose}</td>
                        <td className="px-5 py-4 text-[14px] text-grey-600">{ing.nrv}</td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-bold bg-teal/10 text-teal px-2.5 py-1 rounded-full whitespace-nowrap">{ing.form}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-grey-400 mt-4">*NRV = Nutrient Reference Value. No proprietary blends. All doses represent full active compound weight.</p>
            </div>
          )}

          {/* Science */}
          {tab === 'The Science' && (
            <div className="max-w-[700px]">
              <h3 className="text-[22px] font-extrabold text-navy mb-4">Formulation Rationale</h3>
              <p className="text-grey-600 leading-relaxed mb-5">{product.description}</p>
              <p className="text-grey-600 leading-relaxed mb-5">
                Each ingredient in this formulation was selected after systematic review of published clinical literature, with preference given to randomised controlled trials in relevant human populations. Dosing reflects the minimum effective dose established in meta-analyses rather than cosmetic sub-threshold amounts.
              </p>
              <div className="p-5 bg-teal/5 border-l-4 border-teal rounded-r-xl mt-6">
                <div className="text-[13px] font-bold text-teal mb-2">📚 Key References</div>
                <div className="text-[12px] text-grey-600 leading-relaxed">
                  All ingredients are supported by peer-reviewed clinical evidence. Certificate of Analysis and full reference list available on request. Contact our science team at science@form6.com
                </div>
              </div>
            </div>
          )}

          {/* Usage */}
          {tab === 'Usage' && (
            <div className="max-w-[600px]">
              <h3 className="text-[22px] font-extrabold text-navy mb-6">Usage Instructions</h3>
              <div className="flex flex-col gap-4">
                {product.usage.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 bg-grey-50 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0">{i + 1}</div>
                    <p className="text-[14px] text-grey-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="text-[16px] font-bold text-navy mb-4">Who is this for?</h4>
                <div className="flex flex-wrap gap-2">
                  {product.whoFor.map(who => (
                    <span key={who} className="text-[12px] font-semibold bg-navy/5 text-navy px-3 py-1.5 rounded-full">{who}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {tab === 'Reviews' && (
            <div>
              <div className="flex gap-12 mb-10 items-center flex-wrap">
                <div className="text-center">
                  <div className="text-[64px] font-extrabold text-navy leading-none">{product.rating}</div>
                  <div className="text-xl text-amber-400 my-1">★★★★★</div>
                  <div className="text-[13px] text-grey-400">{product.reviews.toLocaleString()} verified reviews</div>
                </div>
                <div className="flex-1 min-w-[200px]">
                  {[5, 4, 3, 2, 1].map((star, i) => {
                    const pct = [88, 9, 3, 0, 0][i]
                    return (
                      <div key={star} className="flex items-center gap-3 mb-2">
                        <span className="text-[12px] text-grey-600 w-4">{star}</span>
                        <div className="flex-1 h-[6px] bg-grey-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[12px] text-grey-400 w-8">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { name: 'Tom Verhoeven', text: 'Significant DOMS reduction after my first week. As an ex-competitive weightlifter, I\'ve used dozens of recovery products. This is in a different league due to actual clinical doses.' },
                  { name: 'Layla Okonkwo', text: 'Finally a supplement company that cites its sources and uses proper doses. The formulation is exactly what the science supports — no corners cut.' },
                  { name: 'James Hartwell', text: 'Third month using this product. The cumulative effect is remarkable. Inflammation markers in my quarterly bloods are significantly improved.' },
                ].map(review => (
                  <div key={review.name} className="p-6 bg-grey-50 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-navy">{review.name}</span>
                      <span className="text-amber-400">★★★★★</span>
                    </div>
                    <p className="text-[14px] text-grey-600 leading-relaxed">{review.text}</p>
                    <div className="text-[11px] text-grey-400 mt-3">✅ Verified Purchase</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {tab === 'FAQ' && (
            <div className="max-w-[680px] flex flex-col gap-4">
              {[
                { q: 'Is this product suitable for vegans?', a: 'Yes. All Form6 products use HPMC (plant-based) capsule shells and vegan-certified ingredient sources. Full allergen information is on the product label.' },
                { q: 'Can I take this alongside other supplements?', a: 'This formulation is designed to complement a core stack. Check the specific ingredient interactions in the Science tab, and consult our team at science@form6.com for personalised advice.' },
                { q: 'What is your returns policy?', a: 'We offer a 30-day satisfaction guarantee. Contact our team within 30 days of receipt for a full refund or exchange. Products must be returned in original packaging.' },
                { q: 'How long until I notice results?', a: 'Some ingredients work acutely (within hours); others are cumulative over weeks. See the Usage tab for product-specific timeline expectations.' },
              ].map(faq => (
                <details key={faq.q} className="p-5 border border-grey-200 rounded-xl cursor-pointer group">
                  <summary className="font-bold text-navy text-[15px] flex justify-between items-center list-none">
                    {faq.q}
                    <span className="text-grey-400 text-xl summary-plus">+</span>
                    <span className="text-teal text-xl summary-minus">−</span>
                  </summary>
                  <p className="text-[14px] text-grey-600 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl text-navy mb-8" style={{ fontFamily: 'DM Serif Display, serif' }}>
              You may also like
            </h2>
            <ProductGrid products={related} cols={3} />
          </div>
        )}
      </div>
    </div>
  )
}
