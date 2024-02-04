import { baseUrl } from '../utils/baseUrl';

//return true if successfully creating payment intent
export async function createStripePaymentIntent(
  amount: number
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/checkout_sessions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
      method: 'POST',
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when creating payment intent' + ' ' + data.message);
      return false;
    }

    return true;
  } catch (e: any) {
    console.log(
      'Error in createStripePaymentIntent function' + ' ' + e.message
    );
    return false;
  }
}
