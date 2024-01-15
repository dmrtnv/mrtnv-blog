import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import z from 'zod';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get('postid');

  try {
    const likes = await db.like.findMany({
      where: {
        ...(!!postId ? { postId: +postId } : {}),
      },
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const postId = await req.json();

  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const user = UserSchema.parse(userData);

    const post = await db.post.findFirst({ where: { id: +postId } });
    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    const existingLike = await db.like.findFirst({ where: { postId: post.id, userId: user.id } });

    if (existingLike) {
      const deletedLike = await db.like.delete({ where: { id: existingLike.id } });

      return NextResponse.json({ deletedLike }, { status: 200 });
    } else {
      const addedLike = await db.like.create({
        data: {
          postId: post.id,
          userId: user.id,
        },
      });

      return NextResponse.json({ addedLike }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
