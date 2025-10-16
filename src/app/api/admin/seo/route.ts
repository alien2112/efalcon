import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { SEOSettings } from '@/types/seo';
import { ObjectId } from 'mongodb';

// GET /api/admin/seo - Get all SEO settings
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    let filter = {};
    if (page) {
      filter = { page };
    }
    
    const seoSettings = await db.collection('seo_settings')
      .find(filter)
      .sort({ page: 1 })
      .toArray();
    
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

// POST /api/admin/seo - Create new SEO settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const seoSettings: SEOSettings = {
      page: body.page,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords || [],
      canonicalUrl: body.canonicalUrl,
      ogTitle: body.ogTitle,
      ogDescription: body.ogDescription,
      ogImage: body.ogImage,
      twitterCard: body.twitterCard || 'summary_large_image',
      twitterTitle: body.twitterTitle,
      twitterDescription: body.twitterDescription,
      twitterImage: body.twitterImage,
      structuredData: body.structuredData || {},
      robots: body.robots || { index: true, follow: true },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('seo_settings').insertOne(seoSettings);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...seoSettings }
    });
  } catch (error) {
    console.error('Error creating SEO settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create SEO settings' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/seo - Update SEO settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    updateData.updatedAt = new Date();
    
    const result = await db.collection('seo_settings').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'SEO settings not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update SEO settings' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/seo - Delete SEO settings
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'SEO settings ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('seo_settings').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'SEO settings not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'SEO settings deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting SEO settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete SEO settings' },
      { status: 500 }
    );
  }
}




