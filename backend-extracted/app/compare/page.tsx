import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, GitCompare, Replace } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { tools } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Compare LinkedIn Tools',
  description: 'Compare LinkedIn lead generation tools side-by-side. Find the best tool for your needs.',
}

export default function ComparePage() {
  // Generate popular comparisons
  const popularComparisons = [
    { tool1: 'linkedai', tool2: 'clay' },
    { tool1: 'linkedai', tool2: 'waalaxy' },
    { tool1: 'clay', tool2: 'apollo' },
    { tool1: 'apollo', tool2: 'hunter' },
    { tool1: 'waalaxy', tool2: 'apollo' },
    { tool1: 'taplio', tool2: 'linkedai' },
  ]
    .map(({ tool1, tool2 }) => {
      const t1 = tools.find((t) => t.slug === tool1)
      const t2 = tools.find((t) => t.slug === tool2)
      if (!t1 || !t2) return null
      return { tool1: t1, tool2: t2 }
    })
    .filter(Boolean)

  // Generate alternatives links
  const popularAlternatives = tools.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Compare LinkedIn Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Side-by-side comparisons and alternatives for popular LinkedIn tools
        </p>
      </div>

      {/* Popular Comparisons */}
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Popular Comparisons</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularComparisons.map((comparison) => {
            if (!comparison) return null
            return (
              <Link
                key={`${comparison.tool1.slug}-${comparison.tool2.slug}`}
                href={`/${comparison.tool1.slug}-vs-${comparison.tool2.slug}`}
              >
                <Card className="group transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <span className="font-bold">{comparison.tool1.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
                      vs
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <span className="font-bold">{comparison.tool2.name.charAt(0)}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                  <div className="border-t px-6 py-3 text-center text-sm font-medium">
                    {comparison.tool1.name} vs {comparison.tool2.name}
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Alternatives */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <Replace className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Find Alternatives</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {popularAlternatives.map((tool) => (
            <Link
              key={tool.id}
              href={`/alternatives-to-${tool.slug}`}
              className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
            >
              Alternatives to {tool.name}
              <ArrowRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
