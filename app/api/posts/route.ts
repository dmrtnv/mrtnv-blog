import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';

const PostSchema = z.object({
  text: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const username = searchParams.get('username');

  try {
    const posts = await db.post.findMany({
      where: {
        author: {
          username: username ?? undefined,
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
            profilePicture: {
              select: {
                id: true,
                height: true,
                width: true,
                src: true,
                blurDataUrl: true,
              },
            },
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
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const postData = await req.json();
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const post = PostSchema.parse(postData);
    const user = UserSchema.parse(userData);

    const createdPost = await db.post.create({
      data: {
        text: post.text,
        author: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json({ createdPost }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 406 });
  }
}
