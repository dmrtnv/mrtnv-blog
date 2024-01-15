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
