import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types/blog';
import { ObjectId } from 'mongodb';

// GET /api/blog/posts - Get published blog posts for public consumption
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const slug = searchParams.get('slug');
    
    const skip = (page - 1) * limit;
    
    // Build filter for published posts only
    const filter: any = { isPublished: true };
    
    if (slug) {
      // Get specific post by slug
      const post = await db.collection('blog_posts').findOne({ 
        slug, 
        isPublished: true 
      });
      
      if (!post) {
        return NextResponse.json(
          { success: false, error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      // Increment view count
      await db.collection('blog_posts').updateOne(
        { _id: post._id },
        { $inc: { viewCount: 1 } }
      );
      
      return NextResponse.json({
        success: true,
        data: post
      });
    }
    
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    
    const posts = await db.collection('blog_posts')
      .find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
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

// POST /api/blog/posts - Like or share a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const { postId, action } = body; // action: 'like' | 'share'
    
    if (!postId || !action) {
      return NextResponse.json(
        { success: false, error: 'Post ID and action are required' },
        { status: 400 }
      );
    }
    
    const updateField = action === 'like' ? 'likeCount' : 'shareCount';
    
    const result = await db.collection('blog_posts').updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { [updateField]: 1 } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Post ${action}d successfully`
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}




