import type { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://form6.com'

  const productUrls = products.map(p => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogPosts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/science`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/checkout`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
    ...blogUrls,
  ]
}
