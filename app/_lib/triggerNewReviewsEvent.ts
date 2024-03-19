import { baseUrl } from '../utils/baseUrl';

//return true if successfully triggering event
export async function triggerNewReviewsEvent(productSlug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/trigger-new-reviews-event`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ productSlug }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when making API call to trigger event' + data.message);
      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in triggerNewReviewsEvent function' + e);
    return false;
  }
}
