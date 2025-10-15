import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/projects';

// GET /api/projects/featured - Get featured projects (max 6)
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection('projects')
      .find({ 
        isActive: true,
        isFeatured: true 
      })
      .sort({ order: 1 })
      .limit(6)
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured projects' },
      { status: 500 }
    );
  }
}



