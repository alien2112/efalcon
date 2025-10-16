import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
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

    // Stream file to response
    const stream = bucket.openDownloadStream(new ObjectId(id));
    const chunks: Uint8Array[] = [];

    await new Promise<void>((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', resolve);
    });

    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable'
      }
    });
  } catch (_e) {
    return new Response('Not found', { status: 404 });
  }
}


