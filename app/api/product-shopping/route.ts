import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@/lib/prisma';

//get products in the shopping cart for the current user
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: 'Please log in' }, { status: 400 });
  }

  try {
    //get current user
    const auth0Id = session.user.sub;
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: {
        products: {
          select: { product: { select: { sanitySlug: true } } },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Please log in' }, { status: 400 });
    }

    //get product sanity slug
    const products = user.products.map(
      (ele: {
        product: {
          sanitySlug: string;
        };
      }) => ele.product
    );

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
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
