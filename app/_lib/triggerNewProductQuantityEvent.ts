import { baseUrl } from '../utils/baseUrl';

export async function triggerProductQuantityEvent(productSlug: string) {
  try {
    const res = await fetch(
      `${baseUrl}/api/trigger-new-product-quantity-event`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ productSlug }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when making API call to trigger event' + data.message);
    }
  } catch (e: any) {
    console.log('Error in triggerNewProductQuantityEvent function' + e);
  }
}