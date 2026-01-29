import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SearchContent } from './search-content'

export const metadata: Metadata = {
  title: 'Search LinkedIn Tools',
  description: 'Search and filter LinkedIn lead generation tools by features, pricing, and safety ratings.',
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  )
}

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-5 w-48 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border bg-muted" />
        ))}
      </div>
    </div>
  )
}
