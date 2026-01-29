import { Zap } from 'lucide-react'
import { getSpeedLevel, getSpeedLabel } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SpeedBadgeProps {
  score: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SpeedBadge({ score, showLabel = false, size = 'md', className }: SpeedBadgeProps) {
  const level = getSpeedLevel(score)
  const label = getSpeedLabel(score)

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

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        sizeClasses[size],
        level === 'very-fast' && 'bg-emerald-100 text-emerald-700',
        level === 'fast' && 'bg-blue-100 text-blue-700',
        level === 'average' && 'bg-amber-100 text-amber-700',
        level === 'slow' && 'bg-orange-100 text-orange-700',
        className
      )}
    >
      <Zap className={iconSizes[size]} />
      {showLabel ? label : `${score}/10`}
    </span>
  )
}

export function SpeedBar({ score, className }: { score: number; className?: string }) {
  const level = getSpeedLevel(score)
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            level === 'very-fast' && 'bg-emerald-500',
            level === 'fast' && 'bg-blue-500',
            level === 'average' && 'bg-amber-500',
            level === 'slow' && 'bg-orange-500'
          )}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums">{score}/10</span>
    </div>
  )
}
