import { cn } from '@/lib/utils'

interface ProductBottleProps {
  line: 'core' | 'prime'
  name: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  className?: string
  animate?: boolean
}

const sizes = {
  sm: { bottle: 'w-[90px] h-[130px] rounded-[14px_14px_12px_12px]', brand: 'text-[7px]', name: 'text-[11px]', tag: 'text-[8px] px-2 py-0.5' },
  md: { bottle: 'w-[120px] h-[170px] rounded-[16px_16px_14px_14px]', brand: 'text-[8px]', name: 'text-[14px]', tag: 'text-[9px] px-2.5 py-0.5' },
  lg: { bottle: 'w-[160px] h-[220px] rounded-[20px_20px_16px_16px]', brand: 'text-[9px]', name: 'text-[18px]', tag: 'text-[9px] px-3 py-1' },
  hero: { bottle: 'w-[220px] h-[280px] rounded-[24px_24px_20px_20px]', brand: 'text-[11px]', name: 'text-[22px]', tag: 'text-[9px] px-3 py-1' },
}

export default function ProductBottle({ line, name, size = 'sm', className, animate }: ProductBottleProps) {
  const s = sizes[size]
  const isCore = line === 'core'
  const accentColor = isCore ? '#1cb8a8' : '#c9a84c'
  const bgFrom = isCore ? '#1a2e45' : '#2a2010'
  const bgTo = isCore ? '#0d2035' : '#3d300f'

  const shortName = name.split(' ').slice(0, 2).join('\n')

  return (
    <div
      className={cn(
        s.bottle,
        'relative flex flex-col items-center justify-center overflow-hidden',
        animate && 'group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300',
        className
      )}
      style={{
        background: `linear-gradient(160deg, ${bgFrom}, ${bgTo})`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-[3px] rounded-b-sm"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)` }}
      />
      {/* Shine */}
      <div className="absolute top-0 left-[28%] w-[12%] h-full bg-gradient-to-b from-white/6 to-transparent" />

      <div className={cn('font-bold tracking-[0.2em] uppercase mb-2 text-white/40', s.brand)}>FORM6</div>
      <div
        className={cn('font-serif text-white text-center leading-tight px-3 mb-2', s.name)}
        style={{ fontFamily: 'DM Serif Display, serif' }}
      >
        {shortName.split('\n').map((part, i) => (
          <span key={i}>{part}{i === 0 && <br />}</span>
        ))}
      </div>
      <div
        className={cn('font-bold tracking-widest uppercase border rounded-full', s.tag)}
        style={{ color: accentColor, borderColor: `${accentColor}55` }}
      >
        {isCore ? 'CORE' : 'PRIME'}
      </div>

      {/* Bottom decoration */}
      <div
        className="absolute bottom-4 text-2xl tracking-widest opacity-10"
        style={{ color: accentColor }}
      >
        ⬡⬡⬡
      </div>
    </div>
  )
}
