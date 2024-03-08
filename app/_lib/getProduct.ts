import { Product } from '@prisma/client';
import { baseUrl } from '../utils/baseUrl';

export async function getProduct(
  productSlug: string
): Promise<Product | undefined> {
  try {
    const res = await fetch(`${baseUrl}/api/product/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(`Error when getting product` + data.message);
      return undefined;
    }

    return data.data;
  } catch (e: any) {
    console.log(`Error in getProduct function` + e.message);
    return undefined;
  }
}
