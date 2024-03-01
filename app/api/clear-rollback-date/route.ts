import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

//clear rollback data after successful payment
export const GET = withApiAuthRequired(async (_req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'user not found in auth0 database' },
      { status: 400 }
    );
  }

  try {
    //get user
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: session.user.sub,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'user not found in database' },
        { status: 400 }
      );
    }

    //clear rollback data from Redis database
    await redis.hdel(`${user.id}-rollback-data`, 'data');

    return NextResponse.json(
      {
        message: 'rollback data is cleared',
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});
