import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import z from 'zod';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.href;
  const postId = url.slice(url.lastIndexOf('/') + 1);
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const user = UserSchema.parse(userData);

    const post = await prisma.post.delete({ where: { id: +postId, authorId: user.id } });

    return NextResponse.json({ post }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: `Unable to delete post with id ${postId}` }, { status: 400 });
    }

    return NextResponse.json({ err }, { status: 500 });
  }
}
