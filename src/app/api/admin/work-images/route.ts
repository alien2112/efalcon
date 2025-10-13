import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { withAuth } from '@/lib/auth';
import { WorkImage, ApiResponse } from '@/types/database';

// GET - Fetch all work images
export async function GET() {
  try {
    const db = await getDatabase();
    const workCollection = db.collection<WorkImage>(COLLECTIONS.WORK_IMAGES);
    
    const images = await workCollection
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json<ApiResponse<WorkImage[]>>({
      success: true,
      data: images
    });

  } catch (error) {
    console.error('Error fetching work images:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch work images'
    }, { status: 500 });
  }
}

// POST - Create new work image (Admin only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const { title, description, imageUrl, order } = await request.json();

    if (!title || !description || !imageUrl || order === undefined) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Title, description, imageUrl, and order are required'
      }, { status: 400 });
    }

    if (order < 1 || order > 4) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Order must be between 1 and 4'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const workCollection = db.collection<WorkImage>(COLLECTIONS.WORK_IMAGES);

    // Check if there's already an active image for this order
    const existingImage = await workCollection.findOne({ 
      order, 
      isActive: true 
    });

    if (existingImage) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `There is already an active image for order ${order}`
      }, { status: 400 });
    }

    const newImage: Omit<WorkImage, '_id'> = {
      title,
      description,
      imageUrl,
      order,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await workCollection.insertOne(newImage);

    return NextResponse.json<ApiResponse<WorkImage>>({
      success: true,
      data: { ...newImage, _id: result.insertedId.toString() },
      message: 'Work image created successfully'
    });

  } catch (error) {
    console.error('Error creating work image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create work image'
    }, { status: 500 });
  }
});

// PUT - Update work image (Admin only)
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const { _id, title, description, imageUrl, order, isActive } = await request.json();

    if (!_id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const workCollection = db.collection<WorkImage>(COLLECTIONS.WORK_IMAGES);

    const updateData: Partial<WorkImage> = {
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (order !== undefined) {
      if (order < 1 || order > 4) {
        return NextResponse.json<ApiResponse>({
          success: false,
          error: 'Order must be between 1 and 4'
        }, { status: 400 });
      }
      updateData.order = order;
    }
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await workCollection.updateOne(
      { _id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Work image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Work image updated successfully'
    });

  } catch (error) {
    console.error('Error updating work image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to update work image'
    }, { status: 500 });
  }
});

// DELETE - Delete work image (Admin only)
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const workCollection = db.collection<WorkImage>(COLLECTIONS.WORK_IMAGES);

    const result = await workCollection.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Work image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Work image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting work image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to delete work image'
    }, { status: 500 });
  }
});
