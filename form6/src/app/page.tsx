import Hero from '@/components/sections/Hero'
import TrustBand from '@/components/sections/TrustBand'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import ScienceBanner from '@/components/sections/ScienceBanner'
import Testimonials from '@/components/sections/Testimonials'
import BlogPreview from '@/components/sections/BlogPreview'
import Newsletter from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <FeaturedProducts />
      <ScienceBanner />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
