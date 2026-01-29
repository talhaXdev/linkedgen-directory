import { cn } from '@/lib/utils'
import type { Tool } from '@/lib/types'

interface PricingBadgeProps {
  model: Tool['pricingModel']
  size?: 'sm' | 'md'
  className?: string
}

export function PricingBadge({ model, size = 'md', className }: PricingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded font-medium',
        sizeClasses[size],
        model === 'free' && 'bg-emerald-100 text-emerald-700',
        model === 'freemium' && 'bg-blue-100 text-blue-700',
        model === 'one-time' && 'bg-purple-100 text-purple-700',
        model === 'subscription' && 'bg-slate-100 text-slate-700',
        className
      )}
    >
      {model === 'free' && 'Free'}
      {model === 'freemium' && 'Freemium'}
      {model === 'one-time' && 'One-time'}
      {model === 'subscription' && 'Subscription'}
    </span>
  )
}
