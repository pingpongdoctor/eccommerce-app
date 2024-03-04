import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const getProduct = async function (slug: string): Promise<{
  instock: number;
} | null> {
  const product = await prisma.product.findUnique({
    where: { sanitySlug: slug },
    select: { instock: true },
  });
  return product;
};

export const POST = withApiAuthRequired(async (req: Request) => {
  const { productSlugs }: { productSlugs: string[] } = await req.json();

  if (!productSlugs) {
    return NextResponse.json(
      { message: 'missed required data' },
      {
        status: 400,
      }
    );
  }

  if (productSlugs.length === 0) {
    return NextResponse.json(
      { message: 'data is not valid' },
      {
        status: 400,
      }
    );
  }
  try {
    productSlugs.map(async (slug: string) => {
      const product = await getProduct(slug);
      if (!product) {
        return NextResponse.json(
          { message: 'Product is not available' },
          { status: 500 }
        );
      }

      if (product.instock === 0) {
        return NextResponse.json(
          { message: 'successful check', isAnyProductSoldOut: true },
          { status: 200 }
        );
      }
    });

    return NextResponse.json(
      { message: 'successful check', isAnyProductSoldOut: false },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: 'Server error' + e.message });
  }
});
