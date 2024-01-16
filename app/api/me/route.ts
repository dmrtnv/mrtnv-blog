import { UserCookieSchema } from '@/types/UserCookie';
import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

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
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ err }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const userData = JSON.parse((await req.headers.get('user-data')) as string);

  try {
    const userIdentifiers = UserCookieSchema.parse(userData);

    const profilePicture = await db.profilePicture.findFirst({ where: { userId: userIdentifiers.id } });

    if (profilePicture) {
      console.log({ profilePicture });
      await utapi.deleteFiles(profilePicture.fileKey);
    }

    const deletedUser = await db.user.delete({
      where: { id: userIdentifiers.id },
      select: {
        id: true,
        username: true,
      },
    });

    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
