import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

//create order
export const POST = withApiAuthRequired(async (req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 400 }
    );
  }

  const {
    fullname,
    address,
    status,
  }: {
    fullname: string;
    status: OrderStatus;
    address: Address;
  } = await req.json();

  if (
    !fullname ||
    !address?.city ||
    !address?.country ||
    !address?.line1 ||
    !address?.postal_code ||
    !status
  ) {
    return NextResponse.json(
      { message: 'miss required data' },
      { status: 400 }
    );
  }
  try {
    //get user
    const auth0Id: string = session.user.sub;
    const userData = await prisma.user.findUnique({ where: { auth0Id } });

    if (!userData) {
      return NextResponse.json(
        { message: 'user is not found in app database' },
        { status: 400 }
      );
    }

    //add order for the current user
    const { city, country, line1, line2, postal_code } = address;
    await prisma.order.create({
      data: {
        fullname,
        email: userData.email,
        city,
        country,
        line1,
        line2,
        postal_code,
        status,
        user: { connect: { id: userData.id } },
      },
    });

    return NextResponse.json(
      { message: 'new order is created' },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
});
