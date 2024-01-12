import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
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

    const post = await db.post.findFirst({ where: { id: +postId } });
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    const existingLike = await db.like.findFirst({ where: { postId: post.id, userId: user.id } });

    if (existingLike) {
      // unlike
      await db.like.delete({ where: { id: existingLike.id } });

      const likes = await db.like.findMany({
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
      await db.like.create({
        data: {
          postId: post.id,
          userId: user.id,
        },
      });

      const likes = await db.like.findMany({
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
    const post = await db.post.findFirst({ where: { id: +postId } });
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    const likes = await db.like.findMany({
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
