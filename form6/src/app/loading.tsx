export default function Loading() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-serif animate-pulse"
          style={{ background: 'linear-gradient(135deg,#1cb8a8,#1a2e45)', fontFamily: 'DM Serif Display,serif' }}>
          F
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-teal animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <p className="text-[13px] font-semibold text-grey-400">Loading...</p>
      </div>
    </div>
  )
}
