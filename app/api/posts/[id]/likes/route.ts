import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import z from 'zod';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function POST(req: NextRequest) {
  let url = req.nextUrl.href;
  url = url.slice(0, url.lastIndexOf('/'));
  const postId = url.slice(url.lastIndexOf('/') + 1);
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const user = UserSchema.parse(userData);

    const post = await prisma.post.findFirst({ where: { id: +postId } });
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    const existingLike = await prisma.like.findFirst({ where: { postId: post.id, userId: user.id } });

    if (existingLike) {
      // unlike
      await prisma.like.delete({ where: { id: existingLike.id } });

      const likes = await prisma.like.findMany({
        where: { postId: post.id },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return NextResponse.json({ likes }, { status: 200 });
    } else {
      // like
      await prisma.like.create({
        data: {
          postId: post.id,
          userId: user.id,
        },
      });

      const likes = await prisma.like.findMany({
        where: { postId: post.id },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return NextResponse.json({ likes }, { status: 200 });
    }
  } catch (err: unknown) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  let url = req.nextUrl.href;
  url = url.slice(0, url.lastIndexOf('/'));
  const postId = url.slice(url.lastIndexOf('/') + 1);

  try {
    const post = await prisma.post.findFirst({ where: { id: +postId } });
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    const likes = await prisma.like.findMany({
      where: { postId: +postId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ likes }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
