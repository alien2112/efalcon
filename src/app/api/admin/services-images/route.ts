import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { withAuth } from '@/lib/auth';
import { ServiceImage, ApiResponse } from '@/types/database';

// GET - Fetch all services images
export async function GET() {
  try {
    const db = await getDatabase();
    const servicesCollection = db.collection<ServiceImage>(COLLECTIONS.SERVICES_IMAGES);
    
    const images = await servicesCollection
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json<ApiResponse<ServiceImage[]>>({
      success: true,
      data: images
    });

  } catch (error) {
    console.error('Error fetching services images:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to fetch services images'
    }, { status: 500 });
  }
}

// POST - Create new service image (Admin only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const { title, description, imageUrl, order } = await request.json();

    if (!title || !description || !imageUrl || order === undefined) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Title, description, imageUrl, and order are required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const servicesCollection = db.collection<ServiceImage>(COLLECTIONS.SERVICES_IMAGES);

    // Check if there's already an active image for this order
    const existingImage = await servicesCollection.findOne({ 
      order, 
      isActive: true 
    });

    if (existingImage) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `There is already an active image for order ${order}`
      }, { status: 400 });
    }

    const newImage: Omit<ServiceImage, '_id'> = {
      title,
      description,
      imageUrl,
      order,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await servicesCollection.insertOne(newImage);

    return NextResponse.json<ApiResponse<ServiceImage>>({
      success: true,
      data: { ...newImage, _id: result.insertedId.toString() },
      message: 'Service image created successfully'
    });

  } catch (error) {
    console.error('Error creating service image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to create service image'
    }, { status: 500 });
  }
});

// PUT - Update service image (Admin only)
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
    const servicesCollection = db.collection<ServiceImage>(COLLECTIONS.SERVICES_IMAGES);

    const updateData: Partial<ServiceImage> = {
      updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await servicesCollection.updateOne(
      { _id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Service image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Service image updated successfully'
    });

  } catch (error) {
    console.error('Error updating service image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to update service image'
    }, { status: 500 });
  }
});

// DELETE - Delete service image (Admin only)
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
    const servicesCollection = db.collection<ServiceImage>(COLLECTIONS.SERVICES_IMAGES);

    const result = await servicesCollection.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Service image not found'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Service image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting service image:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Failed to delete service image'
    }, { status: 500 });
  }
});
