import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  if (!params?.slug) {
    return NextResponse.json(
      { message: 'Miss required data' },
      {
        status: 400,
      }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { sanitySlug: params.slug as string },
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
};
