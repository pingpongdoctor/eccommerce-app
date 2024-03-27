import { baseUrl } from '../utils/baseUrl';

export async function rollbackData(rollbackDataKey: string) {
  if (!rollbackDataKey?.trim()) {
    console.log('Error rolling back data not provided');
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/update-products-after-payment-roll-back`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ rollbackDataKey }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log('Error when rolling back product data' + ' ' + data.message);
    }
  } catch (e: any) {
    console.log('Error in updateProductsAfterPayment function' + e.message);
  }
}
