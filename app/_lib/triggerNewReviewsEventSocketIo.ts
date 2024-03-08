import { baseUrl } from '../utils/baseUrl';

//return true if successfully triggering socket.io event
export async function triggerNewReviewsEventSocketIo(productSlug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/socket-io-new-reviews`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ productSlug }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(
        'Error when making API call to trigger Socket.io evet' + data.message
      );
      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in triggerNewReviewsEventSocketIo function' + e);
    return false;
  }
}
