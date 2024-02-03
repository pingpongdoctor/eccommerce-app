import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

//update product instock in database and clear products in shopping cart
//update product instock on Sanity database
export const PUT = withApiAuthRequired(async (req: Request, context) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
      { status: 400 }
    );
  }

  const {
    productInShoppingCart,
  }: { productInShoppingCart: ProductInShoppingCart[] } = await req.json();

  if (!productInShoppingCart) {
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  try {
    //get user
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: session.user.sub,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'user not found in database' },
        { status: 400 }
      );
    }

    //get product

    //update product
    // await Promise.all(
    //   productInShoppingCart.map((product: ProductInShoppingCart) => {
    //     await prisma.usersProducts.update({
    //       where: {
    //         userId: user.id,
    //         productId:
    //       },
    //     });
    //   })
    // );

    return NextResponse.json({
      message: 'Products are updated after successful payment',
    });
  } catch (e: any) {
    return NextResponse.json({ message: e.message });
  }
});
