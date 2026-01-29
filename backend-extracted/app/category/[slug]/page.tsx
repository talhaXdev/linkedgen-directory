import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategoryBySlug, getToolsByCategory, categories } from '@/lib/data'
import { CategoryContent } from './category-content'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} Tools`,
    description: `Compare ${category.toolCount} ${category.name.toLowerCase()} tools. ${category.description}`,
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const tools = getToolsByCategory(slug)

  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent category={category} tools={tools} />
    </Suspense>
  )
}

function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-10 w-96 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border bg-muted" />
        ))}
      </div>
    </div>
  )
}
