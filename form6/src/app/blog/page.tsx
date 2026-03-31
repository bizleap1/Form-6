'use client'
import { useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'
import Newsletter from '@/components/sections/Newsletter'

const categories = ['All Articles', 'Recovery Science', 'Mental Performance', 'Sleep Optimisation', 'Energy', 'Immunity', 'Longevity']

const bgClasses = [
  'bg-gradient-to-br from-teal-50 to-teal-100',
  'bg-gradient-to-br from-blue-50 to-indigo-100',
  'bg-gradient-to-br from-amber-50 to-orange-100',
  'bg-gradient-to-br from-teal-50 to-teal-100',
  'bg-gradient-to-br from-blue-50 to-indigo-100',
  'bg-gradient-to-br from-amber-50 to-orange-100',
]

export default function BlogPage() {
  const [active, setActive] = useState('All Articles')

  const filtered = active === 'All Articles'
    ? blogPosts
    : blogPosts.filter(p => p.category === active)

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <div className="bg-grey-50 border-b border-grey-100 pb-0">
        <div className="max-w-[1200px] mx-auto px-6 pt-14">
          <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-2">Knowledge Hub</div>
          <h1 className="font-serif text-5xl text-navy mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
            The Form6 Lab
          </h1>
          <p className="text-grey-600 text-[15px] mb-8">Science-backed insights on performance, recovery, and human optimisation</p>
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2.5 rounded-t-lg text-[13px] font-semibold transition-all duration-200 border-b-2 -mb-px ${
                  active === cat
                    ? 'border-teal text-teal bg-white'
                    : 'border-transparent text-grey-600 hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-grey-400">
              <div className="text-5xl mb-4">📚</div>
              <p className="font-semibold">No articles in this category yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block no-underline">
                  <article className="rounded-xl overflow-hidden border border-grey-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className={`h-[180px] flex items-center justify-center text-5xl ${bgClasses[i % bgClasses.length]}`}>
                      {post.emoji}
                    </div>
                    <div className="p-6 bg-white">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">{post.category}</div>
                      <h2 className="text-[16px] font-extrabold text-navy leading-snug mb-2 group-hover:text-teal transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[13px] text-grey-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex gap-4 text-[12px] text-grey-400 font-medium">
                        <span>📅 {post.date}</span>
                        <span>⏱ {post.readTime} read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
