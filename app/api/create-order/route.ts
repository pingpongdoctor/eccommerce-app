import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@prisma/client';

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
    purchasedProducts,
    subtotal,
    shipping,
    tax,
  }: {
    fullname: string;
    status: OrderStatus;
    address: Address;
    purchasedProducts: PurchasedProduct[];
    subtotal: string;
    shipping: string;
    tax: string;
  } = await req.json();

  if (
    !fullname ||
    !status ||
    !subtotal ||
    !shipping ||
    !tax ||
    !address?.city ||
    !address?.country ||
    !address?.line1 ||
    !address?.postal_code ||
    !address?.state
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

    const transactionNumber = 'TS' + uuidv4();
    const placedDate = new Date();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    //create new order
    const { city, country, line1, line2, postal_code, state } = address;
    const order: Order = await prisma.order.create({
      data: {
        transactionNumber,
        placedDate,
        expectedDeliveryDate,
        fullname,
        email: userData.email,
        city,
        country,
        state,
        line1,
        line2,
        postal_code,
        status,
        shipping,
        tax,
        subtotal,
        user: { connect: { id: userData.id } },
      },
    });

    //create purchasedProducts records and connect them to their order
    await Promise.all(
      purchasedProducts.map(async (product: PurchasedProduct) => {
        const {
          priceAtTheOrderTime,
          titleAtTheOrderTime,
          productQuantity,
          sanitySlug,
        } = product;
        await prisma.purchasedProduct.create({
          data: {
            sanitySlug,
            priceAtTheOrderTime,
            titleAtTheOrderTime,
            quantity: productQuantity,
            order: {
              connect: {
                id: order.id,
              },
            },
          },
        });
      })
    );

    return NextResponse.json(
      {
        message: 'new order is created',
        transactionNumber,
        expectedDeliveryDate,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
});
