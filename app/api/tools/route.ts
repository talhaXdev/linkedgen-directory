import { NextResponse } from 'next/server';
import { tools, getToolBySlug, getToolsByCategory, getFeaturedTools, searchTools } from '../../../lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');

  try {
    // Return specific tool by slug
    if (slug) {
      const tool = getToolBySlug(slug);
      if (!tool) {
        return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
      }
      return NextResponse.json(tool);
    }

    // Return tools by category
    if (category) {
      const categoryTools = getToolsByCategory(category);
      return NextResponse.json({
        tools: categoryTools,
        count: categoryTools.length
      });
    }

    // Return featured tools
    if (featured === 'true') {
      const featuredTools = getFeaturedTools();
      return NextResponse.json({
        tools: featuredTools,
        count: featuredTools.length
      });
    }

    // Return search results
    if (search) {
      const searchResults = searchTools(search);
      return NextResponse.json({
        tools: searchResults,
        count: searchResults.length,
        query: search
      });
    }

    // Return all tools
    return NextResponse.json({
      tools,
      count: tools.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}