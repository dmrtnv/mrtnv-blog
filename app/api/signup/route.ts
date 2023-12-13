import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
    return NextResponse.json(
      { error: 'Username already taken' },
      { status: 403 },
    );
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

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
