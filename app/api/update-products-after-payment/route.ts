import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { client } from '@/sanity/lib/client';

//function to get product
const getProduct = async function (
  productInShoppingCart: ProductInShoppingCart & {
    sanityProductId: string;
  }
): Promise<{
  instock: number;
} | null> {
  const product: {
    instock: number;
  } | null = await prisma.product.findUnique({
    where: { id: productInShoppingCart.productId },
    select: { instock: true },
  });

  return product;
};

//update product that are in stock in our database and on sanity database, and clear products in shopping cart after successful payment
export const PUT = withApiAuthRequired(async (req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
      { status: 400 }
    );
  }

  const {
    productsInShoppingCart,
  }: {
    productsInShoppingCart: (ProductInShoppingCart & {
      sanityProductId: string;
    })[];
  } = await req.json();

  if (!productsInShoppingCart) {
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

    // check if any product instock is less than product ordering quantity
    await Promise.all(
      productsInShoppingCart.map(
        async (
          productInShoppingCart: ProductInShoppingCart & {
            sanityProductId: string;
          }
        ) => {
          const product: {
            instock: number;
          } | null = await getProduct(productInShoppingCart);

          if (!product) {
            return NextResponse.json(
              { message: 'product not available for purchase' },
              { status: 400 }
            );
          }

          if (productInShoppingCart.productQuantity > product.instock) {
            return NextResponse.json(
              {
                message: `product with ${productInShoppingCart.productSlug} has not sufficient quantity for purchase`,
                productSlug: productInShoppingCart.productSlug,
              },
              { status: 400 }
            );
          }
        }
      )
    );

    //clear products in shopping cart
    const productIds: number[] = productsInShoppingCart.map(
      (
        productInShoppingCart: ProductInShoppingCart & {
          sanityProductId: string;
        }
      ) => productInShoppingCart.productId
    );
    await prisma.usersProducts.deleteMany({
      where: {
        userId: user.id,
        productId: { in: productIds },
      },
    });

    //update product instock on our database and on sanity database
    await Promise.all(
      productsInShoppingCart.map(
        async (
          productInShoppingCart: ProductInShoppingCart & {
            sanityProductId: string;
          }
        ) => {
          const product: {
            instock: number;
          } | null = await getProduct(productInShoppingCart);

          if (!product) {
            return NextResponse.json(
              { message: 'product not available for purchase' },
              { status: 400 }
            );
          }

          await prisma.product.update({
            where: { id: productInShoppingCart.productId },
            data: {
              instock: product.instock - productInShoppingCart.productQuantity,
              updatedAt: new Date(),
            },
          });

          await client.patch(productInShoppingCart.sanityProductId, {
            set: {
              instock: product.instock - productInShoppingCart.productQuantity,
            },
          });
        }
      )
    );

    return NextResponse.json({
      message: 'Products are updated after successful payment',
    });
  } catch (e: any) {
    return NextResponse.json({ message: e.message });
  }
});
