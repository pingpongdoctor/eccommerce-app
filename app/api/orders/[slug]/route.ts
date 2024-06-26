import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { orderStatusArr } from '@/app/utils/utils';
import sgMail from '@sendgrid/mail';

//get one specific order (only implemented if user is admin)
export const GET = withApiAuthRequired(async (_req: NextRequest, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 500 }
    );
  }

  const orderId = context.params?.slug as string | undefined;

  if (!orderId) {
    return NextResponse.json(
      {
        message: 'Miss required slug',
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
        { status: 500 }
      );
    }

    //check if user is admin
    const isAdmin: boolean | undefined =
      session?.user?.[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].includes(
        'admin'
      );

    if (!isAdmin) {
      return NextResponse.json(
        { message: 'user is not admin' },
        { status: 400 }
      );
    }

    //if user is admin, return the order that has the provided order id
    const order = (await prisma.order.findUnique({
      where: { id: Number(orderId) },
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
    })) as unknown as {
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
    } | null;

    if (!order) {
      return NextResponse.json({ message: 'No order found' }, { status: 500 });
    }

    //convert values from Decimal to string
    order.tax = order.tax.toString();
    order.shipping = order.shipping.toString();
    order.subtotal = order.subtotal.toString();

    const products = order.purchasedProducts;
    for (let i = 0; i < products.length; i++) {
      products[i].priceAtTheOrderTime =
        products[i].priceAtTheOrderTime.toString();
    }

    return NextResponse.json({ data: order }, { status: 200 });
  } catch (e: any) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});

//update order status (only admin can use this endpoint)
export const PUT = withApiAuthRequired(async (req: NextRequest, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 500 }
    );
  }

  const orderId = context.params?.slug as string | undefined;

  if (!orderId) {
    return NextResponse.json(
      {
        message: 'Miss required slug',
      },
      { status: 400 }
    );
  }

  const {
    status,
    to,
    from,
    order_number,
    username,
  }: {
    orderId: number;
    status: OrderStatus;
    to: string;
    from: string;
    order_number: string;
    username: string;
  } = await req.json();

  if (!orderId || !status || !orderStatusArr.includes(status)) {
    return NextResponse.json(
      { message: 'Miss required data' },
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
        { status: 500 }
      );
    }

    //check if user is admin
    const isAdmin =
      session?.user[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].includes(
        'admin'
      );

    if (!isAdmin) {
      return NextResponse.json(
        { message: 'user is not admin' },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status,
      },
    });

    //send email if status is not processing
    if (status !== 'processing') {
      let emailStatus = '';

      if (status === 'delivered') {
        emailStatus = status;
      } else {
        emailStatus = 'shipped';
      }

      sgMail.setApiKey(process.env.SENGRID_API_KEY as string);
      const msg = {
        to,
        from,
        templateId: process.env
          .SENGRID_TEMPLATE_ID_ORDER_NOTIFICATION as string,
        dynamicTemplateData: {
          status: emailStatus,
          order_number,
          username,
        },
      };

      await sgMail.send(msg);
    }

    return NextResponse.json(
      { message: 'order status is updated' },
      { status: 200 }
    );
  } catch (e: any) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});
