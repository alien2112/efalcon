import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/projects';
import { ObjectId } from 'mongodb';

// GET /api/admin/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection('projects')
      .find({})
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

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const project: Project = {
      slug: body.slug,
      title: body.title,
      summary: body.summary,
      description: body.description,
      imageUrl: body.imageUrl,
      galleryImages: body.galleryImages || [],
      technologies: body.technologies,
      features: body.features,
      challenges: body.challenges,
      solutions: body.solutions,
      results: body.results,
      client: body.client,
      location: body.location,
      duration: body.duration,
      budget: body.budget,
      category: body.category,
      isActive: body.isActive ?? true,
      isFeatured: body.isFeatured ?? false,
      order: body.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('projects').insertOne(project);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...project }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/projects - Update project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(body._id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id: body._id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}



