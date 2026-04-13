import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import Newsletter from '@/components/sections/Newsletter'
import Button from '@/components/ui/Button'

const bgClasses = [
  'bg-gradient-to-br from-teal-50 to-teal-100',
  'bg-gradient-to-br from-blue-50 to-indigo-100',
  'bg-gradient-to-br from-amber-50 to-orange-100',
]

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postIndex = blogPosts.findIndex(p => p.slug === slug)
  if (postIndex === -1) notFound()
  const post = blogPosts[postIndex]
  const related = blogPosts.filter(p => (p as any).id !== post.id).slice(0, 3)

  return (
    <div className="pt-[72px]">
      {/* Hero image */}
      <div className={`h-[300px] flex items-center justify-center text-8xl ${bgClasses[postIndex % bgClasses.length]}`}>
        {post.emoji}
      </div>

      {/* Article */}
      <article className="max-w-[780px] mx-auto px-6 py-14">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-semibold text-grey-400 hover:text-teal transition-colors mb-8 no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back to Blog
        </Link>

        <div className="text-[11px] font-bold uppercase tracking-widest text-teal mb-3">{post.category}</div>
        <h1 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-5"
          style={{ fontFamily: 'DM Serif Display, serif' }}>
          {post.title}
        </h1>
        <div className="flex gap-4 text-[13px] text-grey-400 font-medium mb-10 pb-8 border-b border-grey-100">
          <span>📅 {post.date}</span>
          <span>⏱ {post.readTime} read</span>
          <span>🏷️ {post.category}</span>
        </div>

        {/* Article content */}
        <div className="prose text-[16px] text-grey-600 leading-relaxed space-y-6">
          <p className="text-[17px] font-medium text-navy leading-relaxed">{post.excerpt}</p>
          <p>The relationship between nutritional supplementation and measurable physiological outcomes has been the subject of intense scientific inquiry over the past three decades. As the field matures, a clear distinction emerges between compounds with robust mechanistic and clinical evidence versus those supported primarily by marketing budgets and anecdotal reports.</p>
          <h2 className="font-serif text-3xl text-navy mt-8 mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>The Evidence Hierarchy</h2>
          <p>When evaluating any nutraceutical ingredient, we apply a rigorous evidence hierarchy: mechanistic plausibility must be supported by in vitro and animal data, followed by human pharmacokinetic studies, and finally randomised controlled trials in relevant populations at clinically meaningful doses.</p>
          <p>The challenge in the supplement industry is that most products are formulated based on mechanistic data alone — or worse, on case reports and testimonials — without the controlled trial evidence needed to make legitimate efficacy claims.</p>
          <div className="p-6 bg-teal/5 border-l-4 border-teal rounded-r-xl my-8">
            <p className="font-semibold text-navy italic">&quot;We only include an ingredient in our formulations when there is at least two independently-replicated positive RCTs in humans at the dose we use. This is a non-negotiable standard.&quot;</p>
            <div className="mt-3 text-[13px] text-grey-400">— Dr. Annika Hoffmann, Chief Scientific Officer, Form6</div>
          </div>
          <h2 className="font-serif text-3xl text-navy mt-8 mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>Clinical Dosing vs. Label Doses</h2>
          <p>Perhaps the most prevalent form of misleading supplementation is the use of sub-clinical doses — amounts that appear on the ingredient label but fall far below what clinical trials demonstrate to be effective. This practice, known as &quot;fairy dusting,&quot; allows companies to display impressive ingredient lists while delivering no meaningful physiological effect.</p>
          <p>Form6&apos;s commitment to clinical dosing means every active ingredient in our formulations is included at or above the minimum effective dose established in peer-reviewed trials. What&apos;s on our label is what&apos;s in your capsule.</p>
        </div>

        {/* References */}
        <div className="mt-14 p-6 bg-grey-50 rounded-xl border border-grey-100">
          <h3 className="font-bold text-navy mb-4">📚 References</h3>
          <div className="text-[12px] text-grey-500 leading-relaxed space-y-2">
            <p>This article summarises findings from multiple peer-reviewed publications. Full reference list available at science@form6.com</p>
            <p>All Form6 formulation decisions are supported by published clinical evidence available in our Science section.</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/shop"><Button>Shop Products</Button></Link>
          <Link href="/science"><Button variant="outline">Our Science</Button></Link>
        </div>
      </article>

      {/* Related */}
      <section className="py-14 bg-grey-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-3xl text-navy mb-8" style={{ fontFamily: 'DM Serif Display, serif' }}>More from The Form6 Lab</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Link key={(p as any).id} href={`/blog/${p.slug}`} className="group block no-underline">
                <div className="rounded-xl overflow-hidden border border-grey-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 bg-white">
                  <div className={`h-[140px] flex items-center justify-center text-4xl ${bgClasses[i % bgClasses.length]}`}>{p.emoji}</div>
                  <div className="p-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">{p.category}</div>
                    <h3 className="text-[14px] font-bold text-navy group-hover:text-teal transition-colors">{p.title}</h3>
                    <div className="text-[12px] text-grey-400 mt-2">{p.readTime} read</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
