import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

//get all reviews
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const headerList = headers();
  const key = headerList.get('Authorization')?.split(' ')[1];

  if (key !== process.env.ROUTE_API_KEY) {
    return NextResponse.json({ message: 'Wrong api key' }, { status: 401 });
  }

  try {
    //get reviews of a specific product
    const productSlug = params.slug;

    //get product
    const product = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: 'Product not found',
        },
        { status: 400 }
      );
    }

    //get reviews
    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      include: {
        user: {
          select: {
            name: true,
            imgUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ data: reviews }, { status: 200 });
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

//create review
export const POST = withApiAuthRequired(async (req: Request, context) => {
  const body = await req.json();
  const {
    content,
    star,
    userId,
  }: { content: string; star: number; userId: number } = body;

  const productSlug = context.params?.slug as string | undefined;

  if (!productSlug) {
    return NextResponse.json(
      {
        message: 'Miss required params',
      },
      { status: 400 }
    );
  }

  if (!content || !body?.hasOwnProperty('star')) {
    return NextResponse.json(
      {
        message: 'Miss required data',
      },
      { status: 400 }
    );
  }

  try {
    //get product
    const product = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: {
        id: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: 'Product not found',
        },
        { status: 400 }
      );
    }

    //create review and connect review to the above product and user
    await prisma.review.create({
      data: {
        content,
        star,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    revalidateTag('review');

    return NextResponse.json(
      {
        message: 'review is created',
        revalidate: true,
      },
      { status: 201 }
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
});
