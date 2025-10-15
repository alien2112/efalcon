import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase, COLLECTIONS } from '@/lib/mongodb';
import { createToken } from '@/lib/auth';
import { AdminUser, ApiResponse } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Username and password are required'
      }, { status: 400 });
    }

    const db = await getDatabase();
    const adminCollection = db.collection<AdminUser>(COLLECTIONS.ADMIN_USERS);
    
    const admin = await adminCollection.findOne({ username });
    
    if (!admin) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid credentials'
      }, { status: 401 });
    }

    // Update last login
    await adminCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date() } }
    );

    const token = createToken(admin);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        token,
        admin: {
          username: admin.username,
          email: admin.email,
          lastLogin: admin.lastLogin
        }
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}