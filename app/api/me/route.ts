import { UserCookieSchema } from '@/types/UserCookie';
import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const userIdentifiers = UserCookieSchema.parse(userData);

    const user = await db.user.findFirst({
      where: { id: userIdentifiers.id },
      select: {
        id: true,
        username: true,
        fullName: true,
        bio: true,
        profilePictureUrl: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
