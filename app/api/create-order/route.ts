import { NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '@prisma/client';
import product from '@/sanity/schemas/product';

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
  }: {
    fullname: string;
    status: OrderStatus;
    address: Address;
    purchasedProducts: PurchasedProduct[];
  } = await req.json();

  if (
    !fullname ||
    !address?.city ||
    !address?.country ||
    !address?.line1 ||
    !address?.postal_code ||
    !address?.state ||
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

    const transactionNumber = 'TS' + uuidv4();
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    //create new order
    const { city, country, line1, line2, postal_code, state } = address;
    const order: Order = await prisma.order.create({
      data: {
        transactionNumber,
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
        user: { connect: { id: userData.id } },
      },
    });

    //create a record for the OrdersProducts table for each product
    await Promise.all(
      purchasedProducts.map(async (product: PurchasedProduct) => {
        await prisma.ordersProducts.create({
          data: {
            priceAtTheOrderTime: product.priceAtTheOrderTime,
            quantity: product.productQuantity,
            order: {
              connect: {
                id: userData.id,
              },
            },
            product: {
              connect: {
                id: product.productId,
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
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
});
