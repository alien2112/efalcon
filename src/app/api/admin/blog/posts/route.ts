import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost, BlogCategory } from '@/types/blog';
import { ObjectId } from 'mongodb';

// GET /api/admin/blog/posts - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter: any = {};
    if (category) filter.category = category;
    if (published !== null) filter.isPublished = published === 'true';
    if (featured !== null) filter.isFeatured = featured === 'true';
    
    const posts = await db.collection('blog_posts')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const total = await db.collection('blog_posts').countDocuments(filter);
    
    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog/posts - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    // Generate slug from English title
    const slug = body.title.en.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const blogPost: BlogPost = {
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      imageUrl: body.imageUrl,
      featuredImage: body.featuredImage,
      readTime: body.readTime || 5,
      isPublished: body.isPublished ?? false,
      isFeatured: body.isFeatured ?? false,
      publishedAt: body.isPublished ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      seo: body.seo || {},
      internalLinks: body.internalLinks || [],
      viewCount: 0,
      likeCount: 0,
      shareCount: 0
    };
    
    const result = await db.collection('blog_posts').insertOne(blogPost);
    
    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...blogPost }
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/posts - Update blog post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { _id, ...updateData } = body;
    
    // Generate slug from English title if title is being updated
    if (updateData.title?.en) {
      updateData.slug = updateData.title.en.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    // Update publishedAt if publishing for the first time
    if (updateData.isPublished && !body.wasPublished) {
      updateData.publishedAt = new Date();
    }
    
    updateData.updatedAt = new Date();
    
    const result = await db.collection('blog_posts').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { _id, ...updateData }
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/posts - Delete blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blog post ID is required' },
        { status: 400 }
      );
    }
    
    const { db } = await connectToDatabase();
    const result = await db.collection('blog_posts').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}




