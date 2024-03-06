import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const getProduct = async function (slug: string): Promise<{
  id: number;
  instock: number;
} | null> {
  const product = await prisma.product.findUnique({
    where: { sanitySlug: slug },
    select: { instock: true, id: true },
  });
  return product;
};

export const POST = withApiAuthRequired(async (req: Request) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: 'User not found in auth0 database' },
      { status: 500 }
    );
  }

  //get product data from body
  const {
    products,
  }: {
    products: {
      productSlug: string;
      productQuantity: number;
    }[];
  } = await req.json();

  //check if body data is valid
  if (!products) {
    return NextResponse.json(
      { message: 'missed required data' },
      {
        status: 400,
      }
    );
  }

  if (products.length === 0) {
    return NextResponse.json(
      { message: 'data is not valid' },
      {
        status: 400,
      }
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

    //check product quantity
    const results: {
      haveProductSoldOut: boolean;
      notSufficientProduct: boolean;
    }[] = await Promise.all(
      products.map(
        async (productData: {
          productSlug: string;
          productQuantity: number;
        }) => {
          const returnedData = {
            haveProductSoldOut: false,
            notSufficientProduct: false,
          };

          const product = await getProduct(productData.productSlug);
          if (!product) {
            //throw error to hault code execution of the whole route handler
            throw new Error('Product is not available');
          }

          //check if product is sold out
          if (product.instock === 0) {
            returnedData.haveProductSoldOut = true;
          }

          //check if product does not have enough quantity to purchase
          if (productData.productQuantity > product.instock) {
            await prisma.usersProducts.update({
              where: {
                userId_productId: { userId: user.id, productId: product.id },
              },
              data: {
                productQuantity: product.instock,
              },
            });

            returnedData.notSufficientProduct = true;
          }

          return returnedData;
        }
      )
    );

    console.log('results', results);

    //check results
    const noProductsSoldOut = results.every(
      (result) => result.haveProductSoldOut === false
    );

    const sufficientProducts = results.every(
      (result) => result.notSufficientProduct === false
    );

    return NextResponse.json(
      { message: 'Successful check', noProductsSoldOut, sufficientProducts },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: 'Server error' + e.message });
  }
});
