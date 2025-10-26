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
    
    // Fetch categories and create a map
    const categories = await db.collection('projectCategories').find({}).toArray();
    const categoryMap = new Map();
    categories.forEach((cat: any) => {
      categoryMap.set(cat._id?.toString(), {
        name: cat.name,
        description: cat.description
      });
    });
    
    // Enrich projects with category names
    const enrichedProjects = projects.map((project: any) => {
      const categoryId = project.category?.toString();
      const categoryInfo = categoryMap.get(categoryId);
      
      return {
        ...project,
        categoryName: categoryInfo?.name || { en: 'Projects', ar: 'مشاريع' }
      };
    });
    
    return NextResponse.json({
      success: true,
      data: enrichedProjects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}




