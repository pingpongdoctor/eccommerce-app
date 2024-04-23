import { baseUrl } from '../utils/baseUrl';

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
  try {
    const res = await fetch(`${baseUrl}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        orderId,
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when updating order status' + data.message);
    }
  } catch (e) {
    console.log('Error in updateOrderStatus function' + e);
  }
}
