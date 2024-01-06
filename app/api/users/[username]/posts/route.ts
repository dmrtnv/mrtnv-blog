import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  let url = req.nextUrl.href;
  url = url.slice(0, url.lastIndexOf('/'));
  const username = url.slice(url.lastIndexOf('/') + 1);

  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          username,
        },
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            bio: true,
            profilePictureUrl: true,
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
