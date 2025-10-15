import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { AdminUser, ApiResponse } from '@/types/database';

/**
 * Setup endpoint to create initial admin user
 * This endpoint should be disabled in production
 * Call this endpoint once to create the admin user
 */
export async function POST(request: NextRequest) {
  try {
    // In production, you might want to check for a setup key or disable this endpoint
    const { username, password, email, setupKey } = await request.json();

    // Simple security: require a setup key (you can change this)
    const SETUP_KEY = process.env.ADMIN_SETUP_KEY || 'setup-admin-2025';
    if (setupKey !== SETUP_KEY) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid setup key'
      }, { status: 403 });
    }

    const db = await getDatabase();
    const adminCollection = db.collection<AdminUser>(COLLECTIONS.ADMIN_USERS);

    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username: username || 'admin' });

    if (existingAdmin) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Admin user already exists'
      }, { status: 400 });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password || 'admin123', 10);

    const adminUser = {
      username: username || 'admin',
      password: hashedPassword,
      email: email || 'admin@petrowebsite.com',
      createdAt: new Date(),
      lastLogin: null
    };

    const result = await adminCollection.insertOne(adminUser as any);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        username: adminUser.username,
        email: adminUser.email
      },
      message: 'Admin user created successfully'
    });

  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error: ' + (error as Error).message
    }, { status: 500 });
  }
}

// GET endpoint to check if setup is needed
export async function GET() {
  try {
    const db = await getDatabase();
    const adminCollection = db.collection<AdminUser>(COLLECTIONS.ADMIN_USERS);

    const adminCount = await adminCollection.countDocuments();

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        setupNeeded: adminCount === 0,
        adminCount
      }
    });

  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error: ' + (error as Error).message
    }, { status: 500 });
  }
}