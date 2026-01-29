import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, ExternalLink, Check, X, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RatingStars } from '@/components/rating-stars'
import { SafetyBadge } from '@/components/safety-badge'
import { SpeedBadge } from '@/components/speed-badge'
import { PricingBadge } from '@/components/pricing-badge'
import { getToolBySlug, tools } from '@/lib/data'
import { formatPrice } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ComparisonPageProps {
  params: Promise<{ 'tool1-vs-tool2': string }>
}

function parseSlug(slug: string): { tool1Slug: string; tool2Slug: string } | null {
  const parts = slug.split('-vs-')
  if (parts.length !== 2) return null
  return { tool1Slug: parts[0], tool2Slug: parts[1] }
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { 'tool1-vs-tool2': slug } = await params
  const parsed = parseSlug(slug)
  if (!parsed) return { title: 'Comparison Not Found' }

  const tool1 = getToolBySlug(parsed.tool1Slug)
  const tool2 = getToolBySlug(parsed.tool2Slug)

  if (!tool1 || !tool2) return { title: 'Comparison Not Found' }

  return {
    title: `${tool1.name} vs ${tool2.name}`,
    description: `Compare ${tool1.name} and ${tool2.name}: features, pricing, safety ratings, and speed scores. Find which LinkedIn tool is right for you.`,
  }
}

export function generateStaticParams() {
  const params: { 'tool1-vs-tool2': string }[] = []
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      params.push({ 'tool1-vs-tool2': `${tools[i].slug}-vs-${tools[j].slug}` })
    }
  }
  return params
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { 'tool1-vs-tool2': slug } = await params
  const parsed = parseSlug(slug)

  if (!parsed) {
    notFound()
  }

  const tool1 = getToolBySlug(parsed.tool1Slug)
  const tool2 = getToolBySlug(parsed.tool2Slug)

  if (!tool1 || !tool2) {
    notFound()
  }

  const featureList = [
    { key: 'profileOptimization', label: 'Profile Optimization' },
    { key: 'contentGeneration', label: 'Content Generation' },
    { key: 'prospecting', label: 'Prospecting' },
    { key: 'emailFinding', label: 'Email Finding' },
    { key: 'automation', label: 'Automation' },
    { key: 'chromeExtension', label: 'Chrome Extension' },
    { key: 'apiAvailable', label: 'API Available' },
    { key: 'freeTier', label: 'Free Tier' },
  ]

  // Determine winner for quick verdict
  const scoreComparison = {
    rating: tool1.rating >= tool2.rating ? tool1 : tool2,
    safety: tool1.tosSafetyRating >= tool2.tosSafetyRating ? tool1 : tool2,
    speed: tool1.speedScore >= tool2.speedScore ? tool1 : tool2,
    price: (tool1.priceMin ?? 0) <= (tool2.priceMin ?? 0) ? tool1 : tool2,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/compare" className="hover:text-foreground">
          Comparisons
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">
          {tool1.name} vs {tool2.name}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {tool1.name} vs {tool2.name}: Which is Better?
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Side-by-side comparison of features, pricing, and performance
        </p>
      </div>

      {/* Quick Verdict */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Quick Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Choose {tool1.name} if:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {tool1.tosSafetyRating > tool2.tosSafetyRating && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Safety is your priority ({tool1.tosSafetyRating}/5 vs {tool2.tosSafetyRating}/5)
                  </li>
                )}
                {(tool1.priceMin ?? 0) < (tool2.priceMin ?? 0) && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    You want lower cost ({formatPrice(tool1)} vs {formatPrice(tool2)})
                  </li>
                )}
                {tool1.speedScore > tool2.speedScore && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    You need faster performance ({tool1.speedScore}/10 vs {tool2.speedScore}/10)
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {tool1.bestFor}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Choose {tool2.name} if:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {tool2.tosSafetyRating > tool1.tosSafetyRating && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Safety is your priority ({tool2.tosSafetyRating}/5 vs {tool1.tosSafetyRating}/5)
                  </li>
                )}
                {(tool2.priceMin ?? 0) < (tool1.priceMin ?? 0) && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    You want lower cost ({formatPrice(tool2)} vs {formatPrice(tool1)})
                  </li>
                )}
                {tool2.speedScore > tool1.speedScore && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    You need faster performance ({tool2.speedScore}/10 vs {tool1.speedScore}/10)
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {tool2.bestFor}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-48">Feature</TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
                      <span className="font-bold">{tool1.name.charAt(0)}</span>
                    </div>
                    <span className="font-semibold">{tool1.name}</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
                      <span className="font-bold">{tool2.name.charAt(0)}</span>
                    </div>
                    <span className="font-semibold">{tool2.name}</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Rating</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <RatingStars rating={tool1.rating} size="sm" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <RatingStars rating={tool2.rating} size="sm" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Speed Score</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <SpeedBadge score={tool1.speedScore} size="sm" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <SpeedBadge score={tool2.speedScore} size="sm" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Safety Rating</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <SafetyBadge rating={tool1.tosSafetyRating} size="sm" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <SafetyBadge rating={tool2.tosSafetyRating} size="sm" />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pricing</TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{formatPrice(tool1)}</span>
                    <PricingBadge model={tool1.pricingModel} size="sm" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{formatPrice(tool2)}</span>
                    <PricingBadge model={tool2.pricingModel} size="sm" />
                  </div>
                </TableCell>
              </TableRow>
              {featureList.map((feature) => (
                <TableRow key={feature.key}>
                  <TableCell className="font-medium">{feature.label}</TableCell>
                  <TableCell className="text-center">
                    {tool1.features[feature.key as keyof typeof tool1.features] ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {tool2.features[feature.key as keyof typeof tool2.features] ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-muted-foreground" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell className="max-w-48 text-center text-sm text-muted-foreground">
                  {tool1.bestFor}
                </TableCell>
                <TableCell className="max-w-48 text-center text-sm text-muted-foreground">
                  {tool2.bestFor}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* CTA Section */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
              <span className="text-2xl font-bold">{tool1.name.charAt(0)}</span>
            </div>
            <h3 className="mb-1 text-xl font-semibold">{tool1.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{formatPrice(tool1)}</p>
            <div className="flex gap-2">
              <Button asChild>
                <a href={tool1.affiliateLink} target="_blank" rel="noopener noreferrer">
                  Get {tool1.name}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/tools/${tool1.slug}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
              <span className="text-2xl font-bold">{tool2.name.charAt(0)}</span>
            </div>
            <h3 className="mb-1 text-xl font-semibold">{tool2.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{formatPrice(tool2)}</p>
            <div className="flex gap-2">
              <Button asChild>
                <a href={tool2.affiliateLink} target="_blank" rel="noopener noreferrer">
                  Get {tool2.name}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/tools/${tool2.slug}`}>View Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Comparisons */}
      <div className="text-center">
        <h3 className="mb-4 text-lg font-semibold">More Comparisons</h3>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href={`/alternatives-to-${tool1.slug}`}
            className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
          >
            Alternatives to {tool1.name}
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Link
            href={`/alternatives-to-${tool2.slug}`}
            className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
          >
            Alternatives to {tool2.name}
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
