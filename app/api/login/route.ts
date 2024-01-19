import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import bcrypt from 'bcrypt';
import { generateTokens, accessCookieOptions, refreshCookieOptions } from '@/lib/jwt';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await db.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json({ field: 'username', error: "User with such username doesn't exist" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return NextResponse.json({ field: 'password', error: 'Wrong password' }, { status: 401 });
  }

  const { accessToken, refreshToken } = await generateTokens({
    id: user.id,
    username: user.username,
  });

  const response = NextResponse.json({ message: 'Successful login' }, { status: 200 });

  response.cookies.set('auth', accessToken, accessCookieOptions);

  response.cookies.set('refresh', refreshToken, refreshCookieOptions);

  return response;
}
