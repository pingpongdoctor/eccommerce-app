import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

//create or update an userproduct record (if update, we add more product quantity to the current quantity)
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
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
});

// update the value of the productQuantity field of an userproduct record with a new value
export const PUT = withApiAuthRequired(async (req: Request, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 400 }
    );
  }

  const productSlug = context.params?.slug as string | undefined;

  const { productQuantity }: { productQuantity: string } = await req.json();

  if (!productSlug || !productQuantity) {
    return NextResponse.json(
      { message: 'Missed required params' },
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

    //update userproduct record
    await prisma.usersProducts.update({
      where: {
        userId_productId: {
          userId: userData.id,
          productId: product.id,
        },
      },
      data: {
        productQuantity: Number(productQuantity),
      },
    });

    return NextResponse.json(
      { message: 'product quantity is updated' },
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
});

//delete a product from user shopping cart
export const DELETE = withApiAuthRequired(async (req: Request, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        message: 'user is not found on Auth0 cloud database',
      },
      { status: 400 }
    );
  }

  const productSlug = context.params?.slug as string | undefined;

  if (!productSlug) {
    return NextResponse.json(
      { message: 'Missed required params' },
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

    //delete userproduct record
    await prisma.usersProducts.delete({
      where: {
        userId_productId: {
          userId: userData.id,
          productId: product.id,
        },
      },
    });

    return NextResponse.json(
      { message: 'product is deleted from the cart' },
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
});
