import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { AdminUser } from '@/types/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthenticatedRequest extends NextRequest {
  admin?: AdminUser;
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { admin?: AdminUser };
    return decoded.admin ?? null;
  } catch (error) {
    return null;
  }
}

export function createToken(admin: AdminUser): string {
  return jwt.sign({ admin }, JWT_SECRET, { expiresIn: '24h' });
}

export function authenticateAdmin(request: NextRequest): AdminUser | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const admin = authenticateAdmin(req);
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    (req as AuthenticatedRequest).admin = admin;
    return handler(req as AuthenticatedRequest);
  };
}
