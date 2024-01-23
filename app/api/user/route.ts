import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, name, auth0Id, imgUrl }: { [x: string]: string } =
    await req.json();

  if (!email || !name || !auth0Id || !imgUrl) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  try {
    await prisma.user.upsert({
      where: { auth0Id },
      create: { email, name, auth0Id, imgUrl },
      update: { email, name, auth0Id, imgUrl, createdAt: new Date() },
    });

    return NextResponse.json(
      { message: 'successful user persisting' },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      {
        message:
          'Internal server error' + (e as Error).name + (e as Error).message,
      },
      { status: 500 }
    );
  }
}
