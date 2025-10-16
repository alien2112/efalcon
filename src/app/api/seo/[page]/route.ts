import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/seo/[page] - Get SEO settings for a specific page
export async function GET(request: NextRequest, { params }: { params: { page: string } }) {
  try {
    const { db } = await connectToDatabase();
    const { page } = params;
    
    const seoSettings = await db.collection('seo_settings').findOne({ page });
    
    if (!seoSettings) {
      return NextResponse.json({
        success: false,
        error: 'SEO settings not found for this page'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: seoSettings
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch SEO settings' },
      { status: 500 }
    );
  }
}




