import { NextRequest, NextResponse } from 'next/server';
import { GridFSUtils } from '@/lib/gridfs';
import { withAuth } from '@/lib/auth';

// GET - List all images with metadata
export async function GET() {
  try {
    const images = await GridFSUtils.listFiles();
    
    // Filter active images and sort by order
    const activeImages = images
      .filter(img => img.metadata?.isActive !== false)
      .sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));

    return NextResponse.json({
      success: true,
      data: activeImages.map(img => ({
        _id: img._id.toString(),
        filename: img.filename,
        contentType: img.contentType,
        length: img.length,
        uploadDate: img.uploadDate,
        metadata: img.metadata
      }))
    });

  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to list images'
    }, { status: 500 });
  }
}

// POST - Upload new image (Admin only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const titleAr = formData.get('titleAr') as string;
    const description = formData.get('description') as string;
    const descriptionAr = formData.get('descriptionAr') as string;
    const order = parseInt(formData.get('order') as string);
    const isActive = formData.get('isActive') === 'true';
    const showTitle = formData.get('showTitle') === 'true';
    const showDescription = formData.get('showDescription') === 'true';
    const page = formData.get('page') as string;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 });
    }

    if (isNaN(order)) {
      return NextResponse.json({
        success: false,
        error: 'Order is required'
      }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileId = await GridFSUtils.uploadFile(
      buffer,
      file.name,
      file.type,
      {
        title: title || file.name,
        titleAr: titleAr || '',
        description: description || '',
        descriptionAr: descriptionAr || '',
        order,
        isActive,
        showTitle,
        showDescription,
        page: page || 'home'
      }
    );

    return NextResponse.json({
      success: true,
      data: {
        _id: fileId,
        filename: file.name,
        contentType: file.type,
        metadata: { 
          title: title || file.name, 
          titleAr: titleAr || '', 
          description: description || '', 
          descriptionAr: descriptionAr || '', 
          order, 
          isActive, 
          showTitle, 
          showDescription, 
          page: page || 'home' 
        }
      },
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to upload image'
    }, { status: 500 });
  }
});

// PUT - Update image metadata (Admin only)
// Note: GridFS doesn't support direct metadata updates,
// so we need to use a workaround with the files collection
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const { 
      _id, 
      title, 
      titleAr, 
      description, 
      descriptionAr, 
      order, 
      isActive, 
      showTitle, 
      showDescription, 
      page 
    } = await request.json();

    if (!_id) {
      return NextResponse.json({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    // Get the database connection
    const clientPromise = (await import('@/lib/mongodb')).default;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'petrowebsite');
    const filesCollection = db.collection('images.files');

    // Update the metadata in the files collection
    const updateFields: any = {};
    if (title !== undefined) updateFields['metadata.title'] = title;
    if (titleAr !== undefined) updateFields['metadata.titleAr'] = titleAr;
    if (description !== undefined) updateFields['metadata.description'] = description;
    if (descriptionAr !== undefined) updateFields['metadata.descriptionAr'] = descriptionAr;
    if (order !== undefined) updateFields['metadata.order'] = order;
    if (isActive !== undefined) updateFields['metadata.isActive'] = isActive;
    if (showTitle !== undefined) updateFields['metadata.showTitle'] = showTitle;
    if (showDescription !== undefined) updateFields['metadata.showDescription'] = showDescription;
    if (page !== undefined) updateFields['metadata.page'] = page;

    const { ObjectId } = await import('mongodb');
    const result = await filesCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Image not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image metadata updated successfully',
      data: { _id, ...updateFields }
    });

  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update image: ' + (error as Error).message
    }, { status: 500 });
  }
});

// DELETE - Delete image (Admin only)
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return NextResponse.json({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    const deleted = await GridFSUtils.deleteFile(_id);

    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'Image not found or could not be deleted'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete image'
    }, { status: 500 });
  }
});
