import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

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
export const GET = withApiAuthRequired(async (_req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
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

    //get rollback data from Redis
    const rollbackData:
      | (ProductInShoppingCart & {
          sanityProductId: string;
        })[]
      | null = await redis.hget(`${user.id}-rollback-data`, 'data');

    if (!rollbackData) {
      return NextResponse.json(
        { message: 'rollback data not available' },
        { status: 400 }
      );
    }

    //delete rollback data from Redis
    await redis.hdel(`${user.id}-rollback-data`, 'data');

    //roll back product data on Sanity database and app database
    await Promise.all(
      rollbackData.map(
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
              { message: 'product not available' },
              { status: 400 }
            );
          }

          await prisma.product.update({
            where: { id: productInShoppingCart.productId },
            data: {
              instock: product.instock + productInShoppingCart.productQuantity,
              updatedAt: new Date(),
            },
          });

          const mutations = [
            {
              patch: {
                id: productInShoppingCart.sanityProductId,
                set: {
                  instock:
                    product.instock + productInShoppingCart.productQuantity,
                },
              },
            },
          ];

          const res = await fetch(
            `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_READ_WRITE_TOKEN}`,
              },
              body: JSON.stringify({ mutations }),
            }
          );

          const data = await res.json();

          if (data.error) {
            return NextResponse.json(
              {
                message:
                  'error updating sanity documents' + data.error.description,
              },
              { status: 400 }
            );
          }
        }
      )
    );

    return NextResponse.json(
      {
        message: 'product data is rolled back',
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: e.statusCode || 500 }
    );
  }
});
