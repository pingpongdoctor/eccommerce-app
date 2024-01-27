import { baseUrl } from '../utils/baseUrl';

export async function postNewReview(
  productSlug: string,
  content: string,
  star: number
): Promise<void> {
  try {
    const res = await fetch(`${baseUrl}/api/product-review/${productSlug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ content, star }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data.message);
    }
  } catch (e: any) {
    console.log('Error in postNewRiew function' + ' ' + e.message);
  }
}
