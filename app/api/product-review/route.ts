import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getUserProfile } from '@/app/_lib/getUserProfile';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

//get all reviews
export async function GET() {
  try {
    const headerList = headers();
    const key = headerList.get('Authorization')?.split(' ')[1];

    if (key !== process.env.ROUTE_API_KEY) {
      return NextResponse.json({ message: 'Wrong api key' }, { status: 401 });
    }

    const reviews = await prisma.review.findMany();
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
export const POST = withApiAuthRequired(async (req: Request) => {
  const body = await req.json();

  if (!body?.content || !body?.hasOwnProperty('star') || !body?.productSlug) {
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

    //get product
    const product = await prisma.product.findUnique({
      where: { sanitySlug: body.productSlug },
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
