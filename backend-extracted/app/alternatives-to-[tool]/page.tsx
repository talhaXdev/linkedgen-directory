import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, ExternalLink, Check, DollarSign, AlertTriangle, Sparkles, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToolCard } from '@/components/tool-card'
import { RatingStars } from '@/components/rating-stars'
import { SafetyBadge } from '@/components/safety-badge'
import { SpeedBadge } from '@/components/speed-badge'
import { getToolBySlug, getAlternatives, tools } from '@/lib/data'
import { formatPrice } from '@/lib/types'

interface AlternativesPageProps {
  params: Promise<{ tool: string }>
}

function parseSlug(slug: string): string | null {
  if (!slug.startsWith('alternatives-to-')) return null
  return slug.replace('alternatives-to-', '')
}

export async function generateMetadata({ params }: AlternativesPageProps): Promise<Metadata> {
  const { tool: slug } = await params
  const toolSlug = parseSlug(slug)
  if (!toolSlug) return { title: 'Alternatives Not Found' }

  const tool = getToolBySlug(toolSlug)
  if (!tool) return { title: 'Alternatives Not Found' }

  return {
    title: `Top ${tool.name} Alternatives 2026`,
    description: `Find the best ${tool.name} alternatives. Compare features, pricing, and safety ratings to find the right LinkedIn tool for you.`,
  }
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    tool: `alternatives-to-${tool.slug}`,
  }))
}

export default async function AlternativesPage({ params }: AlternativesPageProps) {
  const { tool: slug } = await params
  const toolSlug = parseSlug(slug)

  if (!toolSlug) {
    notFound()
  }

  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    notFound()
  }

  const alternatives = getAlternatives(toolSlug)

  // Find the top recommended alternative (highest safety + rating combo)
  const topAlternative = [...alternatives].sort(
    (a, b) => b.tosSafetyRating * 2 + b.rating - (a.tosSafetyRating * 2 + a.rating)
  )[0]

  const otherAlternatives = alternatives.filter((alt) => alt.id !== topAlternative?.id)

  // Why look for alternatives
  const reasons = [
    {
      icon: DollarSign,
      title: 'High Cost',
      description: `${tool.pricingModel === 'subscription' ? `${formatPrice(tool)} monthly can add up quickly` : 'Looking for more affordable options'}`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      icon: AlertTriangle,
      title: 'ToS Risk',
      description:
        tool.tosSafetyRating <= 3
          ? 'Aggressive automation may risk LinkedIn account restrictions'
          : 'Want even safer alternatives with zero risk',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Sparkles,
      title: 'Better Options',
      description: 'Newer tools may offer more features or better value',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/compare" className="hover:text-foreground">
          Alternatives
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{tool.name} Alternatives</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Top {tool.name} Alternatives 2026
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Save money and find safer alternatives with more features
        </p>
      </div>

      {/* Why Look for Alternatives */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Why Look for {tool.name} Alternatives?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {reasons.map((reason) => (
            <Card key={reason.title}>
              <CardContent className="pt-6">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${reason.bgColor}`}>
                  <reason.icon className={`h-5 w-5 ${reason.color}`} />
                </div>
                <h3 className="mb-1 font-semibold">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Recommended Alternative */}
      {topAlternative && (
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle>#1 RECOMMENDED ALTERNATIVE</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm">
                <span className="text-3xl font-bold text-muted-foreground">
                  {topAlternative.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{topAlternative.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <RatingStars rating={topAlternative.rating} size="sm" />
                  <SpeedBadge score={topAlternative.speedScore} size="sm" />
                  <SafetyBadge rating={topAlternative.tosSafetyRating} size="sm" />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {topAlternative.tosSafetyRating > tool.tosSafetyRating && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>
                        Safer ({topAlternative.tosSafetyRating}/5 vs {tool.tosSafetyRating}/5)
                      </span>
                    </div>
                  )}
                  {(topAlternative.priceMin ?? 0) < (tool.priceMin ?? 999) && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>
                        Cheaper ({formatPrice(topAlternative)} vs {formatPrice(tool)})
                      </span>
                    </div>
                  )}
                  {topAlternative.speedScore > tool.speedScore && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Faster performance</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>{topAlternative.bestFor.split(' ').slice(0, 4).join(' ')}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href={`/tools/${topAlternative.slug}`}>View {topAlternative.name}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={`/${topAlternative.slug}-vs-${tool.slug}`}>
                      Compare with {tool.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Alternatives Grid */}
      {otherAlternatives.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Other {tool.name} Alternatives</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherAlternatives.map((alt) => (
              <ToolCard key={alt.id} tool={alt} />
            ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {alternatives.length > 0 && (
        <Card className="mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle>All Alternatives vs {tool.name}</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tool</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                  <TableHead className="text-center">Speed</TableHead>
                  <TableHead className="text-center">Safety</TableHead>
                  <TableHead className="text-center">Pricing</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Original tool for reference */}
                <TableRow className="bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tool.name}</span>
                      <Badge variant="secondary">Original</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <RatingStars rating={tool.rating} size="sm" showValue={true} />
                  </TableCell>
                  <TableCell className="text-center">
                    <SpeedBadge score={tool.speedScore} size="sm" />
                  </TableCell>
                  <TableCell className="text-center">
                    <SafetyBadge rating={tool.tosSafetyRating} showLabel={false} size="sm" />
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium">{formatPrice(tool)}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/tools/${tool.slug}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Alternatives */}
                {alternatives.map((alt) => (
                  <TableRow key={alt.id}>
                    <TableCell>
                      <span className="font-medium">{alt.name}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <RatingStars rating={alt.rating} size="sm" showValue={true} />
                    </TableCell>
                    <TableCell className="text-center">
                      <SpeedBadge score={alt.speedScore} size="sm" />
                    </TableCell>
                    <TableCell className="text-center">
                      <SafetyBadge rating={alt.tosSafetyRating} showLabel={false} size="sm" />
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{formatPrice(alt)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button asChild size="sm">
                        <Link href={`/tools/${alt.slug}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Back Link */}
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href={`/tools/${tool.slug}`}>Back to {tool.name} Review</Link>
        </Button>
      </div>
    </div>
  )
}
