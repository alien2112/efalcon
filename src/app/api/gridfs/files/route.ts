import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';

// POST - Upload a file (PDF) to GridFS (Admin only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = (formData.get('title') as string) || '';
    const page = (formData.get('page') as string) || '';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Only allow PDF for now
    const contentType = file.type || 'application/octet-stream';
    if (contentType !== 'application/pdf') {
      return NextResponse.json({ success: false, error: 'Only PDF files are allowed' }, { status: 400 });
    }

    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'files' });

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        title: title || file.name,
        page
      },
      contentType
    });

    await new Promise<void>((resolve, reject) => {
      uploadStream.on('error', reject);
      uploadStream.on('finish', () => resolve());
      uploadStream.end(buffer);
    });

    const id = uploadStream.id?.toString();

    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        filename: file.name,
        contentType,
        url: `/api/gridfs/files/${id}`
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
});


