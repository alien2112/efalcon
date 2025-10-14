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
    const description = formData.get('description') as string;
    const order = parseInt(formData.get('order') as string);
    const isActive = formData.get('isActive') === 'true';

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 });
    }

    if (!title || !description || isNaN(order)) {
      return NextResponse.json({
        success: false,
        error: 'Title, description, and order are required'
      }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileId = await GridFSUtils.uploadFile(
      buffer,
      file.name,
      file.type,
      {
        title,
        description,
        order,
        isActive
      }
    );

    return NextResponse.json({
      success: true,
      data: {
        _id: fileId,
        filename: file.name,
        contentType: file.type,
        metadata: { title, description, order, isActive }
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
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const { _id, title, description, order, isActive } = await request.json();

    if (!_id) {
      return NextResponse.json({
        success: false,
        error: 'Image ID is required'
      }, { status: 400 });
    }

    // Note: GridFS doesn't support updating metadata directly
    // We would need to delete and re-upload the file
    // For now, we'll return an error suggesting to re-upload
    return NextResponse.json({
      success: false,
      error: 'GridFS metadata updates require file re-upload. Please delete and re-upload the file.'
    }, { status: 400 });

  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update image'
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
