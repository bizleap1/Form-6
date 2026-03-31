import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'core' | 'prime' | 'science' | 'default'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    core: 'bg-teal/10 text-teal',
    prime: 'bg-gold/10 text-gold',
    science: 'bg-navy/7 text-navy-mid',
    default: 'bg-grey-100 text-grey-600',
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
