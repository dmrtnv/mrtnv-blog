import { NextRequest, NextResponse } from 'next/server';
import { verifyRefresh, generateAccess, accessCookieOptions } from '@/lib/jwt';
import prisma from '@/lib/prisma';

type CookiePayload = {
  id: string;
  username: string;
  fullName: string;
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

  if (!user) return NextResponse.json({ status: 401 });

  const response = NextResponse.json({ status: 200 });

  const accessToken = await generateAccess({ id: user.id, username: user.username, fullName: user.fullName });

  response.cookies.set('auth', accessToken, accessCookieOptions);

  return response;
}
