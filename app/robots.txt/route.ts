import { NextResponse } from 'next/server';

export function GET() {
  const robots = `User-agent: *
Allow: /
Allow: /category/
Allow: /compare/
Allow: /tools/
Allow: /blog/

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /logs/

# Allow specific API endpoints that are public
Allow: /api/tools
Allow: /api/categories

# Sitemap location
Sitemap: https://linkedgen.directory/sitemap.xml

# Crawl delay (optional, helps prevent overloading)
Crawl-delay: 1

# Specific instructions for major crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Block unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  });
}