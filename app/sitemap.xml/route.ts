import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://linkedgen.directory';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/category/profile-optimization`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/content-generation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/prospecting-outreach`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/data-intelligence`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/automation-workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/full-stack-solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // High-value comparison pages for SEO
  const comparisonPages = [
    'linkedin-sales-navigator-vs-linkedin-helper',
    'dux-soup-vs-expandi',
    'waalaxy-vs-linkedin-automate',
    'leadjet-vs-linkedin-sales-navigator',
    'phantombuster-vs-linkedin-helper',
    'taplio-vs-buffer',
    'lemlist-vs-snovio',
    'hubspot-vs-salesforce-linkedin-integration',
    'zopto-vs-waalaxy',
    'linkedcamp-vs-expandi',
    'octopus-crm-vs-dux-soup',
    'skrapp-vs-hunter-io',
    'snovio-vs-lemlist',
    'salesrobot-vs-waalaxy',
    'plezi-vs-hubspot-linkedin',
  ];

  const dynamicPages = comparisonPages.map(page => ({
    url: `${baseUrl}/compare/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}