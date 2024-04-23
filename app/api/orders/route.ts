import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

//get all orders of the current user
export const GET = withApiAuthRequired(async (req: NextRequest) => {
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

    //check if user is admin
    const isAdmin =
      session?.user[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].includes(
        'admin'
      );

    let orders: {
      id: number;
      transactionNumber: string;
      expectedDeliveryDate: Date;
      placedDate: Date;
      tax: Decimal | string;
      shipping: Decimal | string;
      subtotal: Decimal | string;
      updatedAt: Date;
      status: OrderStatus;
      users?: { name: string; imgUrl: string };
      fullname?: string;
      email?: string;
      city?: string;
      country?: string;
      line1?: string;
      line2?: string | null;
      postal_code?: string;
      state?: string;
      purchasedProducts: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        sanitySlug: string;
        titleAtTheOrderTime: string;
      }[];
    }[] = [];

    if (isAdmin) {
      //if user is admin, return all orders
      orders = await prisma.order.findMany({
        select: {
          purchasedProducts: {
            select: {
              sanitySlug: true,
              priceAtTheOrderTime: true,
              titleAtTheOrderTime: true,
              quantity: true,
            },
          },
          user: {
            select: {
              name: true,
              imgUrl: true,
            },
          },
          id: true,
          fullname: true,
          email: true,
          city: true,
          country: true,
          line1: true,
          line2: true,
          postal_code: true,
          state: true,
          transactionNumber: true,
          expectedDeliveryDate: true,
          placedDate: true,
          status: true,
          updatedAt: true,
          shipping: true,
          subtotal: true,
          tax: true,
        },
      });
    } else {
      //if user is not admin or the origin is not, get orders of the current user
      orders = await prisma.order.findMany({
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
          id: true,
          transactionNumber: true,
          expectedDeliveryDate: true,
          placedDate: true,
          status: true,
          updatedAt: true,
          shipping: true,
          subtotal: true,
          tax: true,
        },
      });
    }

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
      users?: { name: string; imgUrl: string };
      fullname?: string;
      email?: string;
      city?: string;
      country?: string;
      line1?: string;
      line2?: string | null;
      postal_code?: string;
      state?: string;
      purchasedProducts: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        sanitySlug: string;
        titleAtTheOrderTime: string;
      }[];
    }[] = [...orders].map((order) => {
      order.tax = order.tax.toString();
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
