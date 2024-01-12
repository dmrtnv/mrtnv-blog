import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request.cookies.get('auth'));

  try {
    const users = await db.user.findMany();

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ deletedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message });
  }
}
