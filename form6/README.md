# Form6 — Precision Nutraceuticals E-Commerce

A premium, scientific nutraceutical e-commerce platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features two product lines — FORM6 CORE (athletic performance) and FORM6 PRIME (professional wellness).

---

## 🏗️ Project Structure

```
form6/
├── public/                     # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   ├── page.tsx            # Home page
│   │   ├── loading.tsx         # Global loading UI
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # Robots.txt generator
│   │   ├── shop/
│   │   │   └── page.tsx        # Shop page with filters + sidebar
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Product Detail Page (PDP)
│   │   ├── science/
│   │   │   └── page.tsx        # Science / About page
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post page
│   │   ├── checkout/
│   │   │   └── page.tsx        # Single-page checkout
│   │   └── api/
│   │       ├── products/route.ts   # Products REST API
│   │       ├── blog/route.ts       # Blog REST API
│   │       ├── checkout/route.ts   # Checkout + Stripe-ready API
│   │       ├── shipping/route.ts   # Dynamic shipping calculator
│   │       └── newsletter/route.ts # Newsletter signup API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Sticky responsive navbar + cart badge
│   │   │   └── Footer.tsx      # 4-column footer
│   │   ├── sections/           # Full-page section components
│   │   │   ├── Hero.tsx        # Split hero with animated bottle
│   │   │   ├── TrustBand.tsx   # 5-item trust signals bar
│   │   │   ├── FeaturedProducts.tsx  # Goal-filtered product grid
│   │   │   ├── ScienceBanner.tsx     # Navy science section + stats
│   │   │   ├── Testimonials.tsx      # 3-card testimonial grid
│   │   │   ├── BlogPreview.tsx       # 3-post blog preview
│   │   │   └── Newsletter.tsx        # Email capture section
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx # Product card with add-to-cart
│   │   │   ├── ProductGrid.tsx # Responsive product grid
│   │   │   └── ShopSidebar.tsx # Filter sidebar (line/goal/format/price)
│   │   └── ui/
│   │       ├── Button.tsx      # Multi-variant button component
│   │       ├── Badge.tsx       # Line/category badge
│   │       ├── Toast.tsx       # Toast notification system
│   │       ├── ProductBottle.tsx  # Reusable bottle illustration
│   │       └── StarRating.tsx  # Star rating display
│   ├── data/
│   │   ├── products.ts         # 9 complete products with full data
│   │   └── blog.ts             # 6 blog posts
│   ├── lib/
│   │   ├── utils.ts            # cn(), formatPrice(), VAT, shipping
│   │   └── store.ts            # Zustand cart + wishlist store
│   └── styles/
│       └── globals.css         # Tailwind base + custom animations
├── .env.example                # All environment variables documented
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17.0 or later
- **npm** 9+ or **yarn** / **pnpm**

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

For local development, the app works out-of-the-box without any environment variables. Add keys only for payment/email integrations.

### 3. Start development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm run start
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `next@14` | React framework (App Router, SSR, API routes) |
| `react@18` | UI library |
| `typescript` | Type safety |
| `tailwindcss@3` | Utility-first CSS |
| `zustand` | Lightweight cart/wishlist state |
| `react-hook-form` | Checkout form validation |
| `lucide-react` | Thin-line icon set |
| `framer-motion` | Animations (ready to use) |
| `clsx` + `tailwind-merge` | Conditional className utility |

---

## 🛒 Features Implemented

### Storefront
- [x] Sticky responsive navbar with cart badge
- [x] Animated hero section with floating product bottle
- [x] 5-item trust/authority signal band
- [x] Goal-filtered featured product grid (7 filter categories)
- [x] CORE vs PRIME line selector cards
- [x] Science/statistics dark section
- [x] Testimonial grid (3 verified customer reviews)
- [x] Blog preview section (3 posts)
- [x] Email newsletter capture section
- [x] 4-column responsive footer with legal links

### Shop
- [x] Filter sidebar (line, goal, format, price range slider)
- [x] Sort by (bestseller, price asc/desc, rating, newest)
- [x] Responsive product grid (1/2/3 column breakpoints)
- [x] Product cards with wishlist, quick add-to-cart, badge
- [x] URL search param persistence (`?line=core`)

### Product Detail Page
- [x] Sticky gallery with thumb navigation
- [x] Full ingredient table (name, dose, %NRV, form)
- [x] Science rationale tab with clinical references
- [x] Usage instructions tab (step-by-step)
- [x] Reviews tab with rating distribution bars
- [x] FAQ tab with collapsible accordion
- [x] Quantity selector with +/−
- [x] Add to cart + wishlist toggle
- [x] Related products grid

### Checkout
- [x] Cart management (quantity update, remove item)
- [x] Coupon code system (`FORM6LAUNCH` or `WELCOME10` = 10% off)
- [x] 4 payment methods (Card, PayPal, Apple Pay, UPI)
- [x] Dynamic VAT calculation (19%)
- [x] Free shipping threshold (€60)
- [x] Order confirmation screen
- [x] Empty cart state

### Science Page
- [x] 6-pillar methodology grid
- [x] Certification strip (GMP, EFSA, WADA, ISO etc.)
- [x] Manufacturing quality section
- [x] Science team profiles

### Blog
- [x] Category filter tabs
- [x] Article listing grid
- [x] Individual blog post pages
- [x] Related articles section

### API Routes
- [x] `GET /api/products` — filter by line/goal/format/price/slug
- [x] `GET /api/blog` — filter by category, limit
- [x] `POST /api/checkout` — order processing (Stripe-ready)
- [x] `GET /api/shipping` — dynamic shipping rates by country
- [x] `POST /api/newsletter` — email capture endpoint

---

## 💳 Payment Integration

### Stripe (Primary — Card Payments)

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

1. Add keys to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

2. The checkout API at `src/app/api/checkout/route.ts` has Stripe boilerplate ready — uncomment the Payment Intent block.

3. Add webhook endpoint for `payment_intent.succeeded` events.

### PayPal

```bash
npm install @paypal/react-paypal-js
```

### Razorpay / UPI (India)

```bash
npm install razorpay
```
Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`.

---

## 🗄️ Database Setup (Supabase)

```bash
npm install @supabase/supabase-js
```

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Recommended tables:
```sql
-- Products (or use static data/CMS)
create table products (id serial primary key, slug text unique, ...);

-- Orders
create table orders (
  id text primary key,
  customer_email text,
  items jsonb,
  total numeric,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Users / accounts
create table profiles (
  id uuid references auth.users primary key,
  email text,
  name text,
  created_at timestamptz default now()
);

-- Coupons
create table coupons (
  code text primary key,
  discount_pct numeric,
  max_uses int,
  used_count int default 0,
  expires_at timestamptz
);
```

---

## 📧 Email Integration (Resend)

```bash
npm install resend
```

```env
RESEND_API_KEY=re_...
EMAIL_FROM=hello@form6.com
```

Use for: order confirmations, newsletter, abandoned cart.

---

## 🎨 Design System

### Colours

| Token | Value | Usage |
|---|---|---|
| `navy` | `#0d1b2a` | Primary background, headings |
| `navy-mid` | `#1a2e45` | Card backgrounds, hover states |
| `teal` | `#1cb8a8` | Primary accent, CTAs, CORE line |
| `teal-light` | `#2dd4c4` | Hover accent |
| `gold` | `#c9a84c` | PRIME line accent |
| `grey-50` | `#f8f9fb` | Page backgrounds |
| `grey-100` | `#eef0f4` | Card borders |
| `grey-400` | `#8d96a7` | Muted text |
| `grey-600` | `#5a6272` | Body text |

### Typography
- **Display**: DM Serif Display (headings, hero, product names)
- **Body**: Manrope (all UI text, weights 400–800)

### Spacing
- 8px grid system via Tailwind
- Container max-width: 1200px (standard), 1400px (hero/navbar)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

Set environment variables in Vercel Dashboard → Project Settings → Environment Variables.

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔮 Roadmap / Future Features

- [ ] Supabase authentication (email + Google / Apple social login)
- [ ] Product subscriptions with billing cadence selector
- [ ] Bundle builder (mix & match discounts)
- [ ] Referral programme with unique share links
- [ ] Admin dashboard (order management, inventory, analytics)
- [ ] Wishlist persistence (logged-in users)
- [ ] Product reviews submission
- [ ] Multi-currency support
- [ ] Klaviyo / Mailchimp email marketing integration
- [ ] Stock management with low-stock alerts
- [ ] Product comparison tool

---

## 📄 Licence

Private & Confidential — Form6 GmbH. All rights reserved.

---

## 📞 Support

- **Technical**: dev@form6.com
- **Science**: science@form6.com
- **General**: hello@form6.com
