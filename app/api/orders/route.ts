import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//get all orders
export const GET = withApiAuthRequired(async (req: Request) => {
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
    //check if user is available on app database
    const auth0Id: string = session.user.sub;
    const userData = await prisma.user.findUnique({ where: { auth0Id } });

    if (!userData) {
      return NextResponse.json(
        { message: 'user is not found in app database' },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: userData.id },
      include: {
        products: {
          select: {
            priceAtTheOrderTime: true,
            quantity: true,
          },
        },
      },
    });

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (e: any) {
    console.log('Internal server error' + e);
    return NextResponse.json({ message: '' }, { status: e.statusCode || 500 });
  }
});
