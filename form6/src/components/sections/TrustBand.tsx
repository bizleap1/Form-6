const items = [
  { icon: '🔬', label: 'Research Backed', sub: 'Peer-reviewed formulations' },
  { icon: '🧬', label: 'Clinically Formulated', sub: 'Evidence-based dosing' },
  { icon: '🏭', label: 'GMP Certified', sub: 'ISO manufacturing' },
  { icon: '💎', label: 'Premium Ingredients', sub: 'Verified sourcing' },
  { icon: '🇪🇺', label: 'EU Compliant', sub: 'EFSA standards' },
]

export default function TrustBand() {
  return (
    <section className="bg-grey-50 border-y border-grey-100 py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center divide-x divide-grey-200">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-8 py-3">
              <div className="w-10 h-10 rounded-[10px] bg-teal/10 text-teal flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] font-bold text-navy leading-tight">{item.label}</div>
                <div className="text-[11px] font-medium text-grey-400">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
