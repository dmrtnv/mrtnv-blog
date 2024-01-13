import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  let url = req.nextUrl.href;
  url = url.slice(0, url.lastIndexOf('/'));
  const postId = url.slice(url.lastIndexOf('/') + 1);

  try {
    const comments = await db.comment.findMany({
      where: { postId: +postId },
      select: {
        id: true,
        text: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            fullName: true,
            username: true,
            bio: true,
            profilePictureUrl: true,
          },
        },
        postId: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(err, { status: 500 });
  }
}
