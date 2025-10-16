import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { ApiResponse } from '@/types/database';

// Mock admin user for testing
const MOCK_ADMIN = {
  username: 'admin',
  email: 'admin@ebdaafalcon.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J8K8K8K8K', // admin123
  createdAt: new Date(),
  lastLogin: null
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Username and password are required'
      }, { status: 400 });
    }

    // Simple password check for demo purposes
    if (username === 'admin' && password === 'admin123') {
      const token = createToken(MOCK_ADMIN);

      return NextResponse.json<ApiResponse>({
        success: true,
        data: {
          token,
          admin: {
            username: MOCK_ADMIN.username,
            email: MOCK_ADMIN.email,
            lastLogin: MOCK_ADMIN.lastLogin
          }
        },
        message: 'Login successful'
      });
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Invalid credentials'
    }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}




