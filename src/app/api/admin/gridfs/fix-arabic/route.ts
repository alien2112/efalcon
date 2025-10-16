import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

// POST /api/admin/gridfs/fix-arabic
// Backfill missing Arabic metadata (titleAr/descriptionAr) for banner images in GridFS
export const POST = withAuth(async (_request: NextRequest) => {
  try {
    const clientPromise = (await import('@/lib/mongodb')).default;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'petrowebsite');
    const filesCollection = db.collection('images.files');

    // Find files where Arabic fields are missing/empty
    const cursor = filesCollection.find({
      $or: [
        { 'metadata.titleAr': { $exists: false } },
        { 'metadata.titleAr': '' },
        { 'metadata.descriptionAr': { $exists: false } },
        { 'metadata.descriptionAr': '' },
      ],
    });

    let updatedCount = 0;
    const toUpdate: Array<{ _id: any; title?: string; description?: string }> = [];
    await cursor.forEach((doc: any) => {
      const title = doc?.metadata?.title || '';
      const description = doc?.metadata?.description || '';
      toUpdate.push({ _id: doc._id, title, description });
    });

    for (const doc of toUpdate) {
      const setFields: Record<string, any> = {};
      if (doc.title) setFields['metadata.titleAr'] = doc.title;
      if (doc.description) setFields['metadata.descriptionAr'] = doc.description;
      if (Object.keys(setFields).length === 0) continue;

      const res = await filesCollection.updateOne(
        { _id: doc._id },
        { $set: setFields }
      );
      if (res.modifiedCount > 0) updatedCount += 1;
    }

    return NextResponse.json({
      success: true,
      message: `Arabic banner metadata backfilled successfully`,
      data: { updatedCount },
    });
  } catch (error) {
    console.error('Error backfilling Arabic banner metadata:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to backfill Arabic banner metadata',
    }, { status: 500 });
  }
});


