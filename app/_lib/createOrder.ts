import { baseUrl } from '../utils/baseUrl';

export async function createOrder(
  fullname: string,
  phonenumber: string,
  status: OrderStatus,
  address: Address
): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/create-order`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ fullname, phonenumber, status, address }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when creating order' + data.message);
      return false;
    }

    return true;
  } catch (e: any) {
    console.log('Error in createOrder function' + e.message);
    return false;
  }
}
