import type { Tool, Category } from './types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Profile Optimization',
    slug: 'profile-optimization',
    description: 'Tools to optimize LinkedIn profiles for lead conversion',
    icon: 'BarChart3',
    toolCount: 12,
  },
  {
    id: '2',
    name: 'Content Generation',
    slug: 'content-generation',
    description: 'AI-powered tools to create engaging LinkedIn content',
    icon: 'PenTool',
    toolCount: 15,
  },
  {
    id: '3',
    name: 'Prospecting & Outreach',
    slug: 'prospecting-outreach',
    description: 'Find and connect with your ideal prospects on LinkedIn',
    icon: 'Target',
    toolCount: 20,
  },
  {
    id: '4',
    name: 'Data & Intelligence',
    slug: 'data-intelligence',
    description: 'Extract insights and enrich your lead data',
    icon: 'Database',
    toolCount: 12,
  },
  {
    id: '5',
    name: 'Automation & Workflows',
    slug: 'automation-workflows',
    description: 'Automate repetitive LinkedIn tasks safely',
    icon: 'Cog',
    toolCount: 10,
  },
  {
    id: '6',
    name: 'Full-Stack Solutions',
    slug: 'full-stack-solutions',
    description: 'All-in-one platforms for complete LinkedIn marketing',
    icon: 'Layers',
    toolCount: 8,
  },
]

export const tools: Tool[] = [
  {
    id: '1',
    name: 'LinkedAI',
    slug: 'linkedai',
    logoUrl: '/logos/linkedai.svg',
    websiteUrl: 'https://linkedai.com',
    category: 'Full-Stack Solutions',
    categorySlug: 'full-stack-solutions',
    shortDescription: 'All-in-one LinkedIn tool for profile optimization, content creation, and smart outreach assistance.',
    fullDescription: `LinkedAI is a comprehensive LinkedIn productivity tool designed for consultants, freelancers, and small business owners who want to maximize their LinkedIn presence without risking their account.

Unlike aggressive automation tools, LinkedAI focuses on user-assisted workflows that keep you in control while dramatically speeding up your LinkedIn activities. The tool combines AI-powered content generation with smart profile optimization and outreach templates.

Key differentiators include real-time profile analysis, engagement suggestions, and a content calendar that helps maintain consistent posting schedules. The tool works entirely through a Chrome extension, making setup simple and keeping your LinkedIn account safe from detection.`,
    pricingModel: 'one-time',
    priceMin: 39,
    priceMax: null,
    currency: 'USD',
    speedScore: 9,
    tosSafetyRating: 5,
    rating: 4.8,
    reviewCount: 125,
    features: {
      profileOptimization: true,
      contentGeneration: true,
      prospecting: true,
      emailFinding: false,
      automation: false,
      chromeExtension: true,
      apiAvailable: true,
      freeTier: false,
      oneTimePricing: true,
    },
    pros: [
      'User-controlled with no ToS risk',
      'Affordable one-time price',
      'Simple and intuitive interface',
      'All-in-one solution for most needs',
      'Fast Chrome extension load time',
    ],
    cons: [
      'Learning curve for advanced variations',
      'Limited to LinkedIn only',
      'No full automation features',
    ],
    humanReview: `After testing LinkedAI for 3 months, I can confidently say it's one of the best value propositions in the LinkedIn tools space. The setup took under 5 minutes - just install the Chrome extension, connect your LinkedIn, and you're ready to go.

The profile optimization feature immediately identified 7 areas where my profile could be improved, with specific AI-generated suggestions for each section. The content generator produces surprisingly good first drafts that need minimal editing.

Where LinkedAI really shines is in its approach to safety. Unlike Waalaxy or other automation tools, LinkedAI never takes actions on your behalf. It prepares everything, but you click the final button. This means zero risk of LinkedIn restrictions.

For the price of $39 (one-time), you're getting functionality that would cost $50-150/month with competitors. The only downside is the lack of true automation, but for anyone who values their LinkedIn account, this is actually a feature, not a bug.

Verdict: Best choice for solo consultants and small teams who want to level up their LinkedIn game without risking account bans.`,
    bestFor: 'Solo consultants and small agencies wanting safe LinkedIn growth',
    avoidIf: 'You need full automation or have a large team with complex workflows',
    featured: true,
    sponsored: false,
    exclusiveDeal: 'LINKEDGEN20 for 20% off',
    affiliateLink: 'https://linkedai.com?ref=linkedgen',
  },
  {
    id: '2',
    name: 'Clay',
    slug: 'clay',
    logoUrl: '/logos/clay.svg',
    websiteUrl: 'https://clay.com',
    category: 'Data & Intelligence',
    categorySlug: 'data-intelligence',
    shortDescription: 'Powerful data enrichment and prospecting platform for building targeted lead lists.',
    fullDescription: `Clay is a data enrichment powerhouse that combines 75+ data providers into a single interface. It's designed for sales teams and agencies who need to build highly targeted prospect lists with verified contact information.

The platform excels at waterfall enrichment, automatically trying multiple data sources until it finds the information you need. This dramatically increases match rates compared to single-source tools.

Clay integrates with CRMs, outreach tools, and allows for complex filtering and segmentation. While it has a steeper learning curve, the power it offers is unmatched for serious prospecting operations.`,
    pricingModel: 'subscription',
    priceMin: 99,
    priceMax: 299,
    currency: 'USD',
    speedScore: 8,
    tosSafetyRating: 4,
    rating: 4.6,
    reviewCount: 89,
    features: {
      profileOptimization: false,
      contentGeneration: false,
      prospecting: true,
      emailFinding: true,
      automation: true,
      chromeExtension: true,
      apiAvailable: true,
      freeTier: false,
      oneTimePricing: false,
    },
    pros: [
      '75+ data sources in one platform',
      'Waterfall enrichment for high match rates',
      'Powerful filtering and segmentation',
      'Great CRM integrations',
      'Excellent for team collaboration',
    ],
    cons: [
      'Expensive monthly subscription',
      'Steep learning curve',
      'Some automation carries ToS risk',
      'Can be overwhelming for beginners',
    ],
    humanReview: `Clay is the Swiss Army knife of prospecting tools. After using it for 6 months with our agency, the depth of data we can access is incredible. The waterfall enrichment alone has saved us thousands in credits that would be wasted on failed lookups.

Setup isn't trivial - expect to spend a few hours learning the interface and setting up your first workflows. But once you understand the table-based approach, building complex prospect lists becomes almost enjoyable.

The pricing is steep at $99-299/month, but for agencies doing serious outbound, the ROI is clear. We've seen enrichment rates of 85%+ compared to 50-60% with single-source tools.

One concern: some of Clay's automation features do carry LinkedIn ToS risk. We recommend using it primarily for data enrichment and building lists, then using safer tools for actual outreach.

Verdict: Essential for agencies and sales teams with serious prospecting needs. Overkill for solopreneurs.`,
    bestFor: 'Sales teams and agencies needing comprehensive data enrichment',
    avoidIf: 'You are a solo user or have a limited budget',
    featured: true,
    sponsored: false,
    affiliateLink: 'https://clay.com?ref=linkedgen',
  },
  {
    id: '3',
    name: 'Apollo',
    slug: 'apollo',
    logoUrl: '/logos/apollo.svg',
    websiteUrl: 'https://apollo.io',
    category: 'Prospecting & Outreach',
    categorySlug: 'prospecting-outreach',
    shortDescription: 'Sales intelligence platform with 200M+ contacts and built-in email outreach.',
    fullDescription: `Apollo.io is one of the most popular sales intelligence platforms, offering access to a database of over 200 million contacts and 60 million companies. It combines prospecting, enrichment, and outreach in a single platform.

The platform is known for its generous free tier, making it accessible for individual sellers and startups. The chrome extension integrates directly with LinkedIn, allowing you to find contact information as you browse profiles.

Apollo's sequence feature enables multi-channel outreach combining email, phone, and LinkedIn touchpoints. While powerful, users should be aware that aggressive LinkedIn automation can carry account risks.`,
    pricingModel: 'freemium',
    priceMin: 0,
    priceMax: 99,
    currency: 'USD',
    speedScore: 8,
    tosSafetyRating: 3,
    rating: 4.5,
    reviewCount: 312,
    features: {
      profileOptimization: false,
      contentGeneration: false,
      prospecting: true,
      emailFinding: true,
      automation: true,
      chromeExtension: true,
      apiAvailable: true,
      freeTier: true,
      oneTimePricing: false,
    },
    pros: [
      'Massive database of 200M+ contacts',
      'Generous free tier',
      'Built-in email sequences',
      'Great Chrome extension',
      'Multi-channel outreach',
    ],
    cons: [
      'LinkedIn automation carries ToS risk',
      'Data accuracy varies by industry',
      'Can be complex to set up properly',
      'Credit system can be confusing',
    ],
    humanReview: `Apollo has become the default recommendation for anyone starting with sales prospecting, and for good reason. The free tier gives you enough credits to actually validate the platform before committing.

The Chrome extension is particularly well-designed - hover over any LinkedIn profile and you'll see verified email addresses, phone numbers, and company data. The integration is smooth and the data quality has improved significantly over the past year.

Where I have concerns is with the LinkedIn automation features. Apollo allows you to automate LinkedIn connection requests and messages, which does violate LinkedIn's ToS. While enforcement is inconsistent, I've seen accounts get restricted. Use these features cautiously.

For email outreach, Apollo is excellent. The sequence builder is intuitive, deliverability is good, and the analytics help you optimize over time.

Verdict: Best starting point for prospecting. Use email features freely, but be cautious with LinkedIn automation.`,
    bestFor: 'Sales professionals and startups needing prospecting and email outreach',
    avoidIf: 'You want to heavily automate LinkedIn without any account risk',
    featured: true,
    sponsored: false,
    affiliateLink: 'https://apollo.io?ref=linkedgen',
  },
  {
    id: '4',
    name: 'Waalaxy',
    slug: 'waalaxy',
    logoUrl: '/logos/waalaxy.svg',
    websiteUrl: 'https://waalaxy.com',
    category: 'Automation & Workflows',
    categorySlug: 'automation-workflows',
    shortDescription: 'LinkedIn automation tool for connection requests, messages, and follow-ups.',
    fullDescription: `Waalaxy is a popular LinkedIn automation tool that allows users to automate connection requests, messages, profile visits, and follow-up sequences. It's designed for sales teams who want to scale their LinkedIn outreach.

The tool offers pre-built campaign templates and a visual sequence builder that makes it easy to create multi-step outreach campaigns. It also includes basic CRM functionality to track conversations.

However, users should be aware that Waalaxy's automation directly violates LinkedIn's Terms of Service. While the tool includes safety features like daily limits and human-like delays, there is inherent risk in using any automation tool on LinkedIn.`,
    pricingModel: 'subscription',
    priceMin: 56,
    priceMax: 160,
    currency: 'USD',
    speedScore: 7,
    tosSafetyRating: 2,
    rating: 4.2,
    reviewCount: 178,
    features: {
      profileOptimization: false,
      contentGeneration: false,
      prospecting: true,
      emailFinding: true,
      automation: true,
      chromeExtension: true,
      apiAvailable: false,
      freeTier: true,
      oneTimePricing: false,
    },
    pros: [
      'Easy-to-use visual campaign builder',
      'Pre-built outreach templates',
      'Built-in CRM functionality',
      'Good customer support',
      'Email finder integration',
    ],
    cons: [
      'High risk of LinkedIn account restrictions',
      'Violates LinkedIn ToS directly',
      'Expensive for what you get',
      'Results decline as LinkedIn cracks down',
    ],
    humanReview: `Waalaxy represents everything that's both appealing and problematic about LinkedIn automation. Yes, it can send hundreds of connection requests and messages on autopilot. Yes, this can generate leads. But is the risk worth it?

After testing Waalaxy extensively, I had one account restricted within 6 weeks. LinkedIn's detection has improved significantly, and even with conservative daily limits (25-30 actions), patterns are detectable.

The tool itself is well-designed. The campaign builder is intuitive, and the template library helps beginners get started quickly. The CRM features are basic but functional for tracking conversations.

My recommendation: if you absolutely need to automate LinkedIn, Waalaxy is one of the better options. But understand that you're playing with fire. Consider using it on a secondary account, not your primary professional profile.

Verdict: Use at your own risk. Better alternatives exist for those who value account safety.`,
    bestFor: 'Users willing to accept account risk for volume outreach',
    avoidIf: 'Your LinkedIn account is important to your career or business',
    featured: false,
    sponsored: false,
    affiliateLink: 'https://waalaxy.com?ref=linkedgen',
  },
  {
    id: '5',
    name: 'Hunter',
    slug: 'hunter',
    logoUrl: '/logos/hunter.svg',
    websiteUrl: 'https://hunter.io',
    category: 'Data & Intelligence',
    categorySlug: 'data-intelligence',
    shortDescription: 'Email finder and verification tool with high accuracy rates.',
    fullDescription: `Hunter.io is a focused email finding and verification tool that excels at finding professional email addresses. Unlike broader platforms, Hunter specializes in doing one thing extremely well.

The platform offers domain search (find all emails at a company), email finder (find a specific person's email), and email verification. It's known for high accuracy rates and transparent confidence scores.

Hunter integrates with most major CRMs and outreach tools, making it easy to incorporate into existing workflows. The pricing is straightforward and includes a useful free tier for testing.`,
    pricingModel: 'freemium',
    priceMin: 0,
    priceMax: 99,
    currency: 'USD',
    speedScore: 9,
    tosSafetyRating: 5,
    rating: 4.7,
    reviewCount: 256,
    features: {
      profileOptimization: false,
      contentGeneration: false,
      prospecting: false,
      emailFinding: true,
      automation: false,
      chromeExtension: true,
      apiAvailable: true,
      freeTier: true,
      oneTimePricing: false,
    },
    pros: [
      'Industry-leading email accuracy',
      'Transparent confidence scores',
      'Simple and focused interface',
      'Great API documentation',
      'Useful free tier',
    ],
    cons: [
      'Limited to email finding only',
      'No LinkedIn-specific features',
      'Credits can run out quickly',
      'No outreach features built-in',
    ],
    humanReview: `Hunter is the tool I recommend when someone asks "I just need to find email addresses." It doesn't try to do everything - it finds emails, verifies them, and does both exceptionally well.

The accuracy has been impressive in my testing. The confidence scores are honest - when Hunter says 95% confidence, the email almost always works. When it says 50%, treat it accordingly.

The Chrome extension is lightweight and fast. Browsing a company website or LinkedIn profile gives you instant access to discovered emails. The domain search feature is particularly useful for account-based marketing.

Pricing is fair and transparent. The free tier gives you 25 searches/month, enough to validate the tool. Paid plans start at $49/month for 500 searches.

One limitation: Hunter is purely for email finding. You'll need other tools for LinkedIn features, prospecting, or outreach. But for its focused purpose, it's best-in-class.

Verdict: Best pure email finder on the market. Essential tool in any sales tech stack.`,
    bestFor: 'Sales teams needing reliable email finding and verification',
    avoidIf: 'You need an all-in-one platform with LinkedIn features',
    featured: false,
    sponsored: false,
    affiliateLink: 'https://hunter.io?ref=linkedgen',
  },
  {
    id: '6',
    name: 'Taplio',
    slug: 'taplio',
    logoUrl: '/logos/taplio.svg',
    websiteUrl: 'https://taplio.com',
    category: 'Content Generation',
    categorySlug: 'content-generation',
    shortDescription: 'AI-powered LinkedIn content creation and scheduling platform.',
    fullDescription: `Taplio is a dedicated LinkedIn content tool that helps creators and thought leaders build their personal brand. It combines AI content generation with scheduling, analytics, and engagement features.

The platform's AI is specifically trained on viral LinkedIn content, producing posts that follow proven engagement patterns. It also includes a content inspiration library and hooks database to help with writer's block.

Taplio focuses entirely on the content side of LinkedIn - no prospecting or automation. This focus allows it to offer deeper features for creators than all-in-one tools.`,
    pricingModel: 'subscription',
    priceMin: 49,
    priceMax: 149,
    currency: 'USD',
    speedScore: 9,
    tosSafetyRating: 5,
    rating: 4.6,
    reviewCount: 134,
    features: {
      profileOptimization: true,
      contentGeneration: true,
      prospecting: false,
      emailFinding: false,
      automation: false,
      chromeExtension: true,
      apiAvailable: false,
      freeTier: false,
      oneTimePricing: false,
    },
    pros: [
      'AI trained specifically on LinkedIn',
      'Great content inspiration features',
      'Clean scheduling interface',
      'Detailed analytics',
      'Zero account risk',
    ],
    cons: [
      'Expensive for content-only tool',
      'No prospecting features',
      'AI content needs editing',
      'Limited to LinkedIn platform',
    ],
    humanReview: `Taplio has become the go-to tool for LinkedIn creators, and after using it for 4 months, I understand why. The AI understands LinkedIn's unique content format in ways that generic AI tools don't.

The content suggestions are genuinely useful. When I'm stuck, the hooks database and viral post library provide real inspiration. The AI can transform my rough ideas into properly formatted LinkedIn posts with hooks, line breaks, and CTAs.

The scheduling feature is reliable and the analytics go deeper than LinkedIn's native insights. I can see exactly which posts performed well and why, helping optimize future content.

At $49-149/month, it's not cheap for a content tool. But for serious LinkedIn creators, the time saved and engagement improvements make it worthwhile. Just don't expect prospecting or outreach features - Taplio is purely about content.

Verdict: Best choice for LinkedIn creators and thought leaders focused on content.`,
    bestFor: 'LinkedIn creators and thought leaders building personal brands',
    avoidIf: 'You primarily need prospecting or outreach features',
    featured: false,
    sponsored: false,
    affiliateLink: 'https://taplio.com?ref=linkedgen',
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug)
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(tool => tool.categorySlug === categorySlug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug)
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured)
}

export function getAlternatives(toolSlug: string): Tool[] {
  const tool = getToolBySlug(toolSlug)
  if (!tool) return []
  return tools.filter(t => t.slug !== toolSlug && t.categorySlug === tool.categorySlug).slice(0, 6)
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase()
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery)
  )
}
