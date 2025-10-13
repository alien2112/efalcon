import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { withAuth } from '@/lib/auth';
import { VisionImage, ApiResponse } from '@/types/database';

// GET - Fetch all vision images
export async function GET() {
  try {
    const db = await getDatabase();
    const visionCollection = db.collection<VisionImage>(COLLECTIONS.VISION_IMAGES);
    
    const images = await visionCollection
      .find({ isActive: true })
      .sort({ position: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json<ApiResponse<VisionImage[]>>({
      success: true,
      data: images
    });

  } catch (error) {
    console.error('Error fetching vision images:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch vision images'
    }, { status: 500 });
  }
}

// POST - Create new vision image (Admin only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const { title, description, imageUrl, position } = await request.json();

    if (!title || !description || !imageUrl || !position) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Title, description, imageUrl, and position are required'
      }, { status: 400 });
    }

    if (!['left', 'right'].includes(position)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Position must be either "left" or "right"'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const visionCollection = db.collection<VisionImage>(COLLECTIONS.VISION_IMAGES);

    // Check if there's already an active image for this position
    const existingImage = await visionCollection.findOne({ 
      position, 
      isActive: true 
    });

    if (existingImage) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `There is already an active image for the ${position} position`
      }, { status: 400 });
    }

    const newImage: Omit<VisionImage, '_id'> = {
      title,
      description,
      imageUrl,
      position,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await visionCollection.insertOne(newImage);

    return NextResponse.json<ApiResponse<VisionImage>>({
      success: true,
      data: { ...newImage, _id: result.insertedId.toString() },
      message: 'Vision image created successfully'
    });

  } catch (error) {
    console.error('Error creating vision image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create vision image'
    }, { status: 500 });
  }
});

// PUT - Update vision image (Admin only)
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const { _id, title, description, imageUrl, position, isActive } = await request.json();

    if (!_id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const visionCollection = db.collection<VisionImage>(COLLECTIONS.VISION_IMAGES);

    const updateData: Partial<VisionImage> = {
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (position !== undefined) updateData.position = position;
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await visionCollection.updateOne(
      { _id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Vision image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Vision image updated successfully'
    });

  } catch (error) {
    console.error('Error updating vision image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to update vision image'
    }, { status: 500 });
  }
});

// DELETE - Delete vision image (Admin only)
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
    const visionCollection = db.collection<VisionImage>(COLLECTIONS.VISION_IMAGES);

    const result = await visionCollection.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Vision image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Vision image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting vision image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to delete vision image'
    }, { status: 500 });
  }
});
