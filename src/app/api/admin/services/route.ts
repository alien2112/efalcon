import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Service, ServiceCategory } from '@/types/services';
import { ObjectId } from 'mongodb';

// GET /api/admin/services - Get all services
export async function GET(request: NextRequest) {
  try {
    console.log('[Services API] Starting to fetch services...');
    const { db } = await connectToDatabase();
    console.log('[Services API] Database connected successfully');

    const services = await db.collection('services').find({}).sort({ order: 1 }).toArray();
    console.log(`[Services API] Found ${services.length} services`);

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('[Services API] Error fetching services:', error);
    console.error('[Services API] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch services',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/services - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    // Generate slug from English title
    const slug = body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const service: Service = {
      slug,
      title: body.title,
      summary: body.summary,
      imageUrl: body.imageUrl,
      features: body.features,
      content: body.content,
      detailedContent: body.detailedContent,
      galleryImages: body.galleryImages || [],
      benefits: body.benefits,
      category: body.category,
      isActive: body.isActive ?? true,
      isFeatured: body.isFeatured ?? false,
      order: body.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('services').insertOne(service);
    
    // If imageUrl points to a GridFS image, tag it with page: 'services'
    try {
      if (service.imageUrl && typeof service.imageUrl === 'string') {
        const match = service.imageUrl.match(/\/api\/gridfs\/images\/(.+)$/);
        if (match && match[1]) {
          const imageId = match[1];
          await db.collection('images.files').updateOne(
            { _id: new ObjectId(imageId) },
            { $set: { 'metadata.page': 'services' } }
          );
        }
      }
    } catch (_) {}

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...service }
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/services - Update service
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    
    // Generate slug from English title if title is being updated
    if (updateData.title?.en) {
      updateData.slug = updateData.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    
    updateData.updatedAt = new Date();
    
    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/services - Delete service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
