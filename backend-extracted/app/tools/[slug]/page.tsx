import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ChevronRight,
  ExternalLink,
  Check,
  X,
  Gift,
  Zap,
  Shield,
  Star,
  ArrowLeft,
  Undo2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RatingStars } from '@/components/rating-stars'
import { SafetyBadge, SafetyDots } from '@/components/safety-badge'
import { SpeedBadge, SpeedBar } from '@/components/speed-badge'
import { PricingBadge } from '@/components/pricing-badge'
import { ToolCardCompact } from '@/components/tool-card'
import { getToolBySlug, getAlternatives, tools } from '@/lib/data'
import { formatPrice, getSafetyLabel, getSpeedLabel } from '@/lib/types'

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: `${tool.name} Review`,
    description: `${tool.name} review with speed test, safety rating, and honest assessment. ${tool.shortDescription}`,
  }
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const alternatives = getAlternatives(slug)

  const featureList = [
    { key: 'profileOptimization', label: 'Profile Optimization' },
    { key: 'contentGeneration', label: 'Content Generation' },
    { key: 'prospecting', label: 'Prospecting' },
    { key: 'emailFinding', label: 'Email Finding' },
    { key: 'automation', label: 'Automation' },
    { key: 'chromeExtension', label: 'Chrome Extension' },
    { key: 'apiAvailable', label: 'API Available' },
    { key: 'freeTier', label: 'Free Tier' },
    { key: 'oneTimePricing', label: 'One-time Pricing' },
  ]

  const quickInfo = [
    { label: 'Category', value: tool.category },
    { label: 'Pricing Model', value: tool.pricingModel.charAt(0).toUpperCase() + tool.pricingModel.slice(1) },
    { label: 'Free Tier', value: tool.features.freeTier ? 'Yes' : 'No' },
    { label: 'Chrome Extension', value: tool.features.chromeExtension ? 'Yes' : 'No' },
    { label: 'API Available', value: tool.features.apiAvailable ? 'Yes' : 'No' },
    { label: 'Best For', value: tool.bestFor.split(' ').slice(0, 5).join(' ') + '...' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${tool.categorySlug}`} className="hover:text-foreground">
          {tool.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted">
                <span className="text-2xl font-bold text-muted-foreground">{tool.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
                  {tool.featured && <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>}
                  {tool.sponsored && <Badge variant="secondary">Sponsored</Badge>}
                </div>
                <p className="mt-1 text-lg text-muted-foreground">{tool.shortDescription}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <RatingStars rating={tool.rating} reviewCount={tool.reviewCount} />
                  <SpeedBadge score={tool.speedScore} />
                  <SafetyBadge rating={tool.tosSafetyRating} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <a href={tool.affiliateLink} target="_blank" rel="noopener noreferrer">
                  Visit {tool.name}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/alternatives-to-${tool.slug}`}>Compare Similar</Link>
              </Button>
            </div>
          </div>

          {/* Proprietary Data Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  Speed Score
                </div>
                <div className="mt-2 text-3xl font-bold">{tool.speedScore}/10</div>
                <SpeedBar score={tool.speedScore} className="mt-3" />
                <p className="mt-2 text-sm text-muted-foreground">{getSpeedLabel(tool.speedScore)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  ToS Safety
                </div>
                <div className="mt-2 text-3xl font-bold">{tool.tosSafetyRating}/5</div>
                <SafetyDots rating={tool.tosSafetyRating} className="mt-3" />
                <p className="mt-2 text-sm text-muted-foreground">{getSafetyLabel(tool.tosSafetyRating)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Star className="h-4 w-4" />
                  User Rating
                </div>
                <div className="mt-2 text-3xl font-bold">{tool.rating}/5</div>
                <RatingStars rating={tool.rating} showValue={false} className="mt-3" />
                <p className="mt-2 text-sm text-muted-foreground">Based on {tool.reviewCount} reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What is {tool.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                {tool.fullDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {quickInfo.map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {featureList.map((feature) => {
                  const hasFeature = tool.features[feature.key as keyof typeof tool.features]
                  return (
                    <div
                      key={feature.key}
                      className="flex items-center gap-2 rounded-lg border px-3 py-2"
                    >
                      {hasFeature ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={hasFeature ? '' : 'text-muted-foreground'}>{feature.label}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-emerald-600">Pros</h4>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-red-600">Cons</h4>
                  <ul className="space-y-2">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                        <span className="text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Human Review */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Honest Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                {tool.humanReview.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-muted-foreground last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best For / Avoid If */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardContent className="pt-6">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-emerald-700">
                  <Check className="h-5 w-5" />
                  Best For
                </h4>
                <p className="text-sm text-emerald-800">{tool.bestFor}</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="pt-6">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-red-700">
                  <X className="h-5 w-5" />
                  Avoid If
                </h4>
                <p className="text-sm text-red-800">{tool.avoidIf}</p>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Links */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Compare {tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alternatives.slice(0, 4).map((alt) => (
                  <Link
                    key={alt.id}
                    href={`/${tool.slug}-vs-${alt.slug}`}
                    className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    {tool.name} vs {alt.name}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                ))}
                <Link
                  href={`/alternatives-to-${tool.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
                >
                  Alternatives to {tool.name}
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Similar Tools */}
          {alternatives.length > 0 && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">Similar Tools</h3>
              <div className="space-y-3">
                {alternatives.slice(0, 3).map((alt) => (
                  <ToolCardCompact key={alt.id} tool={alt} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Pricing
                  <PricingBadge model={tool.pricingModel} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-3xl font-bold">{formatPrice(tool)}</div>

                {tool.pricingModel === 'one-time' && (
                  <p className="mb-4 text-sm text-muted-foreground">
                    <Check className="mr-1 inline h-4 w-4 text-emerald-600" />
                    Lifetime access, all features included
                  </p>
                )}

                {tool.exclusiveDeal && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="flex items-center gap-2 font-semibold text-red-700">
                      <Gift className="h-4 w-4" />
                      EXCLUSIVE DEAL
                    </div>
                    <p className="mt-1 text-sm text-red-800">
                      Use code <span className="font-mono font-bold">{tool.exclusiveDeal.split(' ')[0]}</span>
                    </p>
                    <p className="text-sm text-red-700">{tool.exclusiveDeal.split(' ').slice(1).join(' ')}</p>
                  </div>
                )}

                <Button asChild className="w-full gap-2" size="lg">
                  <a href={tool.affiliateLink} target="_blank" rel="noopener noreferrer">
                    Get {tool.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Undo2 className="h-3 w-3" />
                  30-day money-back guarantee
                </p>
              </CardContent>
            </Card>

            {/* Safety Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Safety Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ToS Compliance</span>
                  <SafetyBadge rating={tool.tosSafetyRating} size="sm" />
                </div>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">
                  {tool.tosSafetyRating >= 4
                    ? 'This tool is safe to use and does not violate LinkedIn Terms of Service.'
                    : tool.tosSafetyRating === 3
                      ? 'This tool has some features that may carry risk. Use with caution.'
                      : 'This tool uses automation that violates LinkedIn ToS. Account restrictions possible.'}
                </p>
              </CardContent>
            </Card>

            {/* Back Link */}
            <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
              <Link href={`/category/${tool.categorySlug}`}>
                <ArrowLeft className="h-4 w-4" />
                Back to {tool.category}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
