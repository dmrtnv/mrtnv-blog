import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ deletedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message });
  }
}
