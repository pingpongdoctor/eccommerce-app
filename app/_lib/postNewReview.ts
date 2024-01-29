import { baseUrl } from '../utils/baseUrl';

//return true if new review is successfully created
export async function postNewReview(
  productSlug: string,
  content: string,
  star: number
): Promise<boolean> {
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
      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in postNewRiew function' + ' ' + e.message);
    return false;
  }
}
