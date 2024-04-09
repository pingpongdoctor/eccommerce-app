import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Order } from '@prisma/client';
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
        products: {
          select: {
            priceAtTheOrderTime: true,
            quantity: true,
            product: {
              select: {
                sanitySlug: true,
              },
            },
          },
        },
        city: true,
        country: true,
        line1: true,
        postal_code: true,
        transactionNumber: true,
        expectedDeliveryDate: true,
        updatedAt: true,
      },
    })) as {
      city: string;
      country: string;
      line1: string;
      postal_code: string;
      transactionNumber: string;
      expectedDeliveryDate: Date;
      tax: Decimal | string;
      shipping: Decimal | string;
      subtotal: Decimal | string;
      updatedAt: Date;
      products: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        product: {
          sanitySlug: string;
        };
      }[];
    }[];

    //convert decimal to string
    const returnedOrders = [...orders].map((order) => {
      order.tax = order.tax.toString();
      order.shipping = order.shipping.toString();
      order.subtotal = order.subtotal.toString();
      const products = order.products;
      for (let i = 0; i < products.length; i++) {
        products[i].priceAtTheOrderTime =
          products[i].priceAtTheOrderTime.toString();
      }
      return order;
    });
    return NextResponse.json({ data: returnedOrders }, { status: 200 });
  } catch (e: any) {
    console.log('Internal server error' + e);
    return NextResponse.json({ message: '' }, { status: e.statusCode || 500 });
  }
});
