import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

//clear products in shopping cart
export const PUT = withApiAuthRequired(async (req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
      { status: 500 }
    );
  }

  const { productIds }: { productIds: number[] } = await req.json();

  if (!productIds) {
    return NextResponse.json(
      { message: 'Miss required data' },
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
        { status: 500 }
      );
    }

    await prisma.usersProducts.deleteMany({
      where: {
        userId: user.id,
        productId: { in: productIds },
      },
    });

    return NextResponse.json(
      { message: 'products in cart are cleared' },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});
