// API Route Template for Listings Management
// Copy this to: /app/api/admin/listings/route.ts in your directory project

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/admin-dashboard/lib/db';
import { validateData, ListingSchema, ListingUpdateSchema } from '@/admin-dashboard/lib/validation';

// GET /api/admin/listings - Get all listings for a directory
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const directory_id = searchParams.get('directory_id');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');

    if (!directory_id) {
      return NextResponse.json({ error: 'directory_id is required' }, { status: 400 });
    }

    // Build query
    let queryText = 'SELECT * FROM listings WHERE directory_id = $1';
    const params: any[] = [directory_id];
    let paramIndex = 2;

    if (category) {
      queryText += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      queryText += ` AND (name ILIKE $${paramIndex} OR short_description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Order and pagination
    queryText += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, (page - 1) * limit);

    const result = await query(queryText, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM listings WHERE directory_id = $1';
    const countParams: any[] = [directory_id];

    if (category) {
      countQuery += ' AND category = $2';
      countParams.push(category);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      listings: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

// POST /api/admin/listings - Create a new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateData(ListingSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const data = validation.data;

    // Generate slug if not provided
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Insert listing
    const result = await query(
      `INSERT INTO listings (
        directory_id, name, slug, logo_url, website_url,
        short_description, full_description, category, subcategory, tags,
        pricing_model, price_min, price_max, currency,
        custom_fields, proprietary_data,
        rating, review_count, human_review,
        pros, cons, best_for, avoid_if,
        affiliate_link, affiliate_partner, exclusive_deal,
        is_featured, is_sponsored, featured_until, search_keywords,
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        NOW(), NOW()
      ) RETURNING *`,
      [
        data.directory_id, data.name, data.slug, data.logo_url, data.website_url,
        data.short_description, data.full_description, data.category, data.subcategory, data.tags,
        data.pricing_model, data.price_min, data.price_max, data.currency,
        JSON.stringify(data.custom_fields || {}), JSON.stringify(data.proprietary_data || {}),
        data.rating, data.review_count, data.human_review,
        data.pros, data.cons, data.best_for, data.avoid_if,
        data.affiliate_link, data.affiliate_partner, data.exclusive_deal,
        data.is_featured, data.is_sponsored, data.featured_until, data.search_keywords,
      ]
    );

    return NextResponse.json({ listing: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating listing:', error);

    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Listing with this slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

// PUT /api/admin/listings/[id] - Update a listing
// Create this in a separate file: /app/api/admin/listings/[id]/route.ts
export async function PUT_EXAMPLE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id } = params;

    // Validate input
    const validation = validateData(ListingUpdateSchema, { ...body, id });
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const data = validation.data;

    // Build UPDATE query dynamically
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        if (key === 'custom_fields' || key === 'proprietary_data') {
          updates.push(`${key} = $${paramIndex}`);
          params.push(JSON.stringify(value));
        } else {
          updates.push(`${key} = $${paramIndex}`);
          params.push(value);
        }
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updates.push(`updated_at = NOW()`);
    params.push(id);

    const queryText = `UPDATE listings SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    const result = await query(queryText, params);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ listing: result.rows[0] });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}

// DELETE /api/admin/listings/[id] - Delete a listing
export async function DELETE_EXAMPLE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await query('DELETE FROM listings WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deleted_id: id });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
