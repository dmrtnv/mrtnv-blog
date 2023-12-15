import prisma from '../../../lib/prisma';
import { generateTokens } from '../../../lib/jwt';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

type RequestObj = {
  username: string;
  password: string;
};

const HASH_SALT = 10;

export async function POST(request: Request) {
  const { username, password }: RequestObj = await request.json();

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
        passwordHash,
      },
    });

    if (!user) throw new Error('DB failed to create user');

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
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
