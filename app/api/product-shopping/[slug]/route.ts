import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

//get products in the shopping cart for a specific user
export const GET = withApiAuthRequired(async (req: Request, context) => {
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

//create or update userproduct records (if update, we add more products to the products field in user table)
export const POST = withApiAuthRequired(async (req: Request, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 400 }
    );
  }

  const { productQuantity }: { productQuantity: number } = await req.json();

  const productSlug = context.params?.slug as string | undefined;

  if (!productSlug || !productQuantity) {
    return NextResponse.json(
      { message: 'Missed required data' },
      { status: 400 }
    );
  }

  try {
    //get user
    const auth0Id: string = session.user.sub;
    const userData = await prisma.user.findUnique({ where: { auth0Id } });

    if (!userData) {
      return NextResponse.json(
        { message: 'user is not found in app database' },
        { status: 400 }
      );
    }

    //get product
    const product: {
      id: number;
    } | null = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'product not found' },
        {
          status: 201,
        }
      );
    }

    await prisma.usersProducts.upsert({
      where: {
        userId_productId: {
          userId: userData.id,
          productId: product.id,
        },
      },
      create: {
        productQuantity,
        user: {
          connect: { id: userData.id },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
      },
      update: {
        productQuantity: { increment: productQuantity }, //add more product
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: 'successful ' },
      {
        status: 201,
      }
    );
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
});
