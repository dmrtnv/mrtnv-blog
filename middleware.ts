import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('auth')?.value;

  if (!authToken) return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });

  const data = await verifyAccess(authToken);

  try {
    if (!data) throw new Error('Token has no data');

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('user-data', JSON.stringify({ id: data.id, username: data.username }));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/logout', '/api/posts', '/api/posts/:id+'],
};
