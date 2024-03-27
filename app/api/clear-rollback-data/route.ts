import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

//clear rollback data after successful payment
export const POST = withApiAuthRequired(async (req: Request) => {
  const { rollbackDataKey }: { rollbackDataKey: string } = await req.json();

  if (!rollbackDataKey) {
    return NextResponse.json(
      { message: 'miss required data' },
      { status: 400 }
    );
  }

  try {
    //clear rollback data from Redis database
    await redis.hdel(`${rollbackDataKey}-rollback-data`, 'data');

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
