import prisma from '@/lib/prisma';
import { accessCookieOptions, generateTokens, refreshCookieOptions } from '@/lib/jwt';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

type RequestObj = {
  username: string;
  fullName: string;
  password: string;
};

const HASH_SALT = 10;

export async function POST(request: Request) {
  const { username, fullName, password }: RequestObj = await request.json();

  const usernameTaken = await prisma.user.count({
    where: {
      username,
    },
  });

  if (!!usernameTaken) {
    return NextResponse.json({ error: 'Username already taken' }, { status: 403 });
  }

  try {
    const passwordHash = await bcrypt.hash(password, HASH_SALT);
    if (!passwordHash) throw new Error('Failed password hashing');

    const user = await prisma.user.create({
      data: {
        username,
        fullName,
        passwordHash,
      },
    });

    if (!user) throw new Error('DB failed to create user');

    const { accessToken, refreshToken } = await generateTokens({
      id: user.id,
      username: user.username,
    });

    const response = NextResponse.json(
      { user: { id: user.id, username: user.username, fullName: user.fullName } },
      { status: 201 },
    );

    response.cookies.set('auth', accessToken, accessCookieOptions);

    response.cookies.set('refresh', refreshToken, refreshCookieOptions);

    return response;
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
