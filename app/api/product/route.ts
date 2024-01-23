import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{
    sanitySlug: string;
    title: string;
    price: string;
    category: Categories;
    featured: boolean;
    detail: string;
  } | null>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET_CREATE_PRODUCT);

  if (!isValidSignature) {
  }

  if (
    !body?.sanitySlug ||
    !body?.title ||
    !body?.price ||
    !body?.category ||
    !body?.hasOwnProperty('featured')
  ) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  try {
    await prisma.product.create({
      data: {
        sanitySlug: body.sanitySlug,
        title: body.title,
        price: body.price,
        category: body.category,
        featured: body.featured,
        detail: body.detail,
      },
    });
  } catch (e) {
    console.log('Internal server error' + e);
    return NextResponse.json(
      {
        message:
          'Internal server error' + (e as Error).name + (e as Error).message,
      },
      { status: 500 }
    );
  }
}
