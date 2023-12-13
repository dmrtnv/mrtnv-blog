import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { generateTokens } from '../../../lib/jwt';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json(
      { field: 'username', error: "User with such username doesn't exist" },
      { status: 401 },
    );
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return NextResponse.json(
      { field: 'password', error: 'Wrong password' },
      { status: 401 },
    );
  }

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    username: user.username,
  });

  const response = NextResponse.json({ user }, { status: 201 });

  response.cookies.set('auth', accessToken, {
    httpOnly: true,
    maxAge: 5 * 60,
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
