import { baseUrl } from '../utils/baseUrl';

export async function getOrderOnClientSide(
  orderId: number
): Promise<Order | undefined> {
  if (typeof orderId !== 'number') {
    console.log('invalid argument value');
    return undefined;
  }

  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (!res.ok) {
      console.log('Error when fetching order' + data.message);
      return undefined;
    }

    return data.data as Order;
  } catch (e: any) {
    console.log('Error in getOrderOnClientSide function' + e);
    return undefined;
  }
}
