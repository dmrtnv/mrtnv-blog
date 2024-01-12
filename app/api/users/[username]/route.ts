import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import z from 'zod';

const UpdateFieldSchema = z.object({
  bio: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
});

export async function GET(request: Request) {
  const url = request.url;
  const username = url.slice(url.lastIndexOf('/') + 1);

  try {
    const user = await db.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        bio: true,
        profilePictureUrl: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const url = req.url;
  const username = url.slice(url.lastIndexOf('/') + 1);

  const data = await req.json();

  try {
    const newFields = UpdateFieldSchema.parse(data);

    const user = await db.user.update({
      where: { username },
      data: {
        ...newFields,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        bio: true,
        profilePictureUrl: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
