'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ToolCard } from '@/components/tool-card'
import type { Category, Tool } from '@/lib/types'

interface CategoryContentProps {
  category: Category
  tools: Tool[]
}

type SortOption = 'rating' | 'speed' | 'price-low' | 'price-high' | 'safety'
type PricingFilter = 'all' | 'free' | 'under-50' | 'under-100' | 'premium'
type SafetyFilter = 'all' | 'safe' | 'caution' | 'risky'

export function CategoryContent({ category, tools }: CategoryContentProps) {
  const [sortBy, setSortBy] = React.useState<SortOption>('rating')
  const [pricingFilter, setPricingFilter] = React.useState<PricingFilter>('all')
  const [safetyFilter, setSafetyFilter] = React.useState<SafetyFilter>('all')
  const [featureFilters, setFeatureFilters] = React.useState<string[]>([])

  const filteredAndSortedTools = React.useMemo(() => {
    let result = [...tools]

    // Apply pricing filter
    if (pricingFilter !== 'all') {
      result = result.filter((tool) => {
        if (pricingFilter === 'free') return tool.pricingModel === 'free'
        if (pricingFilter === 'under-50') return (tool.priceMin ?? 0) < 50
        if (pricingFilter === 'under-100') return (tool.priceMin ?? 0) < 100
        if (pricingFilter === 'premium') return (tool.priceMin ?? 0) >= 100
        return true
      })
    }

    // Apply safety filter
    if (safetyFilter !== 'all') {
      result = result.filter((tool) => {
        if (safetyFilter === 'safe') return tool.tosSafetyRating >= 4
        if (safetyFilter === 'caution') return tool.tosSafetyRating === 3
        if (safetyFilter === 'risky') return tool.tosSafetyRating <= 2
        return true
      })
    }

    // Apply feature filters
    if (featureFilters.length > 0) {
      result = result.filter((tool) =>
        featureFilters.every((feature) => tool.features[feature as keyof typeof tool.features])
      )
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'speed':
          return b.speedScore - a.speedScore
        case 'safety':
          return b.tosSafetyRating - a.tosSafetyRating
        case 'price-low':
          return (a.priceMin ?? 0) - (b.priceMin ?? 0)
        case 'price-high':
          return (b.priceMin ?? 0) - (a.priceMin ?? 0)
        default:
          return 0
      }
    })

    return result
  }, [tools, sortBy, pricingFilter, safetyFilter, featureFilters])

  const toggleFeature = (feature: string) => {
    setFeatureFilters((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    )
  }

  const clearFilters = () => {
    setPricingFilter('all')
    setSafetyFilter('all')
    setFeatureFilters([])
  }

  const hasActiveFilters = pricingFilter !== 'all' || safetyFilter !== 'all' || featureFilters.length > 0

  const featureOptions = [
    { value: 'profileOptimization', label: 'Profile Optimization' },
    { value: 'contentGeneration', label: 'Content Generation' },
    { value: 'prospecting', label: 'Prospecting' },
    { value: 'emailFinding', label: 'Email Finding' },
    { value: 'automation', label: 'Automation' },
    { value: 'chromeExtension', label: 'Chrome Extension' },
    { value: 'apiAvailable', label: 'API Available' },
    { value: 'freeTier', label: 'Free Tier' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/category" className="hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{category.name} Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {tools.length} tools to {category.description.toLowerCase()}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 md:hidden bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {(pricingFilter !== 'all' ? 1 : 0) +
                    (safetyFilter !== 'all' ? 1 : 0) +
                    featureFilters.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <FilterSection
                title="Pricing"
                value={pricingFilter}
                onChange={(v) => setPricingFilter(v as PricingFilter)}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'free', label: 'Free' },
                  { value: 'under-50', label: 'Under $50' },
                  { value: 'under-100', label: 'Under $100' },
                  { value: 'premium', label: 'Premium ($100+)' },
                ]}
              />
              <FilterSection
                title="Safety"
                value={safetyFilter}
                onChange={(v) => setSafetyFilter(v as SafetyFilter)}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'safe', label: 'Safe (4-5)' },
                  { value: 'caution', label: 'Caution (3)' },
                  { value: 'risky', label: 'Risky (1-2)' },
                ]}
              />
              <div>
                <h3 className="mb-3 text-sm font-medium">Features</h3>
                <div className="space-y-3">
                  {featureOptions.map((option) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={option.value}
                        checked={featureFilters.includes(option.value)}
                        onCheckedChange={() => toggleFeature(option.value)}
                      />
                      <Label htmlFor={option.value} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="w-full">
                  Clear all filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Filters */}
        <div className="hidden flex-wrap items-center gap-4 md:flex">
          <Select value={pricingFilter} onValueChange={(v) => setPricingFilter(v as PricingFilter)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pricing</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="under-50">Under $50</SelectItem>
              <SelectItem value="under-100">Under $100</SelectItem>
              <SelectItem value="premium">Premium ($100+)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={safetyFilter} onValueChange={(v) => setSafetyFilter(v as SafetyFilter)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Safety" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Safety</SelectItem>
              <SelectItem value="safe">Safe (4-5)</SelectItem>
              <SelectItem value="caution">Caution (3)</SelectItem>
              <SelectItem value="risky">Risky (1-2)</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="speed">Speed Score</SelectItem>
              <SelectItem value="safety">Safety Rating</SelectItem>
              <SelectItem value="price-low">Price (Low-High)</SelectItem>
              <SelectItem value="price-high">Price (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filteredAndSortedTools.length} of {tools.length} tools
      </p>

      {/* Tools Grid */}
      {filteredAndSortedTools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-muted/50 py-16 text-center">
          <p className="text-lg font-medium">No tools match your filters</p>
          <p className="mt-1 text-muted-foreground">Try adjusting your filter criteria</p>
          <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}

interface FilterSectionProps {
  title: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

function FilterSection({ title, value, onChange, options }: FilterSectionProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
