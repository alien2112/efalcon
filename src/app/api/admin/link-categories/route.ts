import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { LinkCategory } from '@/types/internal-links';
import { ObjectId } from 'mongodb';

// GET /api/admin/link-categories - Get all link categories
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    
    const categories = await db.collection('link_categories')
      .find({})
      .sort({ name: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching link categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch link categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/link-categories - Create new link category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const category: LinkCategory = {
      name: body.name,
      description: body.description,
      color: body.color || '#3B82F6',
      isActive: body.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('link_categories').insertOne(category);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...category }
    });
  } catch (error) {
    console.error('Error creating link category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create link category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/link-categories - Update link category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    updateData.updatedAt = new Date();
    
    const result = await db.collection('link_categories').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Link category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating link category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update link category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/link-categories - Delete link category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Link category ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('link_categories').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Link category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Link category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting link category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete link category' },
      { status: 500 }
    );
  }
}




