import { baseUrl } from '../utils/baseUrl';

export async function getAllOrdersOnClientSide(): Promise<Order[]> {
  try {
    const res = await fetch(`${baseUrl}/api/orders`);

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when fetching orders' + data.message);
      return [];
    }

    return data.data as Order[];
  } catch (e: any) {
    console.log('Error in getAllOrdersOnServerSide function' + e);
    return [];
  }
}
