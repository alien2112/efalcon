import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/blog/categories - Get active blog categories for public consumption
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('blog_categories')
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog categories' },
      { status: 500 }
    );
  }
}



