'use client'

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToolCard } from '@/components/tool-card'
import { searchTools, tools } from '@/lib/data'

export function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = React.useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = React.useState(initialQuery)

  // Debounce search query
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Update URL when debounced query changes
  React.useEffect(() => {
    if (debouncedQuery) {
      router.replace(`/search?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false })
    } else {
      router.replace('/search', { scroll: false })
    }
  }, [debouncedQuery, router])

  const results = debouncedQuery ? searchTools(debouncedQuery) : tools

  const clearSearch = () => {
    setQuery('')
    setDebouncedQuery('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Search LinkedIn Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Find the perfect tool for your LinkedIn strategy
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, category, or feature..."
            className="h-12 pl-10 pr-10 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">
        {debouncedQuery ? (
          <>
            Showing {results.length} results for &quot;{debouncedQuery}&quot;
          </>
        ) : (
          <>Showing all {results.length} tools</>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-muted/50 py-16 text-center">
          <p className="text-lg font-medium">No tools found</p>
          <p className="mt-1 text-muted-foreground">Try adjusting your search terms</p>
          <Button variant="outline" onClick={clearSearch} className="mt-4 bg-transparent">
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
