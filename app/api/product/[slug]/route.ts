import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

//endpoint used for creating and updating products, that is triggered by Sanity webhook
export const GET = withApiAuthRequired(async (_req: NextRequest, context) => {
  const productSlug = context?.params?.slug;

  if (!productSlug) {
    return NextResponse.json(
      { message: 'Miss required data' },
      {
        status: 400,
      }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { sanitySlug: productSlug as string },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Product is not found' },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { message: 'Product is found', data: product },
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
});
