import Link from 'next/link'
import Button from '@/components/ui/Button'

const stats = [
  { number: '47+', label: 'Peer-reviewed studies referenced' },
  { number: '98%', label: 'Customer satisfaction rate' },
  { number: '12', label: 'Active formulations' },
  { number: '3yr', label: 'R&D before first launch' },
]

const pillars = [
  { icon: '🔬', title: 'Evidence-Based Formulation', text: 'Every ingredient is selected based on published clinical literature, at doses shown to be effective in trials.' },
  { icon: '🧬', title: 'Bioavailability-Optimised', text: 'Advanced absorption technology ensures active compounds reach their target tissues at therapeutic levels.' },
  { icon: '🏭', title: 'ISO-Certified Manufacturing', text: 'Produced in GMP-certified facilities under strict quality protocols and third-party batch testing.' },
  { icon: '📊', title: 'Transparent Labelling', text: 'No proprietary blends. Full ingredient disclosure with exact dosages on every label.' },
]

export default function ScienceBanner() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b2a 0%, #1a2e45 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(28,184,168,0.12) 0%, transparent 50%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-4">Why Form6</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-5 tracking-tight"
              style={{ fontFamily: 'DM Serif Display, serif' }}>
              Science is our<br /><em className="text-teal not-italic">only</em> standard
            </h2>
            <p className="text-[16px] text-white/60 leading-relaxed mb-10 max-w-[440px]">
              Every formula begins in the laboratory. We don&apos;t follow trends — we follow evidence.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.number} className="bg-white/5 border border-white/8 rounded-xl p-6">
                  <div className="text-[36px] font-extrabold text-teal leading-none mb-2">{s.number}</div>
                  <div className="text-[13px] text-white/55">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {pillars.map(p => (
              <div
                key={p.title}
                className="group bg-white/4 border border-white/8 rounded-xl p-6 flex gap-4 items-start hover:bg-teal/8 hover:border-teal/30 hover:translate-x-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-[12px] bg-teal/15 text-teal flex items-center justify-center text-xl flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <div className="text-[15px] font-bold text-white mb-1.5">{p.title}</div>
                  <div className="text-[13px] text-white/55 leading-relaxed">{p.text}</div>
                </div>
              </div>
            ))}
            <div className="mt-2">
              <Link href="/science">
                <Button variant="outline-white">View Full Science →</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
