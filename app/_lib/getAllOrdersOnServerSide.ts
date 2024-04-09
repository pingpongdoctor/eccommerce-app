import { headers } from 'next/headers';
import { baseUrl } from '../utils/baseUrl';
import { Decimal } from '@prisma/client/runtime/library';

export async function getAllOrdersOnServerSide(): Promise<
  {
    city: string;
    country: string;
    line1: string;
    postal_code: string;
    transactionNumber: string;
    expectedDeliveryDate: Date;
    updatedAt: Date;
    products: {
      priceAtTheOrderTime: Decimal | string;
      quantity: number;
      product: {
        sanitySlug: string;
      };
    }[];
  }[]
> {
  try {
    const res = await fetch(`${baseUrl}/api/orders`, {
      headers: headers(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when fetching orders' + data.message);
      return [];
    }

    return data.data as {
      city: string;
      country: string;
      line1: string;
      postal_code: string;
      transactionNumber: string;
      expectedDeliveryDate: Date;
      updatedAt: Date;
      products: {
        priceAtTheOrderTime: Decimal | string;
        quantity: number;
        product: {
          sanitySlug: string;
        };
      }[];
    }[];
  } catch (e: any) {
    console.log('Error in getAllOrdersOnServerSide function' + e);
    return [];
  }
}
