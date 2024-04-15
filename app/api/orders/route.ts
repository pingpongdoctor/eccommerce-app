import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

//get all orders
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 500 }
    );
  }

  try {
    //check if user is available on app database
    const auth0Id: string = session.user.sub;
    const userData = await prisma.user.findUnique({ where: { auth0Id } });

    if (!userData) {
      return NextResponse.json(
        { message: 'user is not found in app database' },
        { status: 500 }
      );
    }

    const orders = (await prisma.order.findMany({
      where: { userId: userData.id },
      select: {
        purchasedProducts: {
          select: {
            sanitySlug: true,
            priceAtTheOrderTime: true,
            titleAtTheOrderTime: true,
            quantity: true,
          },
        },
        transactionNumber: true,
        expectedDeliveryDate: true,
        placedDate: true,
        status: true,
        updatedAt: true,
        shipping: true,
        subtotal: true,
        tax: true,
      },
    })) as {
      transactionNumber: string;
      expectedDeliveryDate: Date;
      placedDate: Date;
      tax: Decimal | string;
      shipping: Decimal | string;
      subtotal: Decimal | string;
      updatedAt: Date;
      status: OrderStatus;
      purchasedProducts: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        sanitySlug: string;
        titleAtTheOrderTime: string;
      }[];
    }[];

    //convert decimal to string
    const returnedOrders: {
      transactionNumber: string;
      expectedDeliveryDate: Date;
      placedDate: Date;
      tax: Decimal | string;
      shipping: Decimal | string;
      subtotal: Decimal | string;
      updatedAt: Date;
      status: OrderStatus;
      purchasedProducts: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        sanitySlug: string;
        titleAtTheOrderTime: string;
      }[];
    }[] = [...orders].map((order) => {
      order.tax = order.tax;
      order.shipping = order.shipping.toString();
      order.subtotal = order.subtotal.toString();
      const products = order.purchasedProducts;
      for (let i = 0; i < products.length; i++) {
        products[i].priceAtTheOrderTime =
          products[i].priceAtTheOrderTime.toString();
      }
      return order;
    });

    return NextResponse.json({ data: returnedOrders }, { status: 200 });
  } catch (e: any) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});
