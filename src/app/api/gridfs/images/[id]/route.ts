import { NextRequest } from 'next/server';
import { GridFSUtils } from '@/lib/gridfs';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const fileId = params.id;
    if (!fileId) {
      return new Response('Missing id', { status: 400 });
    }

    // Fetch file buffer and basic metadata
    const buffer = await GridFSUtils.downloadFile(fileId);
    // We don't have contentType from download, list metadata instead
    const files = await GridFSUtils.listFiles();
    const meta = files.find((f) => f._id.toString() === fileId);
    const contentType = meta?.contentType || 'application/octet-stream';

    // Generate ETag for caching
    const crypto = require('crypto');
    const etag = crypto.createHash('md5').update(buffer).digest('hex');

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
        'ETag': etag,
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}

 
