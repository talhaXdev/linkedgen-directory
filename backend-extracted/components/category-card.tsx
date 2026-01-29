import React from "react"
import Link from 'next/link'
import { ArrowRight, BarChart3, PenTool, Target, Database, Cog, Layers } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  PenTool,
  Target,
  Database,
  Cog,
  Layers,
}

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || BarChart3

  return (
    <Link href={`/category/${category.slug}`}>
      <Card
        className={cn(
          'group h-full transition-all hover:border-primary/50 hover:shadow-md',
          className
        )}
      >
        <CardContent className="flex h-full flex-col pt-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-semibold">{category.name}</h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground">{category.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{category.toolCount} tools</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
