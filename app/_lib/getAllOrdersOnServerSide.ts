import { headers } from 'next/headers';
import { baseUrl } from '../utils/baseUrl';
import { Decimal } from '@prisma/client/runtime/library';

export async function getAllOrdersOnServerSide(): Promise<
  OrderWithDetailedProducts[]
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

    return data.data as OrderWithDetailedProducts[];
  } catch (e: any) {
    console.log('Error in getAllOrdersOnServerSide function' + e);
    return [];
  }
}
