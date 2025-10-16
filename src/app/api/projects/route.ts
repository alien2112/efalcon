import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/projects';

// GET /api/projects - Get all active projects
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection('projects')
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}




