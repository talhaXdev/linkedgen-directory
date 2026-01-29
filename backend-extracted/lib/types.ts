export interface Tool {
  id: string
  name: string
  slug: string
  logoUrl: string
  websiteUrl: string
  category: string
  categorySlug: string
  shortDescription: string
  fullDescription: string

  // Pricing
  pricingModel: 'free' | 'freemium' | 'subscription' | 'one-time'
  priceMin: number | null
  priceMax: number | null
  currency: 'USD' | 'EUR' | 'GBP'

  // Proprietary Data
  speedScore: number // 1-10
  tosSafetyRating: number // 1-5
  rating: number // 1-5
  reviewCount: number

  // Features
  features: {
    profileOptimization: boolean
    contentGeneration: boolean
    prospecting: boolean
    emailFinding: boolean
    automation: boolean
    chromeExtension: boolean
    apiAvailable: boolean
    freeTier: boolean
    oneTimePricing: boolean
  }

  // Content
  pros: string[]
  cons: string[]
  humanReview: string
  bestFor: string
  avoidIf: string

  // Marketing
  featured: boolean
  sponsored: boolean
  exclusiveDeal?: string
  affiliateLink: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  toolCount: number
}

export type SafetyLevel = 'safe' | 'caution' | 'risky'
export type SpeedLevel = 'very-fast' | 'fast' | 'average' | 'slow'

export function getSafetyLevel(rating: number): SafetyLevel {
  if (rating >= 4) return 'safe'
  if (rating === 3) return 'caution'
  return 'risky'
}

export function getSafetyLabel(rating: number): string {
  if (rating === 5) return 'Completely Safe'
  if (rating === 4) return 'Safe'
  if (rating === 3) return 'Use with Caution'
  if (rating === 2) return 'High Risk'
  return 'Very Risky'
}

export function getSpeedLevel(score: number): SpeedLevel {
  if (score >= 9) return 'very-fast'
  if (score >= 7) return 'fast'
  if (score >= 5) return 'average'
  return 'slow'
}

export function getSpeedLabel(score: number): string {
  if (score >= 9) return 'Very Fast'
  if (score >= 7) return 'Fast'
  if (score >= 5) return 'Average'
  return 'Slow'
}

export function getPricingLabel(model: Tool['pricingModel']): string {
  switch (model) {
    case 'free':
      return 'Free'
    case 'freemium':
      return 'Freemium'
    case 'subscription':
      return 'Subscription'
    case 'one-time':
      return 'One-time'
  }
}

export function formatPrice(tool: Tool): string {
  if (tool.pricingModel === 'free') return 'Free'
  if (!tool.priceMin) return 'Contact for pricing'
  
  const symbol = tool.currency === 'USD' ? '$' : tool.currency === 'EUR' ? '€' : '£'
  
  if (tool.pricingModel === 'one-time') {
    return `${symbol}${tool.priceMin} one-time`
  }
  
  if (tool.priceMax && tool.priceMax !== tool.priceMin) {
    return `${symbol}${tool.priceMin}-${tool.priceMax}/mo`
  }
  
  return `${symbol}${tool.priceMin}/mo`
}
