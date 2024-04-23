import { baseUrl } from '../utils/baseUrl';

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus,
  to: string,
  from: string,
  order_number: string,
  username: string
) {
  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        status,
        to,
        from,
        order_number,
        username,
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
