import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { AdminUser, ApiResponse } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();

    if (!username || !password || !email) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Username, password, and email are required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const adminCollection = db.collection<AdminUser>(COLLECTIONS.ADMIN_USERS);
    
    // Check if admin already exists
    const existingAdmin = await adminCollection.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Admin user already exists'
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const adminUser: Omit<AdminUser, '_id'> = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: null
    };

    const result = await adminCollection.insertOne(adminUser as AdminUser);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        adminId: result.insertedId,
        username: adminUser.username,
        email: adminUser.email
      },
      message: 'Admin user created successfully'
    });

  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}



