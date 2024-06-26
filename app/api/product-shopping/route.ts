import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

//get products in shopping cart of the current user
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: 'user data is not available on auth0 cloud database' },
      { status: 500 }
    );
  }

  try {
    //get current user
    const auth0Id = session.user.sub;
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        products: {
          select: {
            product: {
              select: {
                sanitySlug: true,
                category: true,
                id: true,
                price: true,
                title: true,
                instock: true,
              },
            },
            productQuantity: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Please log in' }, { status: 400 });
    }

    //get products records containing product slugs and product quantity
    const products: ProductInShoppingCart[] = user.products.map((ele) => {
      return {
        productSlug: ele.product.sanitySlug,
        productQuantity: ele.productQuantity,
        productCategory: ele.product.category,
        productId: ele.product.id,
        productPrice: ele.product.price.toString(),
        productTitle: ele.product.title,
        productInstock: ele.product.instock,
      };
    });

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
});
