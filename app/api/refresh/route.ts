import { NextRequest, NextResponse } from 'next/server';
import { verifyRefresh, generateAccess, accessCookieOptions } from '@/lib/jwt';
import prisma from '@/lib/prisma';

type CookiePayload = {
  id: string;
  username: string;
  exp: number;
  iat: number;
};

export async function GET(request: NextRequest) {
  const refreshCookie = await request.cookies.get('refresh');

  if (!refreshCookie) return NextResponse.json({ status: 401 });

  const cookiePayload = (await verifyRefresh(refreshCookie?.value)) as CookiePayload;

  const user = await prisma.user.findUnique({
    where: {
      id: cookiePayload.id,
    },
  });

  if (!user) return NextResponse.json({ status: 403 });

  const response = NextResponse.json({ message: 'updated access token' }, { status: 200 });

  const accessToken = generateAccess({ id: user.id, username: user.username });

  response.cookies.set('auth', accessToken, accessCookieOptions);

  return response;
}
