import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/services/featured - Get featured services (max 12)
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const services = await db.collection('services')
      .find({ 
        isActive: true,
        isFeatured: true 
      })
      .sort({ order: 1 })
      .limit(12)
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching featured services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured services' },
      { status: 500 }
    );
  }
}



