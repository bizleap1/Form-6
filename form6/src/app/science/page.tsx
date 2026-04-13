import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Newsletter from '@/components/sections/Newsletter'

export const metadata: Metadata = { title: 'The Science' }

const pillars = [
  { icon: '📚', title: 'Literature Review', desc: 'Every ingredient begins with a systematic review of published clinical literature. We only use compounds with at least two independently-replicated positive RCTs in humans.' },
  { icon: '⚖️', title: 'Clinical Dosing', desc: 'We dose at or above the minimum effective dose identified in trials — never at cosmetic sub-threshold levels used for label appeal. What\'s on our label is what\'s in your capsule.' },
  { icon: '🧬', title: 'Bioavailability Engineering', desc: 'Active form selection (glycinate vs. oxide, free acid vs. salt) and absorption-enhancing cofactors are considered for every ingredient to maximise in vivo efficacy.' },
  { icon: '🏭', title: 'GMP Manufacturing', desc: 'Produced exclusively in ISO-certified, GMP-compliant facilities in the EU. Every batch undergoes in-process and finished-product testing for potency, purity, and microbiological safety.' },
  { icon: '🔍', title: 'Third-Party Testing', desc: 'Independent laboratory verification of label claims. Certificate of Analysis available for every batch. We test for heavy metals, pesticides, and microbiological contaminants.' },
  { icon: '📊', title: 'Transparent Labelling', desc: 'Zero proprietary blends. Full ingredient disclosure. Exact mg doses for every active compound. We believe you have the right to know exactly what you\'re putting in your body.' },
]

const certs = [
  { icon: '🏅', label: 'GMP Certified' },
  { icon: '🇪🇺', label: 'EU EFSA Compliant' },
  { icon: '🌱', label: 'Vegan Formulated' },
  { icon: '⚗️', label: 'Third-Party Tested' },
  { icon: '🔬', label: 'ISO 22000' },
  { icon: '✅', label: 'WADA Compliant' },
]

const team = [
  { initials: 'AH', name: 'Dr. Annika Hoffmann', role: 'Chief Scientific Officer', bio: 'PhD Nutritional Biochemistry, TU Munich. 14 years in sports nutrition research and clinical formulation.', grad: 'from-teal to-navy-mid' },
  { initials: 'JW', name: 'Dr. James Whitmore', role: 'Head of R&D', bio: 'MD, Sports Medicine. Former consultant to Olympic programmes. Specialist in ergogenic aids and recovery science.', grad: 'from-navy-mid to-navy' },
  { initials: 'LS', name: 'Dr. Lena Strauss', role: 'Regulatory Affairs Lead', bio: 'PharmD with expertise in EU nutraceutical regulation, EFSA submission and GMP compliance frameworks.', grad: 'from-teal-light to-teal' },
]

export default function SciencePage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="py-24 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0d1b2a, #1a2e45)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(28,184,168,0.5) 0%, transparent 60%)'
        }} />
        <div className="relative z-10 max-w-[700px] mx-auto px-6">
          <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-4">Our Approach</div>
          <h1 className="font-serif text-5xl lg:text-[56px] text-white leading-tight mb-5"
            style={{ fontFamily: 'DM Serif Display, serif' }}>
            The Form6 Science Standard
          </h1>
          <p className="text-[17px] text-white/65 leading-relaxed mb-8">
            Evidence-based formulation built on peer-reviewed literature, clinical dosing, and uncompromising quality assurance.
          </p>
          <Link href="/shop">
            <Button size="lg">Explore Products</Button>
          </Link>
        </div>
      </div>

      {/* Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-3">How We Work</div>
            <h2 className="font-serif text-4xl text-navy mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>From Research to Results</h2>
            <p className="text-grey-600 text-[16px] max-w-[500px] mx-auto leading-relaxed">
              Our formulation process starts at the cellular level — and doesn&apos;t end until every dose meets our clinical standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {pillars.map(p => (
              <div key={p.title}
                className="p-8 rounded-xl border border-grey-100 shadow-card hover:border-teal hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="text-[32px] mb-4">{p.icon}</div>
                <h3 className="text-[18px] font-extrabold text-navy mb-3">{p.title}</h3>
                <p className="text-[14px] text-grey-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-4 justify-center p-10 bg-grey-50 rounded-2xl">
            {certs.map(c => (
              <div key={c.label} className="flex items-center gap-2.5 bg-white border border-grey-200 rounded-[10px] px-5 py-3 shadow-card text-[13px] font-bold text-navy">
                <span className="text-xl">{c.icon}</span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="py-24 bg-grey-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-3">Manufacturing</div>
              <h2 className="font-serif text-4xl text-navy mb-5" style={{ fontFamily: 'DM Serif Display, serif' }}>
                Uncompromising Quality Assurance
              </h2>
              <p className="text-grey-600 leading-relaxed mb-6">
                Every Form6 product is manufactured in EU-based, ISO 22000-certified facilities operating under pharmaceutical-grade GMP protocols. We do not outsource quality — every batch is tested in-house and independently verified.
              </p>
              {['Raw material identity and purity testing at intake', 'In-process quality checks at every manufacturing stage', 'Finished product microbiological, heavy metal and pesticide testing', 'Third-party CoA verification before release', 'Full batch traceability and recall capability'].map(item => (
                <div key={item} className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <span className="text-[14px] text-grey-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏭', title: 'EU Facility', sub: 'ISO 22000 certified manufacturing' },
                { icon: '🧪', title: 'Batch Testing', sub: 'Every batch independently verified' },
                { icon: '📋', title: 'Full CoA', sub: 'Available for all products' },
                { icon: '🔒', title: 'Traceability', sub: '100% ingredient lot tracing' },
              ].map(card => (
                <div key={card.title} className="bg-white p-6 rounded-xl border border-grey-100 shadow-card text-center">
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <div className="font-bold text-navy mb-1">{card.title}</div>
                  <div className="text-[12px] text-grey-400">{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Science Team */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-3">The Team</div>
            <h2 className="font-serif text-4xl text-navy" style={{ fontFamily: 'DM Serif Display, serif' }}>Science-Led. Expert-Driven.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name} className="text-center p-8 rounded-xl border border-grey-100 shadow-card">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.grad} flex items-center justify-center text-2xl font-extrabold text-white mx-auto mb-4`}>
                  {member.initials}
                </div>
                <h3 className="text-[16px] font-extrabold text-navy mb-1">{member.name}</h3>
                <div className="text-[12px] text-teal font-bold mb-3">{member.role}</div>
                <p className="text-[13px] text-grey-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
