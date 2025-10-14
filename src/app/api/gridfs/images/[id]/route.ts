import { NextRequest, NextResponse } from 'next/server';
import { GridFSUtils } from '@/lib/gridfs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse('Image ID required', { status: 400 });
    }

    // Check if file exists
    const fileExists = await GridFSUtils.fileExists(id);
    if (!fileExists) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get file info
    const fileInfo = await GridFSUtils.getFileInfo(id);
    if (!fileInfo) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get file stream
    const stream = await GridFSUtils.getFileStream(id);

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', fileInfo.contentType);
    headers.set('Content-Length', fileInfo.length.toString());
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    // Return the file stream
    return new NextResponse(stream as any, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
