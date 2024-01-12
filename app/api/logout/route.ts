import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const refreshCookie = await request.cookies.get('refresh');

  if (!refreshCookie) return NextResponse.json({ status: 401 });

  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  response.cookies.delete('refresh');
  response.cookies.delete('auth');

  return response;
}
