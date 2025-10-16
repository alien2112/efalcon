import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { GridFSBucket } from 'mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Create GridFS bucket
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    
    // Test bucket creation by listing files (this will create the collections if they don't exist)
    const files = await bucket.find({}).limit(1).toArray();
    
    return NextResponse.json({
      success: true,
      message: 'GridFS bucket initialized successfully',
      filesCount: files.length
    });
  } catch (error) {
    console.error('GridFS initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}




