import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        bio: true,
        fullName: true,
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

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message });
  }
}
