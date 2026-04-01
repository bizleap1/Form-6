import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const limit = Number(searchParams.get('limit') || 0)

  try {
    if (slug) {
      const post = await prisma.blogPost.findUnique({
        where: { slug }
      })
      if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      return NextResponse.json(post)
    }

    const whereClause: any = {}
    if (category) whereClause.category = category

    const queryOptions: any = { where: whereClause }
    if (limit > 0) queryOptions.take = limit
    
    // Sort by most recent usually
    queryOptions.orderBy = { id: 'desc' }

    const posts = await prisma.blogPost.findMany(queryOptions)

    return NextResponse.json({ posts: posts, total: posts.length })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
