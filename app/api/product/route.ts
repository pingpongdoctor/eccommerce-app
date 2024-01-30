import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import prisma from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

//endpoint used for creating and updating products, that is triggered by Sanity webhook
export async function POST(req: NextRequest) {
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

  console.log(body);

  if (
    !body?.sanitySlug ||
    !body?.title ||
    !body?.price ||
    !body?.category ||
    !body?.hasOwnProperty('featured') ||
    !body?._type ||
    !body?.instock
  ) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  const productData = {
    title: body.title,
    price: body.price,
    category: body.category,
    featured: body.featured,
    instock: body.instock,
  };

  console.log(productData);

  try {
    const product = await prisma.product.upsert({
      where: { sanitySlug: body.sanitySlug },
      create: {
        ...productData,
        sanitySlug: body.sanitySlug,
      },
      update: {
        ...productData,
        createdAt: new Date(),
      },
    });

    console.log(product);

    //revalidate product data in SSG pages
    revalidateTag(body._type);

    return NextResponse.json(
      { message: 'New product is created', revalidate: true },
      {
        status: 201,
      }
    );
  } catch (e) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      {
        message: 'Internal server error' + ' ' + (e as Error).message,
      },
      { status: 500 }
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
  } catch (e) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      {
        message: 'Internal server error' + ' ' + (e as Error).message,
      },
      { status: 500 }
    );
  }
}
