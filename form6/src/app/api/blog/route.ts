import { NextRequest, NextResponse } from 'next/server'
import { blogPosts } from '@/data/blog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const limit = Number(searchParams.get('limit') || 0)

  if (slug) {
    const post = blogPosts.find(p => p.slug === slug)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json(post)
  }

  let result = [...blogPosts]
  if (category) result = result.filter(p => p.category === category)
  if (limit) result = result.slice(0, limit)

  return NextResponse.json({ posts: result, total: result.length })
}
