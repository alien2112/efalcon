import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Service, ServiceCategory } from '@/types/services';
import { ObjectId } from 'mongodb';

// GET /api/admin/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    let services = await db.collection('services').find({}).sort({ order: 1 }).toArray();
    
    // Fallback: if no services collection data, derive from GridFS images.files
    if (!services || services.length === 0) {
      const files = await db.collection('images.files')
        .find({ 'metadata.page': 'services', 'metadata.isActive': { $ne: false } })
        .sort({ 'metadata.order': 1 })
        .toArray();
      services = files.map((f: any) => ({
        _id: f._id,
        slug: (f.metadata?.title || f.filename || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        title: { en: f.metadata?.title || '', ar: f.metadata?.titleAr || '' },
        summary: { en: f.metadata?.description || '', ar: f.metadata?.descriptionAr || '' },
        imageUrl: `/api/gridfs/images/${f._id}`,
        features: { en: [], ar: [] },
        content: { en: '', ar: '' },
        detailedContent: { en: '', ar: '' },
        galleryImages: [],
        benefits: { en: [], ar: [] },
        category: 'uncategorized',
        isActive: f.metadata?.isActive !== false,
        isFeatured: false,
        order: f.metadata?.order || 0,
        createdAt: f.uploadDate || new Date(),
        updatedAt: f.uploadDate || new Date(),
      }));
    }
    
    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
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
