import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';

//get users
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 400 }
    );
  }

  try {
    const auth0Id: string = session.user.sub;
    const userData: Omit<User, 'auth0Id'> | null = await prisma.user.findFirst({
      where: { auth0Id },
      select: {
        id: true,
        email: true,
        name: true,
        imgUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { message: 'user is not found in app database' },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
});

//post user
export const POST = withApiAuthRequired(async (req: Request) => {
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
});
