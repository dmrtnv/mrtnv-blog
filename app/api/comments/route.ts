import { NewCommentSchema } from '@/types/NewComment';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { UserCookieSchema } from '@/types/UserCookie';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get('postid');

  try {
    const comments = await db.comment.findMany({
      where: {
        ...(!!postId ? { postId: +postId } : {}),
      },
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
        postId: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const commentData = await req.json();
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const comment = NewCommentSchema.parse(commentData);
    const user = UserCookieSchema.parse(userData);

    const createdComment = await db.comment.create({ data: { ...comment, authorId: user.id } });

    return NextResponse.json({ createdComment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
