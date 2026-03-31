import Link from 'next/link'

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'FORM6 CORE', href: '/shop?line=core' },
  { label: 'FORM6 PRIME', href: '/shop?line=prime' },
  { label: 'Bundles', href: '/shop' },
  { label: 'Subscribe & Save', href: '/shop' },
]

const scienceLinks = [
  { label: 'Our Approach', href: '/science' },
  { label: 'Certifications', href: '/science' },
  { label: 'Research Blog', href: '/blog' },
  { label: 'Ingredient Sourcing', href: '/science' },
  { label: 'Quality Assurance', href: '/science' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'GDPR', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Imprint', href: '#' },
]

const socialLinks = ['𝕏', 'in', 'f', '▶']

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline mb-4">
              <div
                className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-white font-serif text-lg"
                style={{ background: 'linear-gradient(135deg,#1cb8a8,#1a2e45)', fontFamily: 'DM Serif Display,serif' }}
              >F</div>
              <span className="text-[20px] font-extrabold tracking-tight text-white">
                FORM<span className="text-teal">6</span>
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-white/40 mb-6">
              Precision-formulated nutraceuticals for measurable performance and daily wellness. Science is our only standard.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-[10px] bg-white/5 border border-white/8 flex items-center justify-center text-[14px] text-white/40 hover:bg-teal hover:text-white hover:border-teal transition-all duration-300"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-white/55 hover:text-teal transition-colors duration-200 no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Science */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Science</h4>
            <ul className="space-y-2.5">
              {scienceLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-white/55 hover:text-teal transition-colors duration-200 no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/30 mb-5">Contact</h4>
            <div className="space-y-3 text-[13px]">
              {[
                { icon: '✉', text: 'hello@form6.com' },
                { icon: '📞', text: '+49 30 1234 5678' },
                { icon: '📍', text: 'Berlin, Germany · EU' },
                { icon: '⏰', text: 'Mon–Fri 9am–6pm CET' },
              ].map(item => (
                <div key={item.text} className="flex gap-3">
                  <span className="text-teal">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            {legalLinks.map(l => (
              <Link key={l.label} href={l.href} className="text-[12px] text-white/35 hover:text-teal transition-colors no-underline">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} Form6 GmbH. All rights reserved. VAT DE123456789
          </p>
        </div>
      </div>
    </footer>
  )
}
