import Link from 'next/link'
import { Search, Zap, Shield, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToolCard } from '@/components/tool-card'
import { CategoryCard } from '@/components/category-card'
import { getFeaturedTools, categories } from '@/lib/data'
import { HeroSearch } from '@/components/hero-search'
import { NewsletterForm } from '@/components/newsletter-form'

const popularComparisons = [
  { label: 'LinkedAI vs Clay', href: '/linkedai-vs-clay' },
  { label: 'LinkedAI vs Waalaxy', href: '/linkedai-vs-waalaxy' },
  { label: 'Clay vs Apollo', href: '/clay-vs-apollo' },
  { label: 'Alternatives to Waalaxy', href: '/alternatives-to-waalaxy' },
  { label: 'Alternatives to Taplio', href: '/alternatives-to-taplio' },
  { label: 'Best Chrome Extensions', href: '/search?features=chromeExtension' },
  { label: 'Free LinkedIn Tools', href: '/search?pricing=free' },
  { label: 'Tools Under $50', href: '/search?pricing=under-50' },
]

export default function HomePage() {
  const featuredTools = getFeaturedTools()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Best LinkedIn Lead Generation Tools 2026
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Compare 80+ tools with verified speed tests, safety ratings, and honest human reviews
            </p>

            {/* Search */}
            <HeroSearch />

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>Speed Tested</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Safety Rated</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                <FileText className="h-4 w-4 text-amber-600" />
                <span>Human Reviews</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/category/full-stack-solutions">Browse All Tools</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/compare">Popular Comparisons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Top Rated LinkedIn Tools</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked tools with the best ratings and safety scores</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link href="/category/full-stack-solutions">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/category/full-stack-solutions">
              View all tools
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Browse by Category</h2>
            <p className="mt-1 text-muted-foreground">Find the right tools for your LinkedIn strategy</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Comparisons Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Comparisons</h2>
          <p className="mt-1 text-muted-foreground">See how top tools stack up against each other</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {popularComparisons.map((comparison) => (
            <Link
              key={comparison.href}
              href={comparison.href}
              className="group inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
            >
              {comparison.label}
              <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Why Trust Our Reviews?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Speed Tested</h3>
              <p className="text-muted-foreground">
                We test Chrome extension load times on real LinkedIn profiles to measure actual performance
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Safety Rated</h3>
              <p className="text-muted-foreground">
                Every tool is rated 1-5 for LinkedIn Terms of Service compliance risk
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <FileText className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Human Reviews</h3>
              <p className="text-muted-foreground">
                500+ word reviews from actual usage, not AI-generated or sponsored content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
            Get Weekly LinkedIn Tool Insights
          </h2>
          <p className="mb-6 text-muted-foreground">
            New tool reviews, comparison guides, and tips delivered to your inbox
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
