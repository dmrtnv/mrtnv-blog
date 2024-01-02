import { NextRequest, NextResponse } from 'next/server';
import { verifyAccess } from '@/lib/jwt';
import prisma from '@/lib/prisma';

type SessionData = {
  user: {
    id: string;
    username: string;
    fullName: string;
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

export async function GET(request: NextRequest) {
  const authCookie = await request.cookies.get('auth');

  if (!authCookie) return NextResponse.json({ session: { status: 'unauthenticated' } }, { status: 401 });

  try {
    const cookiePayload = (await verifyAccess(authCookie?.value)) as CookiePayload;

    const user = await prisma.user.findFirst({ where: { id: cookiePayload.id } });

    if (!user) return NextResponse.json({ message: `${cookiePayload.username} does not exist` }, { status: 404 });

    const sessionData: SessionData = {
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
      },
      expires: cookiePayload.exp + '',
    };

    return NextResponse.json({ session: { data: sessionData, status: 'authenticated' } }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
