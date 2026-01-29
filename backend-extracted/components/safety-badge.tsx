import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react'
import { getSafetyLevel, getSafetyLabel } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SafetyBadgeProps {
  rating: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SafetyBadge({ rating, showLabel = true, size = 'md', className }: SafetyBadgeProps) {
  const level = getSafetyLevel(rating)
  const label = getSafetyLabel(rating)

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const Icon = level === 'safe' ? ShieldCheck : level === 'caution' ? Shield : ShieldAlert

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        sizeClasses[size],
        level === 'safe' && 'bg-emerald-100 text-emerald-700',
        level === 'caution' && 'bg-amber-100 text-amber-700',
        level === 'risky' && 'bg-red-100 text-red-700',
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel ? label : `${rating}/5`}
    </span>
  )
}

export function SafetyDots({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            'h-2 w-2 rounded-full',
            i <= rating
              ? rating >= 4
                ? 'bg-emerald-500'
                : rating === 3
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              : 'bg-muted'
          )}
        />
      ))}
    </div>
  )
}
