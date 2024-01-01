import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const PostSchema = z.object({
  text: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        text: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
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

  // TODO
  // Improve error handling!
  // It is unclear wheather it is client or server error
  try {
    const post = PostSchema.parse(postData);
    const user = UserSchema.parse(userData);

    const createdPost = await prisma.post.create({
      data: {
        text: post.text,
        author: {
          connect: { id: user.id },
        },
      },
    });

    const newPost = await prisma.post.findFirst({
      where: { id: createdPost.id },
      select: {
        id: true,
        text: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
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

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 406 });
  }
}
