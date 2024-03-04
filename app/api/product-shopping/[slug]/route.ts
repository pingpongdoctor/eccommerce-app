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
      { status: 500 }
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
        { status: 500 }
      );
    }

    //get product
    const product: {
      id: number;
      instock: number;
    } | null = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: { id: true, instock: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'product not found' },
        {
          status: 201,
        }
      );
    }

    //find userProduct document
    const userProductDocument: {
      productQuantity: number;
    } | null = await prisma.usersProducts.findUnique({
      where: {
        userId_productId: {
          userId: userData.id,
          productId: product.id,
        },
      },
      select: {
        productQuantity: true,
      },
    });

    //check if product is sold out
    const isProductSoldOut = product.instock === 0;

    if (isProductSoldOut) {
      return NextResponse.json(
        { message: 'product is sold out' },
        { status: 200 }
      );
    }

    if (!userProductDocument) {
      //create userProduct document
      await prisma.usersProducts.create({
        data: {
          productQuantity:
            productQuantity > product.instock
              ? product.instock
              : productQuantity,
          user: {
            connect: { id: userData.id },
          },
          product: {
            connect: {
              id: product.id,
            },
          },
        },
      });

      return NextResponse.json(
        { message: 'successful adding new product to cart' },
        {
          status: 201,
        }
      );
    } else {
      //update userProduct document
      const currentProductQuantity = userProductDocument.productQuantity;
      const notEnoughAvailableProduct =
        currentProductQuantity + productQuantity > product.instock;
      const canNotAddMore = currentProductQuantity === product.instock;

      if (!canNotAddMore) {
        await prisma.usersProducts.update({
          where: {
            userId_productId: {
              userId: userData.id,
              productId: product.id,
            },
          },
          data: {
            productQuantity: notEnoughAvailableProduct
              ? product.instock
              : { increment: productQuantity },
            createdAt: new Date(),
          },
        });
      }

      return NextResponse.json(
        {
          message: 'successful adding new product to cart',
          notEnoughAvailableProduct,
          canNotAddMore,
        },
        {
          status: 200,
        }
      );
    }
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
      { status: 500 }
    );
  }

  const productSlug = context.params?.slug as string | undefined;

  const { productQuantity }: { productQuantity: number } = await req.json();

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
        { message: 'user is not found' },
        { status: 500 }
      );
    }

    //get product
    const product: {
      id: number;
      instock: number;
    } | null = await prisma.product.findUnique({
      where: { sanitySlug: productSlug },
      select: { id: true, instock: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: 'product not found' },
        {
          status: 500,
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
        productQuantity:
          productQuantity > product.instock ? product.instock : productQuantity,
      },
    });

    return NextResponse.json(
      {
        message: 'product quantity is updated',
        notEnoughProducts: productQuantity > product.instock,
      },
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
