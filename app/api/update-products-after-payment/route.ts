import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';
import { Redis } from '@upstash/redis';
import { v4 as uuidv4 } from 'uuid';

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
export const PUT = withApiAuthRequired(async (req: Request) => {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
      { status: 500 }
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
        { status: 500 }
      );
    }

    // check if any products do not have enough quantity for purchasing
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
              { message: 'product not available' },
              { status: 500 }
            );
          }

          if (productInShoppingCart.productQuantity > product.instock) {
            return NextResponse.json(
              {
                message: `insufficient product`,
                productSlug: productInShoppingCart.productSlug,
              },
              { status: 500 }
            );
          }
        }
      )
    );

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
              { message: 'product not available' },
              { status: 500 }
            );
          }

          //   await client
          //     .patch(productInShoppingCart.sanityProductId)
          //     .set({
          //       instock: product.instock - productInShoppingCart.productQuantity,
          //     })
          //     .commit();
          // }

          //Use Sanity API mutate endpoint to mutate documents instead of using Sanity client
          //If we use Sanity client to mutate Sanity documents, we need to generate Sanity client with pre-defined read-and-write token. This requires us to allow credentials transfer when fetching data or we will encounter CORS errors
          //If we set allow credetial option in Sanity CORS cofiguration to true, it will accept everyone to access the Sanity studio using /studio endpoint. This is really dangerous.
          const mutations = [
            {
              patch: {
                id: productInShoppingCart.sanityProductId,
                set: {
                  instock:
                    product.instock - productInShoppingCart.productQuantity,
                },
              },
            },
          ];

          //when the product quantity is updated on Sanity database, it will trigger Sanity webhook to make an API call to update product document on app database
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
              { status: 500 }
            );
          }
        }
      )
    );

    //set data in redis database
    const rollbackDataKey = uuidv4();

    await redis.hset(`${rollbackDataKey}-rollback-data`, {
      data: productsInShoppingCart,
    });

    return NextResponse.json(
      {
        message: 'products are updated after successful payment',
        rollbackDataKey,
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
