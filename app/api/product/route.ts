import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  useTLS: true,
});

//endpoint used for creating and updating products, that is triggered by Sanity webhook
export async function PUT(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{
    sanitySlug: string;
    title: string;
    price: string;
    category: Categories;
    featured: boolean;
    _type: string;
    instock: number;
  } | null>(
    req,
    process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET_CREATE_UPDATE_PRODUCT
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
  }

  if (
    !body?.sanitySlug ||
    !body?.title ||
    !body?.price ||
    !body?.category ||
    !body?.hasOwnProperty('featured') ||
    !body?._type ||
    !body?.hasOwnProperty('instock') ||
    body?.instock === null
  ) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  const productData = {
    title: body.title,
    price: body.price.trim(),
    category: body.category,
    featured: body.featured,
    instock: body.instock,
  };

  try {
    const res = await prisma.product.upsert({
      where: { sanitySlug: body.sanitySlug },
      create: {
        ...productData,
        sanitySlug: body.sanitySlug,
      },
      update: {
        ...productData,
        updatedAt: new Date(),
      },
    });

    //revalidate product data in SSG pages
    revalidateTag(body._type);

    //trigger product event to update product quantity in realtime using Pusher severless service
    await pusher.trigger(
      'new-product-quantity',
      `new-product-quantity-${body.sanitySlug}-event`,
      {
        newProductQuantity: body.instock,
      }
    );

    return NextResponse.json(
      { message: 'New product is created', revalidate: true },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

//endpoint used for deleting products, that is triggered by Sanity webhook
export async function DELETE(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{
    sanitySlug: string;
    _type: string;
  } | null>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET_DELETE_PRODUCT);

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
  }

  if (!body?.sanitySlug || !body?._type) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  try {
    await prisma.product.delete({
      where: { sanitySlug: body.sanitySlug },
    });

    //revalidate product data in SSG pages
    revalidateTag(body._type);

    return NextResponse.json(
      { message: 'The product is deleted', revalidate: true },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
