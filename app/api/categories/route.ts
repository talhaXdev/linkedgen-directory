import { NextResponse } from 'next/server';
import { categories, getCategoryBySlug } from '../../../lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    // Return specific category by slug
    if (slug) {
      const category = getCategoryBySlug(slug);
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      return NextResponse.json(category);
    }

    // Return all categories
    return NextResponse.json({
      categories,
      count: categories.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}