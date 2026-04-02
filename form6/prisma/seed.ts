import { PrismaClient } from '@prisma/client'
import { products } from '../src/data/products'
import { blogPosts } from '../src/data/blog'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
})

async function main() {
  console.log('Seeding Database...')

  // Seed Products
  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } })
    if (!existing) {
      await prisma.product.create({
        data: {
          line: product.line,
          name: product.name,
          slug: product.slug,
          tagline: product.tagline,
          benefit: product.benefit,
          description: product.description,
          price: product.price,
          rating: product.rating,
          reviews: product.reviews,
          goal: product.goal,
          format: product.format,
          servings: product.servings,
          intensity: product.intensity,
          badge: product.badge,
          usage: product.usage.join('\n'),
          whoFor: product.whoFor.join('\n'),
          ingredients: {
            create: product.ingredients
          },
          benefits: {
            create: product.benefits
          }
        }
      })
      console.log(`Created product: ${product.name}`)
    } else {
      console.log(`Product already exists: ${product.name}`)
    }
  }

  // Seed Blog Posts
  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } })
    if (!existing) {
      await prisma.blogPost.create({
        data: {
          slug: post.slug,
          category: post.category,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          readTime: post.readTime,
          emoji: post.emoji,
          bgColor: post.bgColor,
        }
      })
      console.log(`Created blog post: ${post.title}`)
    } else {
      console.log(`Blog post already exists: ${post.title}`)
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
