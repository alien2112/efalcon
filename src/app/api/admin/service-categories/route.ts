import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ServiceCategory } from '@/types/services';
import { ObjectId } from 'mongodb';

// GET /api/admin/service-categories - Get all service categories
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('serviceCategories').find({}).sort({ order: 1 }).toArray();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching service categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/service-categories - Create new service category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const category: ServiceCategory = {
      name: body.name,
      description: body.description,
      isActive: body.isActive ?? true,
      order: body.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('serviceCategories').insertOne(category);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...category }
    });
  } catch (error) {
    console.error('Error creating service category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service category' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/service-categories - Update service category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    updateData.updatedAt = new Date();
    
    const result = await db.collection('serviceCategories').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Service category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating service category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service category' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/service-categories - Delete service category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service category ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('serviceCategories').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Service category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service category' },
      { status: 500 }
    );
  }
}



