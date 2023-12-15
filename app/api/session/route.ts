import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from '@/lib/jwt';

type SessionData = {
  user: {
    id: string;
    username: string;
  };
  expires: string;
};

type CookiePayload = {
  id: string;
  username: string;
  exp: number;
  iat: number;
};

type Session = {
  data?: SessionData | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

export async function GET(request: NextRequest): Promise<NextResponse<{ session: Session }>> {
  const authCookie = await request.cookies.get('auth');

  if (!authCookie) return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });

  const cookiePayload = (await verifyAccess(authCookie?.value)) as CookiePayload;

  const sessionData: SessionData = {
    user: {
      id: cookiePayload.id,
      username: cookiePayload.username,
    },
    expires: cookiePayload.exp + '',
  };

  return NextResponse.json({ session: { data: sessionData, status: 'authenticated' } }, { status: 200 });
}
