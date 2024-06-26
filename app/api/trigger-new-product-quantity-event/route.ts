import { NextResponse } from 'next/server';
import Pusher from 'pusher';
import prisma from '@/lib/prisma';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

export const POST = async (req: Request) => {
  const { productSlug }: { productSlug: string } = await req.json();

  if (!productSlug) {
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  try {
    //get product
    const product: {
      instock: number;
    } | null = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: { instock: true },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: 'Product not found',
        },
        { status: 500 }
      );
    }

    //trigger an event to update product quantity in realtime
    await pusher.trigger(
      'new-product-quantity',
      `new-product-quantity-${productSlug}-event`,
      {
        newProductQuantity: product.instock,
      }
    );

    return NextResponse.json(
      { message: 'successfully triggering new-product-quantity event' },
      { status: 200 }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
};
