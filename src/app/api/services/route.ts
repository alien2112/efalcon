import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// GET /api/services - Get all active services for frontend
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const services = await db.collection('services')
      .find({ isActive: true })
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}




