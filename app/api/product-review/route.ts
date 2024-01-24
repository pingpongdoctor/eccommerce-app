import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/app/_lib/getUserProfile';
import prisma from '@/lib/prisma';

export const POST = withApiAuthRequired(async (req: Request) => {
  const body = await req.json();

  if (!body?.content || !body?.hasOwnProperty('star')) {
    return NextResponse.json(
      {
        message: 'Miss required data',
      },
      { status: 400 }
    );
  }

  const user = await getUserProfile();
  if (!user) {
    return NextResponse.json(
      {
        message: 'Can not get user',
      },
      { status: 400 }
    );
  }

  try {
    await prisma.review.create({
      data: {
        content: body.content,
        star: body.star,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: 'review is created',
      },
      { status: 201 }
    );
  } catch (e) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      {
        message: 'Internal server error' + ' ' + (e as Error).message,
      },
      { status: 500 }
    );
  }
});
