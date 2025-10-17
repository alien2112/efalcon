import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';
import crypto from 'crypto';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return new Response('Missing id', { status: 400 });
    }

    const db = await getDatabase();
    const bucket = new GridFSBucket(db, { bucketName: 'files' });

    // Try to fetch file metadata to get contentType and filename
    const files = await bucket.find({ _id: new ObjectId(id) }).toArray();
    if (!files || files.length === 0) {
      return new Response('Not found', { status: 404 });
    }
    const fileDoc = files[0] as any;
    const contentType = fileDoc.contentType || 'application/pdf';
    const filename = fileDoc.filename || 'file.pdf';
    const uploadDate = fileDoc.uploadDate || new Date();

    // Generate ETag from file id and upload date
    const etag = crypto
      .createHash('md5')
      .update(`${id}-${uploadDate.getTime()}`)
      .digest('hex');

    // Check If-None-Match header for 304 response
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=86400, must-revalidate',
        },
      });
    }

    // Stream file to response
    const stream = bucket.openDownloadStream(new ObjectId(id));
    const chunks: Uint8Array[] = [];

    await new Promise<void>((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', resolve);
    });

    const buffer = Buffer.concat(chunks);

    // Set appropriate cache headers based on content type
    const isImage = contentType.startsWith('image/');
    const cacheControl = isImage
      ? 'public, max-age=86400, must-revalidate, stale-while-revalidate=3600'
      : 'public, max-age=31536000, immutable';

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': cacheControl,
        'ETag': etag,
        'Last-Modified': uploadDate.toUTCString(),
        'CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      }
    });
  } catch (_e) {
    return new Response('Not found', { status: 404 });
  }
}


