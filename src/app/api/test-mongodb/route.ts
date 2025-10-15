import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}



