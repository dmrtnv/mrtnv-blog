import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = request.url;
  const username = url.slice(url.lastIndexOf('/') + 1);

  try {
    const userExists = !!(await prisma.user.count({
      where: {
        username,
      },
    }));

    return NextResponse.json({ userExists });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ username });
}
