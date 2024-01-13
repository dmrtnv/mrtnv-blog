import { NewCommentSchema } from '@/types/NewComment';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { UserCookieSchema } from '@/types/UserCookie';

export async function POST(req: NextRequest) {
  const commentData = await req.json();
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const comment = NewCommentSchema.parse(commentData);
    const user = UserCookieSchema.parse(userData);

    const newComment = await db.comment.create({ data: { ...comment, authorId: user.id } });

    return NextResponse.json({ newComment }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
