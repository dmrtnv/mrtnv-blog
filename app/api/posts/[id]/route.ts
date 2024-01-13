import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import z from 'zod';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function GET(req: NextRequest) {
  const url = req.nextUrl.href;
  const postId = url.slice(url.lastIndexOf('/') + 1);

  try {
    const post = await db.post.findFirst({
      where: { id: +postId },
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
    });

    if (!post) return NextResponse.json({ message: 'No such post' }, { status: 404 });

    return NextResponse.json({ post }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.href;
  const postId = url.slice(url.lastIndexOf('/') + 1);
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const user = UserSchema.parse(userData);
    const post = await db.post.findFirst({ where: { id: +postId } });

    if (!post) return NextResponse.json({ message: 'Post does not exist' }, { status: 404 });
    if (post.authorId !== user.id) {
      return NextResponse.json({ message: 'User is allowed to delete own posts only' }, { status: 403 });
    }

    await db.like.deleteMany({ where: { postId: +postId } });
    await db.comment.deleteMany({ where: { postId: +postId } });
    await db.post.delete({ where: { id: +postId, authorId: user.id } });

    return NextResponse.json({ post }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: `Unable to delete post with id ${postId}` }, { status: 400 });
    }

    return NextResponse.json({ err }, { status: 500 });
  }
}
