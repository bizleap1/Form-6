import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  reviews?: number
  size?: 'sm' | 'md'
  className?: string
}

export default function StarRating({ rating, reviews, size = 'sm', className }: StarRatingProps) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('text-amber-400', size === 'sm' ? 'text-[11px]' : 'text-sm')}>
        {'★'.repeat(full)}{hasHalf ? '½' : ''}{'☆'.repeat(5 - full - (hasHalf ? 1 : 0))}
      </span>
      <span className={cn('font-bold text-navy', size === 'sm' ? 'text-xs' : 'text-sm')}>{rating}</span>
      {reviews && (
        <span className={cn('text-grey-400 font-medium', size === 'sm' ? 'text-[11px]' : 'text-xs')}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  )
}
