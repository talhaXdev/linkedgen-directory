import Link from 'next/link'
import { ExternalLink, Gift } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import { SafetyBadge } from '@/components/safety-badge'
import { SpeedBadge } from '@/components/speed-badge'
import { PricingBadge } from '@/components/pricing-badge'
import { formatPrice } from '@/lib/types'
import type { Tool } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  tool: Tool
  featured?: boolean
  className?: string
}

export function ToolCard({ tool, featured = false, className }: ToolCardProps) {
  return (
    <Card
      className={cn(
        'group relative flex flex-col transition-all hover:shadow-lg',
        featured && 'ring-2 ring-primary/20',
        className
      )}
    >
      {/* Featured/Sponsored Badges */}
      {(tool.featured || tool.sponsored) && (
        <div className="absolute -top-2 right-4 flex gap-1">
          {tool.featured && (
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">Featured</Badge>
          )}
          {tool.sponsored && (
            <Badge variant="secondary">Sponsored</Badge>
          )}
        </div>
      )}

      <CardContent className="flex-1 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <span className="text-lg font-bold text-muted-foreground">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold">{tool.name}</h3>
            <RatingStars rating={tool.rating} size="sm" reviewCount={tool.reviewCount} />
          </div>
        </div>

        {/* Scores */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <SpeedBadge score={tool.speedScore} size="sm" />
          <SafetyBadge rating={tool.tosSafetyRating} showLabel={false} size="sm" />
          <PricingBadge model={tool.pricingModel} size="sm" />
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {tool.shortDescription}
        </p>

        {/* Pricing */}
        <div className="mb-2">
          <span className="text-lg font-semibold">{formatPrice(tool)}</span>
        </div>

        {/* Exclusive Deal */}
        {tool.exclusiveDeal && (
          <div className="flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1 text-sm text-red-700">
            <Gift className="h-4 w-4" />
            <span className="font-medium">EXCLUSIVE: {tool.exclusiveDeal}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2 border-t pt-4">
        <Button asChild variant="outline" className="flex-1 bg-transparent">
          <Link href={`/tools/${tool.slug}`}>View Details</Link>
        </Button>
        <Button asChild className="flex-1 gap-1">
          <a href={tool.affiliateLink} target="_blank" rel="noopener noreferrer">
            Visit Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ToolCardCompact({ tool, className }: { tool: Tool; className?: string }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        'group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <span className="text-sm font-bold text-muted-foreground">{tool.name.charAt(0)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium group-hover:text-primary">{tool.name}</h4>
        <div className="flex items-center gap-2">
          <RatingStars rating={tool.rating} size="sm" showValue={false} />
          <span className="text-xs text-muted-foreground">{tool.rating}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{formatPrice(tool)}</div>
        <SafetyBadge rating={tool.tosSafetyRating} showLabel={false} size="sm" />
      </div>
    </Link>
  )
}
