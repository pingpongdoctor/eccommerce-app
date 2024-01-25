import {
  withApiAuthRequired,
  AppRouteHandlerFnContext,
} from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/app/_lib/getUserProfile';
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

    return NextResponse.json(reviews, { status: 200 });
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

  const productSlug = context.params?.slug as string | undefined;
  console.log(productSlug);

  if (!body?.content || !body?.hasOwnProperty('star')) {
    return NextResponse.json(
      {
        message: 'Miss required data',
      },
      { status: 400 }
    );
  }

  try {
    //get user
    const user = await getUserProfile();
    if (!user) {
      return NextResponse.json(
        {
          message: 'Can not get user',
        },
        { status: 400 }
      );
    }

    console.log(user);

    //get product
    const product = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: {
        id: true,
      },
    });

    console.log(product);

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
        content: body.content,
        star: body.star,
        user: {
          connect: {
            id: user.id,
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'review is created',
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
