import { cn } from '@/lib/utils'
import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'navy' | 'outline' | 'outline-white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-teal text-white shadow-teal hover:bg-teal-light hover:shadow-teal-hover hover:-translate-y-0.5',
      navy: 'bg-navy text-white hover:bg-navy-mid hover:-translate-y-0.5',
      outline: 'bg-transparent text-navy border-[1.5px] border-grey-200 hover:border-teal hover:text-teal',
      'outline-white': 'bg-transparent text-white border-[1.5px] border-white/40 hover:border-white hover:bg-white/10',
      ghost: 'bg-transparent text-grey-600 hover:bg-grey-50 hover:text-navy',
    }

    const sizes = {
      sm: 'text-[13px] px-5 py-[10px]',
      md: 'text-[14px] px-7 py-[14px]',
      lg: 'text-[15px] px-9 py-[18px]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
