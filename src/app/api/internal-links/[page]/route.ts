import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/internal-links/[page] - Get internal links for a specific page
export async function GET(request: NextRequest, { params }: { params: { page: string } }) {
  try {
    const { db } = await connectToDatabase();
    const { page } = params;
    
    const links = await db.collection('internal_links')
      .find({ 
        sourcePage: page,
        isActive: true 
      })
      .sort({ priority: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: links
    });
  } catch (error) {
    console.error('Error fetching internal links:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch internal links' },
      { status: 500 }
    );
  }
}




