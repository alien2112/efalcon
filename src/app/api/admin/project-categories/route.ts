import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProjectCategory } from '@/types/projects';
import { ObjectId } from 'mongodb';

// GET /api/admin/project-categories - Get all project categories
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('projectCategories')
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/project-categories - Create new project category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const category: ProjectCategory = {
      name: body.name,
      description: body.description,
      slug: body.slug,
      order: body.order ?? 0,
      isActive: body.isActive ?? true
    };
    
    const result = await db.collection('projectCategories').insertOne(category);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...category }
    });
  } catch (error) {
    console.error('Error creating project category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/project-categories - Update project category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const result = await db.collection('projectCategories').updateOne(
      { _id: new ObjectId(body._id) },
      { $set: body }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: body
    });
  } catch (error) {
    console.error('Error updating project category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/project-categories - Delete project category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project category ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('projectCategories').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project category' },
      { status: 500 }
    );
  }
}




