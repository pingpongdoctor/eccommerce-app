import { Review } from '@prisma/client';
import { baseUrl } from '../utils/baseUrl';

export async function getProductReviews(
  productSlug: string
): Promise<
  (Review & { user: { name: string; imgUrl: string } })[] | undefined
> {
  try {
    const res = await fetch(`${baseUrl}/api/product-review/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ROUTE_API_KEY}`,
      },
      next: {
        revalidate: 3600,
        tags: ['review'],
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error fetching product reviews' + ' ' + data.message);
      return undefined;
    }
    return data.data;
  } catch (e: any) {
    console.log('Error in getProductReviews function' + ' ' + e.message);
    return undefined;
  }
}
