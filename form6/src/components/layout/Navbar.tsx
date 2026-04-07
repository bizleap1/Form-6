'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { useCartStore } from '@/lib/store'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'The Science', href: '/science' },
  { label: 'CORE', href: '/shop?line=core', accent: 'teal' },
  { label: 'PRIME', href: '/shop?line=prime', accent: 'gold' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/science' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => setCount(useCartStore.getState().count())
    updateCount()
    const unsub = useCartStore.subscribe(updateCount)
    return unsub
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-grey-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-white font-serif text-lg"
            style={{ background: 'linear-gradient(135deg, #1cb8a8, #1a2e45)', fontFamily: 'DM Serif Display, serif' }}
          >
            F
          </div>
          <span className="text-[20px] font-extrabold tracking-tight text-navy">
            FORM<span className="text-teal">6</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[13.5px] font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 hover:bg-grey-50 ${
                link.accent === 'teal' ? 'text-teal hover:text-teal' :
                link.accent === 'gold' ? 'text-gold hover:text-gold' :
                'text-grey-600 hover:text-navy'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {[
            { icon: Icons.Search, href: '/shop', title: 'Search' },
            { icon: Icons.Heart, href: '#', title: 'Wishlist' },
          ].map(({ icon: Icon, href, title }) => (
            <Link
              key={title}
              href={href}
              title={title}
              className="w-10 h-10 rounded-[10px] flex items-center justify-center text-grey-600 hover:bg-grey-50 hover:text-navy transition-all duration-200"
            >
              <Icon size={18} />
            </Link>
          ))}

          <Link
            href="/shop"
            title="Shop"
            className="w-10 h-10 rounded-[10px] flex items-center justify-center text-grey-600 hover:bg-grey-50 hover:text-teal transition-all duration-200"
          >
            <Icons.User size={18} />
          </Link>

          <Link
            href="/checkout"
            title="Cart"
            className="relative w-10 h-10 rounded-[10px] flex items-center justify-center text-grey-600 hover:bg-grey-50 hover:text-navy transition-all duration-200"
          >
            <Icons.ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-teal text-white text-[9px] font-extrabold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <Link href="/shop">
            <Button size="sm" className="hidden lg:inline-flex ml-2">Shop Now</Button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-grey-600 hover:bg-grey-50"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-grey-100 shadow-lg">
          <nav className="max-w-[1400px] mx-auto px-8 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[14px] font-semibold px-4 py-3 rounded-lg transition-colors ${
                  link.accent === 'teal' ? 'text-teal' :
                  link.accent === 'gold' ? 'text-gold' :
                  'text-grey-600 hover:text-navy hover:bg-grey-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

