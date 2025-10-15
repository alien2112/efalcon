import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogCategory } from '@/types/blog';
import { ObjectId } from 'mongodb';

// GET /api/admin/blog/categories - Get all blog categories
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('blog_categories')
      .find({})
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

// POST /api/admin/blog/categories - Create new blog category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    // Generate slug from English name
    const slug = body.name.en.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const category: BlogCategory = {
      slug,
      name: body.name,
      description: body.description,
      color: body.color || '#EFC132',
      isActive: body.isActive ?? true,
      order: body.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('blog_categories').insertOne(category);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...category }
    });
  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/categories - Update blog category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    
    // Generate slug from English name if name is being updated
    if (updateData.name?.en) {
      updateData.slug = updateData.name.en.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    updateData.updatedAt = new Date();
    
    const result = await db.collection('blog_categories').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/categories - Delete blog category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog category ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Check if category is used by any posts
    const postsCount = await db.collection('blog_posts').countDocuments({ category: id });
    if (postsCount > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete category that is used by blog posts' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('blog_categories').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog category' },
      { status: 500 }
    );
  }
}



