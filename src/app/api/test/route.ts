import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple test without MongoDB
    return NextResponse.json({
      success: true,
      message: 'API is working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed'
    }, { status: 500 });
  }
}



