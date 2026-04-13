import Link from 'next/link'
import Button from '@/components/ui/Button'
import { blogPosts } from '@/data/blog'
import * as Icons from 'lucide-react'
const ArrowRight = (Icons as any).ArrowRight

const bgClasses = [
  'bg-gradient-to-br from-teal-50 to-teal-100',
  'bg-gradient-to-br from-blue-50 to-indigo-100',
  'bg-gradient-to-br from-amber-50 to-orange-100',
]

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-3">Knowledge Hub</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}>
            The Science, Explained.
          </h2>
          <p className="text-[16px] text-grey-600 max-w-[480px] mx-auto leading-relaxed">
            Cutting-edge research on performance, recovery, and human optimisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block no-underline">
              <div className="rounded-xl overflow-hidden border border-grey-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className={`h-[180px] flex items-center justify-center text-5xl ${bgClasses[i]}`}>
                  {post.emoji}
                </div>
                <div className="p-6 bg-white">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">{post.category}</div>
                  <h3 className="text-[15px] font-bold text-navy leading-snug mb-2 group-hover:text-teal transition-colors">{post.title}</h3>
                  <p className="text-[13px] text-grey-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex gap-4 text-[12px] text-grey-400 font-medium">
                    <span>📅 {post.date}</span>
                    <span>⏱ {post.readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
