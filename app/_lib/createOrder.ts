import { baseUrl } from '../utils/baseUrl';

export async function createOrder(
  fullname: string,
  status: OrderStatus,
  address: Address,
  purchasedProducts: PurchasedProduct[]
): Promise<{
  isSuccess: boolean;
  transactionNumber?: string;
  expectedDeliveryDate?: string;
}> {
  try {
    const res = await fetch(`${baseUrl}/api/create-order`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ fullname, status, address, purchasedProducts }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when creating order' + data.message);
      return { isSuccess: false };
    }

    const { transactionNumber, expectedDeliveryDate } = data;

    return { isSuccess: true, transactionNumber, expectedDeliveryDate };
  } catch (e: any) {
    console.log('Error in createOrder function' + e.message);
    return { isSuccess: false };
  }
}
