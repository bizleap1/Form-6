const testimonials = [
  {
    line: 'core',
    tag: '⚡ CORE Series',
    stars: 5,
    text: '"Recovery time dropped by nearly 40%. I can train harder, more frequently. The ingredient transparency is what won me over — no proprietary blends, just real clinical doses."',
    initials: 'MR',
    name: 'Marcus Reid',
    role: 'Triathlete · 12+ years competitive',
    avatarGrad: 'from-teal to-navy-mid',
  },
  {
    line: 'prime',
    tag: '✦ PRIME Series',
    stars: 5,
    text: '"I\'ve tried every nootropic stack on the market. Form6 Prime Focus is the only product that delivers sustained clarity without the afternoon crash. Remarkable formulation quality."',
    initials: 'SA',
    name: 'Sophia Aldridge',
    role: 'Founder & CEO · FinTech',
    avatarGrad: 'from-amber-400 to-amber-700',
  },
  {
    line: 'core',
    tag: '⚡ CORE Series',
    stars: 5,
    text: '"As a sports medicine physician, I\'m extremely selective. Form6 Core Sleep is the only supplement I recommend to my athletes. The formulation quality and transparency are exceptional."',
    initials: 'DK',
    name: 'Dr. Daniel Kim',
    role: 'Sports Medicine Physician · MD',
    avatarGrad: 'from-teal to-navy-mid',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-grey-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase text-teal mb-3">Customer Results</div>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-4"
            style={{ fontFamily: 'DM Serif Display, serif' }}>
            Real people. Measurable results.
          </h2>
          <p className="text-[16px] text-grey-600 max-w-[480px] mx-auto leading-relaxed">
            From elite athletes to C-suite executives — Form6 delivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-grey-100 shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <div className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${
                t.line === 'core' ? 'bg-teal/10 text-teal' : 'bg-amber-100 text-amber-700'
              }`}>
                {t.tag}
              </div>
              <div className="text-amber-400 text-sm mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-[14px] text-grey-600 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white text-[15px] font-extrabold`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-navy">{t.name}</div>
                  <div className="text-[12px] text-grey-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
