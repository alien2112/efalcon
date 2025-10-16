import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/projects';

// GET /api/projects/[slug] - Get single project by slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase();
    const project = await db.collection('projects').findOne({ 
      slug: params.slug,
      isActive: true 
    });
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}




