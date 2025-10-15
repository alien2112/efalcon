import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { InternalLink, LinkCategory } from '@/types/internal-links';
import { ObjectId } from 'mongodb';

// GET /api/admin/internal-links - Get all internal links
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const category = searchParams.get('category');
    
    let filter = {};
    if (page) {
      filter = { sourcePage: page };
    }
    if (category) {
      filter = { ...filter, category };
    }
    
    const links = await db.collection('internal_links')
      .find(filter)
      .sort({ priority: 1, createdAt: -1 })
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

// POST /api/admin/internal-links - Create new internal link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const internalLink: InternalLink = {
      sourcePage: body.sourcePage,
      sourceElement: body.sourceElement,
      targetPage: body.targetPage,
      targetElement: body.targetElement,
      linkText: body.linkText,
      linkUrl: body.linkUrl,
      linkType: body.linkType || 'internal',
      position: body.position || { x: 0, y: 0 },
      isActive: body.isActive !== false,
      priority: body.priority || 1,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('internal_links').insertOne(internalLink);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...internalLink }
    });
  } catch (error) {
    console.error('Error creating internal link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create internal link' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/internal-links - Update internal link
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    updateData.updatedAt = new Date();
    
    const result = await db.collection('internal_links').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Internal link not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating internal link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update internal link' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/internal-links - Delete internal link
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Internal link ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('internal_links').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Internal link not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Internal link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting internal link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete internal link' },
      { status: 500 }
    );
  }
}



