import { headers } from 'next/headers';
import { baseUrl } from '../utils/baseUrl';

export async function getAllOrdersOnServerSide(): Promise<
  OrderWithProductSlugs[]
> {
  try {
    const res = await fetch(`${baseUrl}/api/orders`, {
      headers: headers(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when fetching orders' + data.message);
      return [];
    }

    return data.data as OrderWithProductSlugs[];
  } catch (e: any) {
    console.log('Error in getAllOrdersOnServerSide function' + e);
    return [];
  }
}
